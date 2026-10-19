import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../../Context/ThemeContext";
import { PERFIL_DATA } from "../../../data/portfolioData";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { to: "/home", label: "Inicio" },
  { to: "/experiencia", label: "Experiencia" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/herramientas", label: "Herramientas" },
  { to: "/educacion", label: "Educación" },
  { to: "/cursos", label: "Cursos" },
  { to: "/idiomas", label: "Idiomas" },
];

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.headerWrapper} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navbar}>
        <Link to="/home" className={styles.brand} aria-label="Ir al inicio - Augusto Comeglio">
          <span className={styles.brandMonogram}>AC</span>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Augusto Comeglio</span>
            <span className={styles.brandRole}>
              <span className={styles.onlineDot} aria-hidden="true" />
              RPA Developer Sr
            </span>
          </div>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="Navegación principal">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to} className={styles.navItem}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={styles.mobileCta}>
            <a
              href={PERFIL_DATA.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Descargar CV
            </a>
          </div>
        </nav>

        <div className={styles.actions}>
          <a
            href={PERFIL_DATA.cvUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.cvButton}
            title="Abrir Curriculum Vitae en PDF"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <polyline points="9 15 12 18 15 15" />
            </svg>
            <span>CV</span>
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label={
              theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
            }
            title={
              theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
            }
          >
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
