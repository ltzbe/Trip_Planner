import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/authContext";
import "../css/Home.css";

import RouteIcon from "../assets/route-icon.png";
import BedIcon from "../assets/bed-icon.png";
import PlateIcon from "../assets/plate-icon.png";
import GasIcon from "../assets/gas-icon.png";
import MacBook from "../assets/MacBook-Mockup.png";

function Home() {
  const { token } = useAuth();

  return (
    <div style={{ backgroundColor: "#eeeeee" }}>
      <main>
        <div className="hero">
          <div className="hero-icon-container">
            {/* <img src={HeroIcon} alt="Laptop-Icon" className="hero-icon" /> */}
          </div>
          <div className="hero-text">
            <h1>Plane deine nächste Reise mit Leichtigkeit</h1>
            <p>
              Finde die schönsten und interresantesten Orte auf deinem Trip!
            </p>
            {!token ? (
              <Link to="/login" className="hero-button">
                Jetzt loslegen
              </Link>
            ) : (
              <Link to="/dashboard-overview" className="hero-button">
                Zum Dashboard
              </Link>
            )}
          </div>
        </div>

        <div className="wave-divider">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            width="100%"
            height="150px"
          >
            <path
              fill="#eeeeee"
              fillOpacity="1"
              d="M0,64L80,85.3C160,107,320,149,480,144C640,139,800,85,960,96C1120,107,1280,181,1360,218.7L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="feature-cards-title">
          <h1>Unsere Funktionen</h1>
        </div>
        <div className="feature-card-wrapper">
          <div className="feature-card">
            <div className="feature-icon">
              <img
                src={RouteIcon}
                alt="feature-card-icon"
                className="feature-icon"
              />
            </div>
            <h3 className="feature-card-title">Routen planen!</h3>
            <p className="feature-card-text">
              Du gibst uns Ziel und Start. Wir geben die beste Route.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <img
                src={GasIcon}
                alt="feature-card-icon"
                className="feature-icon"
              />
            </div>
            <h3 className="feature-card-title">Tankstellen finden!</h3>
            <p className="feature-card-text">
              Lass dir deinen Trip nicht von einem leeren Tank vermiesen.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img
                src={PlateIcon}
                alt="feature-card-icon"
                className="feature-icon"
              />
            </div>
            <h3 className="feature-card-title">Restaurants entdecken!</h3>
            <p className="feature-card-text">
              Hunger ist menschlich. Plane, wann du auf deinem Trip
              schnabulierst.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img
                src={BedIcon}
                alt="feature-card-icon"
                className="feature-icon"
              />
            </div>
            <h3 className="feature-card-title">Schlafplatz sichern!</h3>
            <p className="feature-card-text">
              Wirst du müde musst du schlafen. Wir suchen für dich nach
              Schlafplätzen.
            </p>
          </div>
        </div>
        <div className="dashboard-preview-wrapper">
          <div className="dashboard-preview-icons">
            {<img src={MacBook} alt="MacBook" className="macbook-icon" />}
          </div>
          <div className="dashboard-preview-text">
            <h2>
              Entdecken Sie unser{" "}
              <span className="dashboard-preview-text-highlight">
                Dashboard
              </span>
            </h2>
            <p>So leicht war es noch nie!</p>
          </div>
        </div>
      </main>
      <div
        className="preview-footer-divider"
        style={{ backgroundColor: "#eeeeee", height: "200px" }}
      ></div>
    </div>
  );
}

export default Home;
