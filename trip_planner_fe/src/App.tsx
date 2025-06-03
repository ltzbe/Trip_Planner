import { Routes, Route, useLocation } from "react-router-dom";
import "./css/App.css";
import "./css/variables.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/protectedRoute";
import DashboardOverview from "./pages/DashboardOverview";
import DashboardRoutePlanner from "./pages/DashboardRoutePlanner";
import NotificationCard from "./components/notificationCard.tsx";
import Places from "./pages/Places.tsx";
import { MapProvider } from "./api/geoapify/mapContext.tsx";

function App() {
  const location = useLocation();
  const hideNavbarAndFooter = [
    "/login",
    "/register",
    "/dashboard-overview",
    "/dashboard-route-planner",
    "/places",
  ].includes(location.pathname);

  return (
    <div className="app-wrapper">
      {!hideNavbarAndFooter && <Navbar />}{" "}
      {/* Only show Navbar if not on login page */}
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard-overview"
            element={
              <ProtectedRoute>
                <MapProvider>
                  <DashboardOverview />
                </MapProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard-route-planner"
            element={
              <ProtectedRoute>
                <MapProvider>
                  <DashboardRoutePlanner />
                </MapProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/places"
            element={
              <ProtectedRoute>
                <MapProvider>
                  <Places />
                </MapProvider>
              </ProtectedRoute>
            }
          />
        </Routes>

        <NotificationCard />

        {!hideNavbarAndFooter && <Footer />}
      </main>
    </div>
  );
}

export default App;
