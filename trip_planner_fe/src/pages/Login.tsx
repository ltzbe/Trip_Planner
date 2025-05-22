import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/authContext";
import "../css/login.css";

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
      navigate("/dashboard");
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
              <label htmlFor="email" className="input-labels">E-Mail</label>
              <input
                type="email"
                className="email-input"
                placeholder="E-Mail eingeben" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="password" className="input-labels">Passwort</label>
              <input
                type="password"
                className="password-input"
                placeholder="Passwort eingeben"
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
