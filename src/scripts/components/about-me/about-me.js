import familyPortrait from './family-in-natural-playarea.jpg';
import React from 'react';
import styles from './about-me.css';

class AboutMe extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <article className={styles.container}>
        <div className={styles.leftColumn}>
          <figure className={styles.selfPortraitContainer}>
            <span className={styles.selfPortraitImage}></span>
          </figure>
        </div>
        <div className={styles.rightColumn}>
          <p className={styles.copy}>
            Welcome to the website of Mike DiLorenzo, husband, father, hiker, 
            mountain biker, cross country skier, mountain enthusiast, craft beer 
            drinker, front end web developer and overall nice guy. 
          </p>
          <figure className={styles.familyPortraitContainer}>
            <span className={styles.familyPortraitImage}></span>
          </figure>
          <p className={styles.copy}>
            This website chronicles some of the more interesting things I've done: 
            hiking, traveling and landscaping. The site will be updated when I do 
            cool things, so don't be discouraged if it isn't updated for a few 
            months. Eventually coolness will return.
          </p>
        </div>
      </article>
    );
  }
}

export default AboutMe;