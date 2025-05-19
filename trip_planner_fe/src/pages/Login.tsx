import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/authContext";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      login(data.token);
      navigate("/dashboard"); // nach erfolgreichem Login weiterleiten
    } else {
      alert("Login fehlgeschlagen");
    }
  };

  return (
    <div>
      <main>
        <div className="login-wrapper">
          <div className="login-header">
            <Link to="/">Zurück zur Startseite</Link>
            <h1>Login</h1>
          </div>
          <form onSubmit={handleLogin}>
            <div className="login-fields">
              <input
                type="email"
                className="email-input"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="password-input"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="login-button">
              <Link to="/dashboard" className="login-btn">Login</Link>
            </div>
          </form>
          <div className="login-footer">
            <Link to="/register" className="register-btn">Noch kein Account?</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
