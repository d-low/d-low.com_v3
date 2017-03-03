d-low.com 
---
 
This is the fourth iteration of my personal website d-low.com which chronicles
adventurous and less adventurous things I've done in my life. The fourth 
iteration was built to showcase my skills as a front end web developer and learn
new, modern, front end technologies. It is built with a mobile first approach, 
written in ES6, using the React library, making use of CSS modules, and using 
Webpack as the module bundler and build tool.

You may be wondering why this repository is titled `d-low.com_v3` when it is
the _fourth_ iteration of my personal website. The original version, written in
PHP in 2005, used Subversion for source control. So when newer versions were 
written, first in Ruby on Rails - which proved to be too slow, and then using
Backbone.js as a single page web app, they were hosted in repositories named
[d-low.com](https://github.com/d-low/d-low.com) and 
[d-low.com_v2](https://github.com/d-low/d-low.com_v2), respectively. So this
fourth iteration is hosted in the _v3_ repository in GitHub.
 
 
Setup
---
 
```
npm install
npm run watch 
```

To Do
---

- [ ] Content
  - [x] Pass links and posts to containers and then to components via props using Redux
  - [x] Use content and data from d-low.com when running locally for portability?
  - [ ] Load data (/data/content.js) asynchrounously on page load and once loaded 
        run the app.
  - [ ] Pass parameter to webpack build to determine when to load content dynamically
        or just inspect the hostname..?

- [ ] Administration/Development
  - [ ] Webpack production build
  - [ ] Use [React dev tools](https://github.com/facebook/react-devtools)
  - [ ] Use minimal .htaccess to enable CORS etc.
  - [ ] [Upgrade to webpack 2](https://webpack.js.org/guides/migrating/)

- [ ] Site header styles
  - [ ] Mobile navigation
    - [ ] Change color to gray when scrolled down to appear over tiles
    - [ ] Larger fontsize on small to medium screens.
    - [ ] Consider using a fixed bottom menu with a show more option instead of a [hamburger](https://uxplanet.org/great-alternatives-to-hamburger-menus-d4c76d9414dd)

- [ ] CSS
  - [x] Ensure global CSS (reset, typography, defaults) appears first in bundle
  - [ ] Do we need SASS? If not how to we apply reset?
  - [x] Self host web fonts using [typefaces node module](https://github.com/KyleAMathews/typefaces) 
  - [ ] Use consistent heading styles 

- [ ] Use consistent coding style for presentation components definition
- [ ] Where do we place common utilities in new site?
- [ ] Add tests

- [ ] Fade in background image issues:
  - [x] Image above the fold on page load doesn't fade in, it just appears.
  - [x] Are images faded in too soon if set to fade in when scrolled into view?
  - [x] Don't fade in image a second time when returning to same page?
  - [ ] Clear image cache after X images inserted?

- [ ] React Router
  - [x] Use Link to avoid page reloads
  - [x] Scroll to top of page before navigating to new page.
  - [ ] Use mobile page transitions (à la Clip Artist App)?
  - [ ] Can we reduce the number of re-rendered components when navigating from home page?
  
- [x] Rename Redux actions and reducers
- [x] Add down arrow at bottom of hero image on home page
  - [x] Use HTML and CSS to render this element as seen in this [example](https://www.google.com/search?q=aye) from Google.

- [x] Set up client side routing
  - [x] 05-Colorado/ (listing page)
  - [x] 05-Colorado/11-Colorado-2016/ (listing page)
  - [x] 05-Colorado/11-Colorado-2016/04-Fall (articles page)
  - [ ] 05-Colorado/11-Colorado-2016/04-Fall/02-The_Walkway-Nov_25_2016 (article page)
  - [ ] Handle all of the above prefixed by "#content/" to remap Backbone routes. Maybe
        handle in Apache config?

- [ ] Render each of the above pages
- [x] CSS for the modules on each of the above pages

- [ ] Bugs
  - [ ] Layout of post images in post image container when less than 4 images present!
  - [ ] Disable CORS in fetch() request? Or use wild card for origin?

- [ ] Performant parallax on home page hero image
  - See: https://developers.google.com/web/updates/2016/12/performant-parallaxing

- [ ] Post features:
  - [ ] Image carousel
    - [ ] Fork and re-write Ideal Image Slider as React component?
  - [ ] Read more link to toggle long text on mobile?
