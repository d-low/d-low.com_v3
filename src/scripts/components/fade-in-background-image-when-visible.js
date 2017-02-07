import FadeInBackgroundImage from './fade-in-background-image/fade-in-background-image.js';
import scrollEventsHandler from './scroll-events-handler/scroll-events-handler.js';

const FadeInBackgroundImageWhenVisible = scrollEventsHandler(FadeInBackgroundImage);

export default FadeInBackgroundImageWhenVisible;
