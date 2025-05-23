import { NavLink } from "react-router-dom";
import { useState } from "react";
// import { useState } from "react";
import "../css/sidebar.css";

import UserIcon from "../assets/user.png";
import ArrowIcon from "../assets/arrow-left-from-line.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav
        className={isOpen ? "sidebar-opened" : "sidebar-closed"}
      >
        {isOpen && (
          <>
            <div className="sidebar-header-opened">
              <img
                src={UserIcon}
                alt="user-icon"
                className="sidebar-logo-opened"
              />
              <h2>Jonas</h2>
            </div>
            <ul className="sidebar-menu-opened">
              <p className="sidebar-menu-title-opened">Your Routes</p>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "sidebar-links-opened active"
                      : "sidebar-links-opened"
                  }
                >
                  Route 1
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "sidebar-links-opened active"
                      : "sidebar-links-opened"
                  }
                >
                  Route 2
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "sidebar-links-opened active"
                      : "sidebar-links-opened"
                  }
                >
                  Route 3
                </NavLink>
              </li>
            </ul>
            <div className="sidebar-footer-opened">
              <p className="sidebar-menu-title-opened">← Verlassen</p>
            </div>
          </>
        )}
        {!isOpen && (
          <>
            <div className="sidebar-header-closed">
              <img
                src={UserIcon}
                alt="user-icon"
                className="sidebar-logo-closed"
              />
            </div>
            <ul className="sidebar-menu-closed">
              <p className="sidebar-menu-title-closed">Your Routes</p>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "sidebar-links-closed active"
                      : "sidebar-links-closed"
                  }
                >
                  Route 1
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "sidebar-links-closed active"
                      : "sidebar-links-closed"
                  }
                >
                  Route 2
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "sidebar-links-closed active"
                      : "sidebar-links-closed"
                  }
                >
                  Route 3
                </NavLink>
              </li>
            </ul>
            <div className="sidebar-footer-closed">
              <p className="sidebar-menu-title-closed"><img src={ArrowIcon} alt="" /></p>
            </div>
          </>
        )}
      </nav>
      <div className="sidebar-tab" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "←" : "→"}
      </div>
    </>
  );
};

export default Sidebar;
