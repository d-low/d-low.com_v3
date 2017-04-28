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

- **Required for Launch**:
  - [x] Read more link to toggle lengthy text
  - [x] Reduce top margin above `.image-slider__itemsWrapper` on larger screens
  - [x] Only bind key up event handlers in ImageSlider component once, on initial update.
  - [x] Too much top margin above `.image-slider__itemsWrapper` on small screens in landscape view
  - [ ] What's New/Article Page - Link to an internal anchor:
        e.g.: `/05-Colorado/11-Colorado-2016/04-Fall#02-The_Walkway-Nov_25_2016`
  - [x] Use scrollable site header with right fade instead of a [hamburger](https://uxplanet.org/great-alternatives-to-hamburger-menus-d4c76d9414dd) in mobile view
    - [ ] Fix sticky hover on mobile after clicking on link
      - http://stackoverflow.com/questions/2741816/is-it-possible-to-force-ignore-the-hover-pseudoclass-for-iphone-ipad-users/27680370#40617793
      - https://www.jonathanfielding.com/an-introduction-to-interaction-media-features/
    - [ ] More elegant side fade out styles, or remove when link hover/active
  - [ ] Webpack production build
  - [ ] Handle old "#content/" routes to remap Backbone routes, _perhaps in Apache config_?
  - [ ] Use minimal .htaccess to enable CORS etc.
  
- **Future Work**:  
  - Admin
    - [ ] Upgrade to React 15.5.0
    - [ ] Generate index.html
      - See: 
        - https://www.npmjs.com/package/html-webpack-plugin
        - https://github.com/jaketrent/html-webpack-template/blob/86f285d5c790a6c15263f5cc50fd666d51f974fd/index.html
    - [ ] Load data (/data/content.js) asynchrounously on page load and once loaded 
        run the app.
    - [ ] Webpack doesn't reload CSS in site when updated!
  - CSS
    - [ ] Use consistent heading styles 
    - [ ] Explore easing algorithms for home page down arrow scroll down animation timing
      - See: https://github.com/danro/easing-js/blob/master/easing.js
    - [ ] Use single z_index.css file for all z-index on site
  - [ ] Fade in background image issues:
    - [ ] Clear image cache after X images inserted?
    - [ ] Previously loaded images aren't displayed immediately
  - React Router
    - [ ] Use mobile page transitions (à la Clip Artist App)?
    - [ ] Can we reduce the number of re-rendered components when navigating from home page?
  - Code Review
    - [ ] Use consistent coding style for presentation components definition 
  - Image Slider
    - [ ] Cycle to first image from last, and to last from first, with out going through all images (i.e. loop animation) or indicate to user that you're at the beginning/end (e.g. pulse animation left/right)
    - [ ] Handle pan events to drag through images naturally (e.g. Facebook app large image navigation) 
