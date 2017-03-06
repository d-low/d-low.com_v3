/**
 * @description The Utils object contains a collection of utility methods used
 * across the site.
 */
const Utils = {
  /**
   * @description Scroll to requested Y position using easing transition and
   * request animation frame.
   * @see http://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation#26808520
   */
  scrollToY: function scrollToY(scrollTargetY = 0) {
    return new Promise((resolve) => {
      let currentTime = 0;
      const pageYOffset = window.pageYOffset;
      const time = 0.5;

      // Easing equation from https://github.com/danro/easing-js/blob/master/easing.js
      const easeOutSine = pos => Math.sin(pos * (Math.PI / 2));

      // Add animation loop
      const tick = () => {
        currentTime += 1 / 60;

        const p = currentTime / time;
        const t = easeOutSine(p);

        if (p < 1) {
          window.scrollTo(
            0,
            pageYOffset + ((scrollTargetY - pageYOffset) * t),
          );
          window.requestAnimationFrame(tick);
        } else {
          window.scrollTo(0, scrollTargetY);
          resolve();
        }
      };

      // call it once to get started
      tick();
    });
  },
};

export default Utils;
