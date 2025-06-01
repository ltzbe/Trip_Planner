import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/authContext";
import "../css/LoginCard.css"
import "../css/loader.css"

const LoginCard = () => {
  const location = useLocation();
  const isRegister = location.pathname === "/register";
  const [loading, setLoading] = useState<boolean>(false)

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      login(data.token);
      setLoading(false)
      navigate("/dashboard-overview");
    } else {
      setLoading(false)
      alert("Login fehlgeschlagen");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      login(data.token);
      setLoading(false);
      navigate("/dashboard-overview");
    } else {
      setLoading(false);
      alert("Login fehlgeschlagen");
    }
  };

  return (
    <div className="login-page-centered">
      <Link to="/" className="login-button-back">
        Zurück zu Startseite
      </Link>
      <div className="login-card">
        <div className="login-left">
          <div className="login-form-container">
            <h1 className="login-title">
              {isRegister ? "Sign up" : "Sign in"}
            </h1>
            <p>
              {isRegister
                ? "Already have an account? "
                : "Don’t have an account? "}
              <Link to={isRegister ? "/login" : "/register"}>
                {isRegister ? "Sign in" : "Create Now"}
              </Link>
            </p>
            <form onSubmit={isRegister ? handleSignup : handleLogin}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
                required
              />

              {isRegister && (
                <>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    required
                  />
                </>
              )}

              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />

              <div className="options">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              <div className="signin-button">
                <button type="submit"
                  >
                    {loading ? <div className="loader"></div> :
                    isRegister ? "Sign up" :
                    "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="login-right">
          <div className="features">
            <h2>Lorem Ipsum</h2>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
