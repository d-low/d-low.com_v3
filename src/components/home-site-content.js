import React from 'react';
import selfPortrait from '../images/mike-the-elf-236x400.jpg';
import familyPortrait from '../images/family-in-natural-playarea.jpg';

class HomeSiteContent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <article>
        <img src={selfPortrait} />
        <div>
          <p>
            Welcome to the website of Mike DiLorenzo, husband, father, hiker, 
            mountain biker, cross country skier, mountain enthusiast, craft beer 
            drinker, front end web developer and overall nice guy. 
          </p>
          <p>
            This website chronicles some of the more interesting things I've done: 
            hiking, traveling and landscaping. The site will be updated when I do 
            cool things, so don't be discouraged if it isn't updated for a few 
            months. Eventually coolness will return.
          </p>
        </div>
        <img src={familyPortrait} />
      </article>
    );
  }
}

export default HomeSiteContent;