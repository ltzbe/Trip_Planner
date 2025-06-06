import React from 'react';
import '../css/about.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <main className="about-main">
        <h1>Über uns</h1>
        <h2>Wer wir sind</h2>
        <p>
          Hi! Wir sind ein Team von jungen, reiselustigen Studierenden vom Bodensee,
          die es sich zur Mission gemacht haben, Reisen einfacher, spannender und individueller zu gestalten.
          Unsere Idee? Ein Tripplaner, der nicht nur Routen erstellt, sondern euch Tankstellen, Restaurants und mehr
          auf eurer Route vorschlägt – maßgeschneidert für dich, deine Crew und deinen Vibe.
        </p>
      </main>
    </div>
  );
};

export default About;