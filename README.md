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
npm watch 
```

To Do
---

- [ ] Pass links and posts to containers and then to components via props using Redux
  - [ ] Use content and data from d-low.com when running locally for portability?
  - [ ] Load data (/data/content.js) asynchrounously on page load and once loaded 
        run the app.
  - [ ] Pass parameter to webpack build to determine when to load content dynamically
        or just inspect the hostname..?

- [ ] Webpack production build

- [ ] CSS:
  - [x] Reset
  - [ ] Layout 
  - [ ] Element Defaults
  - [x] Typography
  - [x] Fonts
    - [x] Generate new icomoon fonts: Missing alternative formats, too many unused icons
  - [x] Use CSS modules where appropriate

- [x] React component or utility method to fade in background images 

- [ ] Home Page:
  - [ ] Pass links to TileNavigation component as props
  - [x] Finish missing home page functionality
    - [x] Most recent post
    - [x] Run logo fade code on page load
  - [x] Add static content:
    - [x] Hero images
    - [x] Icon fonts
  - [x] Home page component styles
    - [x] Home page header
    - [x] Home page navigation
    - [x] Home page site content
    - [x] Home page footer

- [ ] Site header styles
  - [ ] Home page
  - [ ] All other pages
    - [ ] Mobile navigation
    - [ ] Desktop navigation

- [x] Add eshint
- [ ] Where do we place common utilities in this new site?
- [ ] Add tests

- [ ] Set up client side routing
  - [ ] 05-Colorado/ (listing page)
  - [ ] 05-Colorado/11-Colorado-2016/ (listing page)
  - [ ] 05-Colorado/11-Colorado-2016/04-Fall (articles page)
  - [ ] 05-Colorado/11-Colorado-2016/04-Fall/02-The_Walkway-Nov_25_2016 (article page)
  - [ ] Handle all of the above prefixed by "#content/" to remap Backbone routes. Maybe
        handle in Apache config?

- [ ] Render each of the above pages
- [ ] CSS for the modules on each of the above pages

- [ ] Performant parallax on home page hero image
  - See: https://developers.google.com/web/updates/2016/12/performant-parallaxing
- [x] Lazy load images
- [ ] Image carousel
  - [ ] Use ideal image slider but re-write as react component?
