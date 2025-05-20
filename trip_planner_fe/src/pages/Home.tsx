import "../css/Home.css";
import HeroIcon from "../assets/hero-icon.png";

function Home() {
  // useEffect(() => {
  //   document.body.style.backgroundImage = `url(${vanImg})`;
  //   document.body.style.backgroundSize = 'cover';
  //   document.body.style.backgroundPosition = 'center';
  //   document.body.style.minHeight = '100vh';
  //   document.body.style.backgroundRepeat = 'no-repeat';

  //   return () => {
  //     // Hintergrundbild beim Verlassen der Seite entfernen
  //     document.body.style.backgroundImage = '';
  //     document.body.style.backgroundSize = '';
  //     document.body.style.backgroundPosition = '';
  //     document.body.style.minHeight = '';
  //     document.body.style.backgroundRepeat = '';
  //   };
  // }, []);

  return (
    <div>
      <main>
        <div className="hero">
          <div className="hero-icon-laptop">
            <img src={HeroIcon} alt="Laptop-Icon" className="hero-icon" />
          </div>
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
