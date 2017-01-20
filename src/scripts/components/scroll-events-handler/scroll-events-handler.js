/**
 * @description This higher order component provides common behavior to handle
 * scroll events in the wrapped component. When scrolling if the wrapped
 * component has a scroll() method it will be called so that the wrapped
 * component can handle it. And when srolling finishes if the wrapped component
 * has a scrollStop() method it will be called to handle that event.
 * @see https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.wuc1vyrk2
 * @see http://ejohn.org/blog/learning-from-twitter/
 * @todo Somehow allow wrapped component to remove the scroll event listener
 * if needed. For example, when the FadeInBackgroundImage component is wrapped
 * it will want to stop listening for scroll events once its element is in the
 * viewport since it will fade in its background image then and once faded in
 * it doesn't need to fade it in again!
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
      super.componentWillUnmount();
      this.removeEventListener();
    }

    handleScroll() {
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
