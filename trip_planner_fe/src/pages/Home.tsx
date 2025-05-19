import "./home.css";

function Home() {
  return (
    <div>
      <main>
        <div className="hero">
          <div className="hero-text">
            <h1>Plane deine nächste Reise mit Leichtigkeit</h1>
            <p>
              Finde die schönsten und interresantesten Orte auf deinem Trip!
            </p>
            <button className="hero-button">Jetzt loslegen</button>
          </div>
        </div>
        <div className="feature-card-wrapper">
          <div className="feature-cards">
            <h2>Entdecke neue Orte</h2>
            <p>Finde die besten Reiseziele und versteckten Schätze.</p>
          </div>
          <div className="feature-cards">
            <h2>Entdecke neue Orte</h2>
            <p>Finde die besten Reiseziele und versteckten Schätze.</p>
          </div>
          <div className="feature-cards">
            <h2>Entdecke neue Orte</h2>
            <p>Finde die besten Reiseziele und versteckten Schätze.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
