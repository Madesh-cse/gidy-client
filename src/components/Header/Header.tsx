import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "../../styles/components/Header/_header.scss";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="profile-header">
        <nav>
          <div className="profile-flex-container">
            <div className="left-section">
              <div
                className={`hamburger ${mobileOpen ? "active" : ""}`}
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="company-logo">
                <Link to="/">
                  <img
                    src="https://d2d0jobwzy0nc3.cloudfront.net/static/Gidy_logo_full_transparent"
                    alt="logo"
                  />
                </Link>
              </div>

              <div className="company-nav">
                <ul>
                  <li>
                    <Link to="/">Jobs</Link>
                  </li>
                  <li>
                    <Link to="/">Hackathons</Link>
                  </li>
                  <li>
                    <Link to="/">Projects</Link>
                  </li>
                  <li>
                    <Link to="/">Tracks</Link>
                  </li>
                  <li>
                    <Link to="/">Organization</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="user-profile" ref={dropdownRef}>
              <div className="profile-trigger" onClick={() => setOpen(!open)}>
                <img src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?semt=ais_user_personalization&w=740&q=80" alt="profile" />
                <span className={`arrow ${open ? "rotate" : ""}`}>▼</span>
                 <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === "light" ? "🌙" : "☀️"}
                  </button>
              </div>

              {open && (
                <div className="dropdown">
                  <Link to="/">Profile</Link>
                  <Link to="/">Feedback</Link>
                  <button>Logout</button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* LEFT SIDEBAR MENU */}
      <div className={`mobile-sidebar ${mobileOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMobileOpen(false)}>
          Jobs
        </Link>
        <Link to="/" onClick={() => setMobileOpen(false)}>
          Hackathons
        </Link>
        <Link to="/" onClick={() => setMobileOpen(false)}>
          Projects
        </Link>
        <Link to="/" onClick={() => setMobileOpen(false)}>
          Tracks
        </Link>
        <Link to="/" onClick={() => setMobileOpen(false)}>
          Organization
        </Link>
      </div>

      {/* BACKDROP */}
      {mobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

export default Header;
