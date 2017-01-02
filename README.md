d-low.com 
---
 
This is the fourth iteration of my personal website d-low.com which chronicles
adventurous and less adventurous things I've done in my life. The fourth 
iteration was built to showcase my skills as a front end web developer and learn
new, modern, front end technologies. It is built with a mobile first approach, 
written in ES6, using the React library, making use of CSS modules, and using 
Webpack as the module bundler and build tool.
 
 
Setup
---
 
```
npm install
npm watch 
```

To Do
---

- [ ] Use content and data from d-low.com when running locally!
  - [ ] Load data (/data/content.js) asynchrounously on page load and once loaded 
        run the app! 

- [ ] CSS:
  - [x] Reset
  - [ ] Layout 
  - [ ] Element Defaults
  - [x] Typography
  - [x] Fonts
    - [ ] Generate new icomoon fonts: Missing alternative formats, too many unused icons
  - [ ] Use CSS modules where appropriate. See:
    - https://www.bensmithett.com/smarter-css-builds-with-webpack/
    - http://glenmaddern.com/articles/css-modules
    - https://css-tricks.com/css-modules-part-1-need/

- [ ] React component or utility method to fade in background images 
  - Imagesloaded plugin from Desandro works on background images!
    - See: https://www.npmjs.com/package/imagesloaded#background

- [ ] Home Page:
  - [ ] Pass content into components as property
  - [ ] Finish missing home page functionality
    - [ ] Most recent post
  - [ ] Add static content:
    - [x] Hero images
    - [ ] Icon fonts
  - [ ] Home page component styles
    - [x] Home page header
    - [ ] Home page navigation
    - [ ] Home page site content
    - [ ] Home page footer

 - [ ] Site header styles for home page vs. all other pages


- [ ] Add jshint
- [ ] Where do we place common utilities in this new site?
- [ ] Add tests

- [ ] Set up client side routing
  - [ ] 05-Colorado/ (listing page)
  - [ ] 05-Colorado/11-Colorado-2016/ (listing page)
  - [ ] 05-Colorado/11-Colorado-2016/04-Fall (articles page)
  - [ ] 05-Colorado/11-Colorado-2016/04-Fall/02-The_Walkway-Nov_25_2016 (article page)
  - [ ] Handle all of the above prefixed by "#content/" to remap Backbone routes

- [ ] Render each of the above pages
- [ ] CSS for the modules on each of the above pages

- [ ] Performant parallax on home page hero image
  - See: https://developers.google.com/web/updates/2016/12/performant-parallaxing
- [ ] Lazy load images
- [ ] Image carousel
  - [ ] Use ideal image slider but re-write as react component?