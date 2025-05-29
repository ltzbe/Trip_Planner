import { Link } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import "../css/Home.css";

import RouteIcon from "../assets/route-icon.png";
import BedIcon from "../assets/bed-icon.png";
import PlateIcon from "../assets/plate-icon.png";
import GasIcon from "../assets/gas-icon.png";
import MacBook from "../assets/MacBookPicture.png";
import iphone from "../assets/iphone.png";

function Home() {
  const { token } = useAuth();

  return (
    <div>
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
              fill-opacity="1"
              d="M0,64L80,85.3C160,107,320,149,480,144C640,139,800,85,960,96C1120,107,1280,181,1360,218.7L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="feature-cards-title">
          <h1>Unsere Funktionen</h1>
        </div>
        <div className="feature-card-wrapper">
          <div className="feature-cards">
            <div className="feature-card-icon">
              <img
                src={RouteIcon}
                alt="Route-Icon"
                className="card-icons route-icon"
              />
            </div>
            <div className="feature-card-text">
              <p>Plane deinen unvergesslichen Trip</p>
            </div>
          </div>

          <div className="feature-cards">
            <div className="feature-card-icon">
              <img
                src={BedIcon}
                alt="Route-Icon"
                className="card-icons bed-icon"
              />
            </div>
            <div className="feature-card-text">
              <p>Lasse dir Hotels auf deinem Weg anzeigen</p>
            </div>
          </div>

          <div className="feature-cards">
            <div className="feature-card-icon">
              <img
                src={PlateIcon}
                alt="Route-Icon"
                className="card-icons plate-icon"
              />
            </div>
            <div className="feature-card-text">
              <p>Finde die besten Restaurants</p>
            </div>
          </div>

          <div className="feature-cards">
            <div className="feature-card-icon">
              <img
                src={GasIcon}
                alt="Route-Icon"
                className="card-icons gas-icon"
              />
            </div>
            <div className="feature-card-text">
              <p>Lass deinen Tank niemals leer werden</p>
            </div>
          </div>
        </div>

        <div className="dashboard-preview-wrapper">
          <div className="dashboard-preview-icons">
            <img src={MacBook} alt="MacBook" className="macbook-icon" />
            <img src={iphone} alt="Phone" className="iphone-icon" />
          </div>
          <div className="dashboard-preview-text">
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
