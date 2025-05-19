import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  return (
    <div>
      <main>
        <div className="login-wrapper">
          <div className="login-title">
            <h1>Willkommen zurück!</h1>
          </div>

          <div className="login-fields">
            <input type="email" className="email-input" placeholder="E-Mail" />
            <input type="password" className="password-input" placeholder="Passwort" />
          </div>

          <div className="login-buttons">
            <button className="login-btn">Login</button>
            <button className="register-btn">Registrieren</button>
          </div>
          <div className="login-footer">
            <Link to="/">Zurück zur Startseite</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
