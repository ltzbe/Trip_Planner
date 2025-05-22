import './css/App.css';
import './css/variables.css';
import Navbar from "./components/navbar";
import Footer from "./components/footer";
// import Footer from "./components/footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from './components/protectedRoute';
import Dashboard from "./pages/Dashboard";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="app-wrapper">
      {!hideNavbarAndFooter && <Navbar />}                                        {/* Only show Navbar if not on login page */}
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
        {!hideNavbarAndFooter && <Footer />}
      </main>
    </div>
  );
}

export default App;
