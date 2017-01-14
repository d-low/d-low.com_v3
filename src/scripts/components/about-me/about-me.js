import React from 'react';
import styles from './about-me.css';

const AboutMe = function AboutMe() {
  return (
    <article className={styles.container}>
      <div className={styles.leftColumn}>
        <figure className={styles.selfPortraitContainer}>
          <span className={styles.selfPortraitImage} />
        </figure>
      </div>
      <div className={styles.rightColumn}>
        <p className={styles.copy}>
          Welcome to the website of Mike DiLorenzo, husband, father, hiker,
          mountain biker, cross country skier, mountain enthusiast, craft beer
          drinker, front end web developer and overall nice guy.
        </p>
        <figure className={styles.familyPortraitContainer}>
          <span className={styles.familyPortraitImage} />
        </figure>
        <p className={styles.copy}>
          This website chronicles some of the more interesting things I&lsquo;ve done:
          hiking, traveling and landscaping. The site will be updated when I do
          cool things, so don&lsquo;t be discouraged if it isn&lsquo;t updated for a few
          months. Eventually coolness will return.
        </p>
      </div>
    </article>
  );
};

export default AboutMe;
