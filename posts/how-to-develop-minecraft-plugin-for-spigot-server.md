# Unlock the power of Minecraft customization!

<!--
date: 2019-02-19
excerpt: This guide demystifies the process of developing your own Minecraft plugins for Spigot servers. Combining coding expertise with Minecraft passion, it offers a concise, step-by-step approach to creating functional plugins. Learn to set up your development environment, write essential code, and deploy your creations seamlessly. Whether you're a seasoned coder or a Minecraft enthusiast looking to expand your skills, this book provides the tools to bring your unique Minecraft visions to life.
-->

The topic for today is sufficiently interesting to people outside Denmark that I have decided to write this blog post in English in order to reach a wider audience.

For a few years I taught a bunch of kids computer science through the Coding Pirates initiative here in Denmark. Many of the kids had a keen interest in anything related to Minecraft, and for a while I tossed around the idea in my head of teaching them how to write a Minecraft plugin.

Although the idea never materialised into an actual lesson for various reasons, I did sit down with my oldest son one night to see if putting his deep knowledge of Minecraft and my twenty-plus years of coding experience together would result in an actual, working Minecraft plugin for the Spigot server I'd already set up for him some months earlier.

Turns out that indeed it did.

We didn't do it all by ourselves, or we would have spent days researching before reaching our goal instead of a few hours. Google whipped up a link to an excellent tutorial on JustDave's Blog which sped up the whole process by an order of magnitude. Thanks, Dave!

There's no need to regurgitate everything from Dave's post, but I'll just recap the most important steps here:

  1. Download and install the Java JDK (not the JRE, mind you).
  2. Download and build the Spigot Minecraft server (we'd already done that a few months prior).
  3. Install Eclipse IDE, or, I suppose, your Java IDE of choice, though if you don't install Eclipse, some of the later instructions will differ for your setup, too.
  4. Install the YEdit plugin in Eclipse. This is for easy editing of YAML files.
  5. Create a new project, a package, the Main class, and the plugin.yml, all in Eclipse.
  6. Create your build script, and tell Eclipse to use it.
  7. Start implementing the Main class. The Main class must extend the JavaPlugin class, and don't forget to @Override relevant methods.

When you're done implementing the Main class, export a JAR file from Eclipse, and copy that JAR file to the plugins subdirectory under your Spigot server directory. Restart Spigot, and assert that Spigot picks up the new plugin and loads it without errors.

Lastly, some quick Spigot reference links, taken directly from Dave's post:

  - [Spigot Plugin Development Page](http://www.spigotmc.org/wiki/spigot-plugin-development/)
  - [Spigot API Reference](https://hub.spigotmc.org/javadocs/spigot/)


