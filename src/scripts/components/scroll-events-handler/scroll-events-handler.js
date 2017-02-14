/**
 * @description This higher order component provides common behavior to handle
 * scroll events in the wrapped component. When scrolling if the wrapped
 * component has a scroll() method it will be called so that the wrapped
 * component can handle scoll events. And when srolling finishes if the wrapped
 * component has a scrollStop() method it will be called to handle the scroll
 * stop event. The wrapped component can implent the removeScrollEvents method
 * and return true from it when it no longer needs to handle scroll events. The
 * event handlers in this component will be removed in that case.
 * @see https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.wuc1vyrk2
 * @see http://ejohn.org/blog/learning-from-twitter/
 */
function scrollEventsHandler(WrappedComponent) {
  return class ScrollEventsHandler extends WrappedComponent {
    constructor() {
      super();

      this.didScroll = false;
      this.scrollInterval = null;
      this.scrollStopTimeout = null;

      this.checkIfScrolled = this.checkIfScrolled.bind(this);
      this.handleScroll = this.handleScroll.bind(this);
      this.handleScrollStop = this.handleScrollStop.bind(this);
    }

    componentDidMount() {
      super.componentDidMount();
      window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
      if (typeof super.componentWillUnmount === 'function') {
        super.componentWillUnmount();
      }

      this.removeEventListener();
    }

    handleScroll() {
      if (typeof super.removeScrollEvents === 'function' &&
        super.removeScrollEvents()) {
        this.removeEventListener();
        return;
      }
      this.didScroll = true;

      if (!this.scrollInterval) {
        this.checkIfScrolled();
        this.scrollInterval = window.setInterval(this.checkIfScrolled, 16);
      }
    }

    handleScrollStop() {
      if (typeof super.scrollStop === 'function') {
        super.scrollStop();
      }

      window.clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }

    checkIfScrolled() {
      if (this.didScroll) {
        if (typeof super.scroll === 'function') {
          super.scroll();
        }

        window.clearTimeout(this.scrollStopTimeout);
        this.scrollStopTimeout = window.setTimeout(this.handleScrollStop, 100);

        this.didScroll = false;
      }
    }

    removeEventListener() {
      window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
      return super.render();
    }
  };
}

export default scrollEventsHandler;
