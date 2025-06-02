import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/auth/authContext.tsx";
import { useNotification } from "../context/notification/notificationContext.tsx";
import "../css/LoginCard.css";
import homeIcon from "../assets/home.png";
import "../css/loader.css"


const LoginCard = () => {
  const { addNotification } = useNotification();
  const location = useLocation();
  const isRegister = location.pathname === "/register";
  const isLogin= location.pathname === "/login";
  const [loading, setLoading] = useState<boolean>(false)

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      addNotification("Login erfolgreich", "success");
    } else {
      setLoading(false)
      addNotification("Login fehlgeschlagen", "error");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password != confirmPassword) {
      addNotification("Passwörter stimmen nicht überein", 
                      "error");
      return;
    }

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
      addNotification("Signup erfolgreich", "success");
    } else {
      setLoading(false);
      addNotification("Signup fehlgeschlagen", "error");
    }
  };

  return (
    <div className="login-page-centered">
      <div className="login-card">
        <Link to="/" className="login-button-back">
                <img src={homeIcon} alt="Home" className="home-icon" />
              </Link>
        <div className="login-left">
          <div className="login-form-container">
            <div className="login-title-container">
              <h1 className="login-title">
                {isRegister ? "Sign up" : "Sign in"}
              </h1>
            </div>

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
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    marginLeft: "8px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>


              {isRegister && (
              <>
              <label>Confirm Password</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    marginLeft: "8px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                  }}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </>
          )}
              

              <div className="options">
                <label className="custom-checkbox">
                  <input type="checkbox" /> 
                  <span className="checkmark"></span>
                  Remember me
                </label>
              {isLogin && (
                <>
                <Link to="/forgot-password">Forgot Password?</Link>
                </>
              )}
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
