// Main application script
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
	const urlParams = new URLSearchParams(window.location.search);
	alert(urlParams);
	
    // Check if we're on the homepage or a post page
    if (document.getElementById('post-list')) {
        loadPostList();
    } else if (document.getElementById('post-content') && urlParams.entries().next().value[0] == 'post') {
        loadPostContent();
    } else {
		loadPageContent();
	}
});

// Base URL for all links
const BASE_URL = 'https://petervilshansen.github.io/web/';
const POSTS_DIR = `${BASE_URL}posts/`;
const PAGES_DIR = `${BASE_URL}pages/`;

// Function to extract metadata from Markdown content
function extractMetadata(markdown) {
    const metadata = {
        title: '',
        date: new Date().toISOString().split('T')[0], // Default to today
        excerpt: '',
        image: ''
    };

    // Try HTML comment style front matter first
    const htmlCommentMatch = markdown.match(/<!--\s*([\s\S]*?)\s*-->/);
    if (htmlCommentMatch) {
        const frontMatter = htmlCommentMatch[1];
        const dateMatch = frontMatter.match(/date:\s*(.+)/i);
        const excerptMatch = frontMatter.match(/excerpt:\s*(.+)/i);
        const imageMatch = frontMatter.match(/image:\s*(.+)/i);

        if (dateMatch) metadata.date = formatDateString(dateMatch[1].trim());
        if (excerptMatch) metadata.excerpt = excerptMatch[1].trim();
        if (imageMatch) metadata.image = imageMatch[1].trim();
    }

    // Fallback to YAML style if no HTML comments found
    else {
        const yamlMatch = markdown.match(/^---\s*\n([\s\S]*?)\n---/);
        if (yamlMatch) {
            const frontMatter = yamlMatch[1];
            const dateMatch = frontMatter.match(/date:\s*(.+)/i);
            if (dateMatch) metadata.date = formatDateString(dateMatch[1].trim());
        }
    }

    // Extract title from first heading
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    if (titleMatch) metadata.title = titleMatch[1];

    // Extract excerpt from first paragraph if not in front matter
    if (!metadata.excerpt) {
        const content = markdown.replace(/<!--[\s\S]*?-->/, '').replace(/---[\s\S]*?---/, '');
        const firstParagraph = content.split('\n\n').find(p => p.trim().length > 0);
        if (firstParagraph) {
            metadata.excerpt = firstParagraph.replace(/^#.+$/m, '').substring(0, 160).trim();
        }
    }

    return metadata;
}

// Helper function to ensure consistent date formatting
function formatDateString(dateString) {
    try {
        // Try parsing as ISO date (YYYY-MM-DD)
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0];
        }
        
        // Try parsing other common formats if needed
        // Add additional format patterns here if your dates use different formats
        
        // Fallback to today's date if parsing fails
        return new Date().toISOString().split('T')[0];
    } catch {
        return new Date().toISOString().split('T')[0];
    }
}

// Load and display list of posts
async function loadPostList() {
    try {
        // Fetch the list of markdown files from the posts directory
        // Note: This requires a directory listing enabled or a pre-generated index.json
        // For GitHub Pages, we'll implement a workaround
        const posts = await fetchPostsList();
        
        const postList = document.getElementById('post-list');
        postList.innerHTML = '';
        
        // Sort posts by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Display each post
        for (const post of posts) {
            const postElement = document.createElement('article');
            postElement.className = 'post-card';
            postElement.innerHTML = `
                <h3 class="post-title"><a href="${BASE_URL}?post=${post.slug}">${post.title}</a></h3>
                <div class="post-date">${formatDate(post.date)}</div>
                <p class="post-excerpt">${post.excerpt}</p>
                <a href="${BASE_URL}?post=${post.slug}" class="read-more">Read more →</a>
            `;
            postList.appendChild(postElement);
        }
    } catch (error) {
        console.error('Error loading posts:', error);
        document.getElementById('post-list').innerHTML = 
            '<p class="error">Failed to load posts. Please try again later.</p>';
    }
}

async function fetchPostsList() {
    try {
        const response = await fetch(`${BASE_URL}posts.json`);
        if (!response.ok) throw new Error('Could not load posts index');
        
        const postsData = await response.json();
        const posts = [];
        
        // Process each post in parallel
        await Promise.all(postsData.map(async ({slug}) => {
            try {
                const postResponse = await fetch(`${POSTS_DIR}${slug}.md`);
                if (!postResponse.ok) return;
                
                const markdown = await postResponse.text();
                const metadata = extractMetadata(markdown);
                
                posts.push({
                    slug,
                    title: metadata.title || slug.replace(/-/g, ' '),
                    date: metadata.date,
                    excerpt: metadata.excerpt || '',
                    image: metadata.image || ''
                });
            } catch (error) {
                console.error(`Error processing post ${slug}:`, error);
            }
        }));
        
        // Sort posts by date (newest first)
        return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
        console.error('Error loading posts:', error);
        return [];
    }
}

// Load and render a single post
async function loadPostContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get('post');

    if (!postSlug) {
        window.location.href = BASE_URL;
        return;
    }

    try {
        const response = await fetch(`${POSTS_DIR}${postSlug}.md`);
        if (!response.ok) throw new Error('Post not found');

        const markdown = await response.text();
        const html = marked.parse(markdown);

        // Create the post content structure
        const postContent = document.createElement('article');
        postContent.className = 'post-content';
        postContent.innerHTML = html;

        // Add back link
        const backLink = document.createElement('a');
        backLink.href = BASE_URL;
        backLink.textContent = '← Back to home';
        backLink.style.display = 'block';
        backLink.style.marginBottom = '2rem';

        // Add footer
        const footer = document.createElement('footer');
        footer.className = 'footer'; // Add the 'footer' class

        // Create the div for flex layout within the footer
        const footerDiv = document.createElement('div');
        footerDiv.style.display = 'flex';
        footerDiv.style.justifyContent = 'space-between';
        footerDiv.style.alignItems = 'center';

        // Create the copyright section
        const copyrightDiv = document.createElement('div');
        copyrightDiv.innerHTML = `&copy; <span id="year"></span> Peter Vils Hansen`;

        // Create the back to home link for the footer
        const footerBackLink = document.createElement('a');
        footerBackLink.href = BASE_URL;
        footerBackLink.textContent = 'Back to home →';

        // Append elements to the footer div
        footerDiv.appendChild(copyrightDiv);
        footerDiv.appendChild(footerBackLink);

        // Append the footer div to the footer
        footer.appendChild(footerDiv);

        // Replace the loading indicator with the actual content
        const container = document.getElementById('post-content') || document.querySelector('main');
        container.innerHTML = '';
        container.appendChild(backLink);
        container.appendChild(postContent);
        container.appendChild(footer); // Append footer

        // Update the page title
        const postTitle = postContent.querySelector('h1')?.textContent || 'Blog Post';
        document.title = `${postTitle} | Minimal Blog`;

        // Set the year in the footer after it has been added to the DOM
        document.getElementById('year').textContent = new Date().getFullYear();

    } catch (error) {
        console.error('Error loading post:', error);
        const container = document.getElementById('post-content') || document.querySelector('main');
        container.innerHTML = `
            <div class="error">
                <h2>Post Not Found</h2>
                <p>The requested post could not be loaded.</p>
                <a href="${BASE_URL}">← Back to home</a>
            </div>
        `;
    }
}

// Load and render a single page
async function loadPageContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const pageSlug = urlParams.get('page');

    if (!pageSlug) {
        window.location.href = BASE_URL;
        return;
    }

    try {
        const response = await fetch(`${PAGES_DIR}${pageSlug}.md`);
        if (!response.ok) throw new Error('Page not found');

        const markdown = await response.text();
        const html = marked.parse(markdown);

        // Create the post content structure
        const postContent = document.createElement('article');
        postContent.className = 'post-content';
        postContent.innerHTML = html;

        // Add back link
        const backLink = document.createElement('a');
        backLink.href = BASE_URL;
        backLink.textContent = '← Back to home';
        backLink.style.display = 'block';
        backLink.style.marginBottom = '2rem';

        // Add footer
        const footer = document.createElement('footer');
        footer.className = 'footer'; // Add the 'footer' class

        // Create the div for flex layout within the footer
        const footerDiv = document.createElement('div');
        footerDiv.style.display = 'flex';
        footerDiv.style.justifyContent = 'space-between';
        footerDiv.style.alignItems = 'center';

        // Create the copyright section
        const copyrightDiv = document.createElement('div');
        copyrightDiv.innerHTML = `&copy; <span id="year"></span> Peter Vils Hansen`;

        // Create the back to home link for the footer
        const footerBackLink = document.createElement('a');
        footerBackLink.href = BASE_URL;
        footerBackLink.textContent = 'Back to home →';

        // Append elements to the footer div
        footerDiv.appendChild(copyrightDiv);
        footerDiv.appendChild(footerBackLink);

        // Append the footer div to the footer
        footer.appendChild(footerDiv);

        // Replace the loading indicator with the actual content
        const container = document.getElementById('post-content') || document.querySelector('main');
        container.innerHTML = '';
        container.appendChild(backLink);
        container.appendChild(postContent);
        container.appendChild(footer); // Append footer

        // Update the page title
        const postTitle = postContent.querySelector('h1')?.textContent || 'Blog Page';
        document.title = `${postTitle} | Minimal Blog`;

        // Set the year in the footer after it has been added to the DOM
        document.getElementById('year').textContent = new Date().getFullYear();

    } catch (error) {
        console.error('Error loading page:', error);
        const container = document.getElementById('post-content') || document.querySelector('main');
        container.innerHTML = `
            <div class="error">
                <h2>Page Not Found</h2>
                <p>The requested page could not be loaded.</p>
                <a href="${BASE_URL}">← Back to home</a>
            </div>
        `;
    }
}

// Helper function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    try {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? '' : date.toLocaleDateString(undefined, options);
    } catch {
        return '';
    }
}

// Handle navigation between homepage and posts
function handleNavigation() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('post')) {
        // We're viewing a post
        if (!document.getElementById('post-content')) {
            // Create post content container if it doesn't exist
            const main = document.querySelector('main');
            main.innerHTML = '<div id="post-content" class="loading">Loading post...</div>';
        }
        loadPostContent();
    } else {
        // We're on the homepage
        if (document.getElementById('post-list')) {
            loadPostList();
        }
    }
}

// Listen for back/forward navigation
window.addEventListener('popstate', handleNavigation);

// Initial load
handleNavigation();