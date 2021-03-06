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

- Install dependencies: `npm install`
- Run locally: `npm start`
- Build distribution: `npm run build`

To Do
---

- **Bugs**:
  - Rendering
    - [ ] Add description and keyword `<meta>` tags to have _basic_ SEO!!!
    - [ ] content.js isn't reloaded after update on disk
    - [ ] Site doesn't render on IE 11.
    - [ ] Sort posts in ascending, not reverse, chronological order
  - Mobile site header 
    - [ ] Scroll to start position when route changes and component hidden
  
- **Improvements**
  - Image Slider
    - [ ] Display as new _page_ on mobile instead of in a modal
    - [ ] Use pulse animation to indicate first/last image
    - [ ] Make label stationary, keeping position the same as images transition, and fade out/in new text.
    - [ ] Display loading indicator if image not loaded in X sec after image scrolled into view
    - [ ] Use faster transition between images
    - [ ] Prevent scrolling on main page when image slider is visible
    - [ ] Don't display old images more than 1.5x larger than dimensions on disk
  - Admin
    - [ ] Upgrade to newest React, Webpack, etc.
    - [ ] Load data (/data/content.js) asynchrounously on page load and once loaded run the app.
    - [ ] Webpack doesn't reload CSS in site when updated!
  - CSS
    - [ ] Use consistent heading styles 
    - [ ] Use single z_index.css file for all z-index on site
    - [ ] Use CSS grid for layout as described in this [article](https://medium.com/deemaze-software/css-grid-responsive-layouts-and-components-eee1badd5a2f)
  - Fade in background image issues:
    - [ ] Use [Intersection Observer](https://deanhume.com/Home/BlogPost/lazy-loading-images-using-intersection-observer/10163) instead of monitoring the scroll position
    - [ ] Clear image cache after X images inserted?
    - [ ] Previously loaded images aren't displayed immediately
  - React Router
    - [ ] Use mobile page transitions (à la Clip Artist App)?
    - [ ] Can we reduce the number of re-rendered components when navigating from home page?
  - Code Review
    - [ ] Use consistent coding style for presentation components definition 
