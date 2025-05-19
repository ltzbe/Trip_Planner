import './App.css';
import Navbar from "./components/navbar"; // Import Navbar
import Footer from "./components/footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === "/login";

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
}

export default App;
