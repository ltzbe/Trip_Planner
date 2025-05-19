import "./home.css";

function Home() {
  return (
    <div>
      <main>
       <div className="hero">
         <h1>Plane deine nächste Reise mit Leichtigkeit</h1>
         <p>Finde die schönsten und interresantesten Orte auf deinem Trip!</p>
         <button className="hero-button">Jetzt loslegen</button>
       </div>
        <div className="features">
          <div className="feature">
            <h2>Reiseziele entdecken</h2>
            <p>Durchsuche eine Vielzahl von Reisezielen und finde das perfekte für dich.</p>
          </div>
          <div className="feature">
            <h2>Individuelle Reiseplanung</h2>
            <p>Erstelle deinen eigenen Reiseplan mit unseren benutzerfreundlichen Tools.</p>
          </div>
          <div className="feature">
            <h2>Teile deine Pläne</h2>
            <p>Teile deine Reisepläne mit Freunden und erhalte deren Feedback.</p>
          </div>
          </div>
        <div className="testimonials">
          <h2>Was unsere Nutzer sagen</h2>
          <div className="testimonial">
            <p>"Diese App hat meine Reiseplanung revolutioniert! Ich kann jetzt alles an einem Ort organisieren."</p>
            <p>- Max Mustermann</p>
          </div>
          <div className="testimonial">
            <p>"Die Benutzeroberfläche ist so intuitiv und einfach zu bedienen. Ich liebe es!"</p>
            <p>- Anna Müller</p>
          </div>
          </div>
      </main>
    </div>
  );
}

export default Home;
