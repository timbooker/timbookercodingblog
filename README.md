# Empty Poet

This is an empty [Poet](https://github.com/jsantell/poet) blog with the basic [Jade](https://github.com/visionmedia/jade) templates from the examples folder. It's all set up for deployment from **GitHub** into [Windows Azure Web Sites](http://www.windowsazure.com/en-us/services/web-sites/), and will probably work perfectly well with other Cloud platforms too.

You can either fork the project through GitHub or clone it and fork it manually.

## Modifications

I made a couple of modifications to the project and templates from the Poet examples:

### server.js

The default name for [ExpressJS](https://github.com/visionmedia/express) apps is `app.js`, but Windows Azure Web Sites require this to be `server.js`. You might need to change it back if you're using another platform.

### Twitter Bootstrap 3

The layout template references the [Twitter Bootstrap 3](https://github.com/twbs/bootstrap) stylesheet from the BootstrapCDN, and I updated the templates to use the new TBS 3 classes.

### Disqus

There are some commented-out lines at the end of post.jade to add [Disqus](http://disqus.com/) comments. Uncomment them and add your Disqus short-name if you want to enable Disqus in your blog.

### Date format
I've added [Moment.js](https://github.com/moment/moment/) and use that to format dates in posts using yyyy-MM-DD instead of the Poet default.

## Contribute

If you use this template and make modifications that you think might be useful to other people, please consider sending me a pull request with those changes.

## Acknowledgements

Obviously most of the hard work here has been done by [Jordan Santell](https://github.com/jsantell), along with the fine folks who make ExpressJS and Jade, and Node.js.