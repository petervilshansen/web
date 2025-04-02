// Main application script
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Check if we're on the homepage or a post page
    if (document.getElementById('post-list')) {
        loadPostList();
    } else if (document.getElementById('post-content')) {
        loadPostContent();
    }
});

// Base URL for all links
const BASE_URL = 'https://petervilshansen.github.io/web/';
const POSTS_DIR = `${BASE_URL}posts/`;

// Function to extract metadata from Markdown content
function extractMetadata(markdown) {
    const metadata = {
        title: '',
        date: new Date().toISOString().split('T')[0],
        excerpt: '',
        image: ''
    };

    // HTML comment style front matter
    const htmlCommentMatch = markdown.match(/<!--\s*([\s\S]*?)\s*-->/);
    if (htmlCommentMatch) {
        const frontMatter = htmlCommentMatch[1];
        const dateMatch = frontMatter.match(/date:\s*(.+)/i);
        const excerptMatch = frontMatter.match(/excerpt:\s*(.+)/i);
        const imageMatch = frontMatter.match(/image:\s*(.+)/i);

        if (dateMatch) metadata.date = dateMatch[1].trim();
        if (excerptMatch) metadata.excerpt = excerptMatch[1].trim();
        if (imageMatch) metadata.image = imageMatch[1].trim();
    }

    // Extract title from first h1 heading
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    if (titleMatch) {
        metadata.title = titleMatch[1];
    }

    // Extract excerpt from first paragraph if not in front matter
    if (!metadata.excerpt) {
        const contentAfterFrontMatter = markdown.replace(/<!--[\s\S]*?-->/, '');
        const contentAfterTitle = contentAfterFrontMatter.replace(/^#\s+.+$\n/m, '');
        const firstParagraphMatch = contentAfterTitle.match(/^([^\n]+)/m);
        if (firstParagraphMatch) {
            metadata.excerpt = firstParagraphMatch[1].substring(0, 160);
        }
    }

    return metadata;
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
        
        // Replace the loading indicator with the actual content
        const container = document.getElementById('post-content') || document.querySelector('main');
        container.innerHTML = '';
        container.appendChild(backLink);
        container.appendChild(postContent);
        
        // Update the page title
        const postTitle = postContent.querySelector('h1')?.textContent || 'Blog Post';
        document.title = `${postTitle} | Minimal Blog`;
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

// Helper function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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