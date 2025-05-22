import "../css/Home.css";
import HeroIcon from "../assets/hero-icon.png";
import RouteIcon from "../assets/route-icon.png";
import BedIcon from "../assets/bed-icon.png";
import PlateIcon from "../assets/plate-icon.png";
import GasIcon from "../assets/gas-icon.png";

function Home() {
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
            <div className="feature-card icon">
              <img
                src={RouteIcon}
                alt="Route-Icon"
                className="card-icons route-icon"
              />
            </div>
            <div className="feature-card text">
              <p>Plane deinen unvergesslichen Trip</p>
            </div>
          </div>

          <div className="feature-cards">
            <div className="feature-card icon">
              <img
                src={BedIcon}
                alt="Route-Icon"
                className="card-icons bed-icon"
              />
            </div>
            <div className="feature-card text">
              <p>Lasse dir Hotels auf deinem Weg anzeigen</p>
            </div>
          </div>

          <div className="feature-cards">
            <div className="feature-card icon">
              <img
                src={PlateIcon}
                alt="Route-Icon"
                className="card-icons plate-icon"
              />
            </div>
            <div className="feature-card text">
              <p>Finde die besten Restaurants</p>
            </div>
          </div>

          <div className="feature-cards">
            <div className="feature-card icon">
              <img
                src={GasIcon}
                alt="Route-Icon"
                className="card-icons gas-icon"
              />
            </div>
            <div className="feature-card text">
              <p>Lass deinen Tank niemals leer werden</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
