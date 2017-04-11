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
  - [ ] Load data (/data/content.js) asynchrounously on page load and once loaded 
        run the app.

- [ ] Administration/Development
  - [ ] Webpack production build
  - [x] Use [React dev tools](https://github.com/facebook/react-devtools)
  - [ ] Use minimal .htaccess to enable CORS etc.
  - [ ] Upgrade to React 15.5.0

- [ ] Site header styles
  - [ ] Mobile navigation
    - [ ] Fixed bottom menu with a show more option instead of a [hamburger](https://uxplanet.org/great-alternatives-to-hamburger-menus-d4c76d9414dd)

- [ ] CSS
  - [ ] Use consistent heading styles 

- [ ] Fade in background image issues:
  - [ ] Clear image cache after X images inserted?
  - [x] Parameterize component to use different background colors (i.e. black)

- [ ] React Router
  - [ ] Use mobile page transitions (à la Clip Artist App)?
  - [ ] Can we reduce the number of re-rendered components when navigating from home page?
  
- [ ] Pages/Routing
  - [ ] 05-Colorado/11-Colorado-2016/04-Fall/02-The_Walkway-Nov_25_2016 (article page)
  - [ ] Handle old "#content/" routes to remap Backbone routes. Maybe handle in Apache config?

- [ ] Bugs/Issues/Enhandements
  - [ ] Disable CORS in fetch() request? Or use wild card for origin?
  - [ ] Explore easing algorithms for home page down arrow scroll down animation timing
      - See: https://github.com/danro/easing-js/blob/master/easing.js
  - [ ] Generate index.html
      - [ ] May need JS to fetch d-low.com/data/content.js, with loading indicator, etc
      - See: 
        - https://www.npmjs.com/package/html-webpack-plugin
        - https://github.com/jaketrent/html-webpack-template/blob/86f285d5c790a6c15263f5cc50fd666d51f974fd/index.html
  - [ ] Use consistent coding style for presentation components definition

- [ ] Post features:
  - [ ] Image carousel
    - [x] Preload images
    - [x] Animations for open/close carousel
    - [x] Float last child right in image container
    - [x] Arrow key navigation
    - [ ] Show arrow buttons on hover, or only when no touch?
    - [ ] Style issues on mobile

  - [ ] Read more link to toggle long text on mobile?
