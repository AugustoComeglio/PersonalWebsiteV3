import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CONTACTO_DATA, PERFIL_DATA } from "../../../data/portfolioData";
import styles from "./Footer.module.css";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACTO_DATA.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      window.location.href = `mailto:${CONTACTO_DATA.email}`;
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.topGrid}>
          <div className={styles.brandCol}>
            <div className={styles.brandHeader}>
              <span className={styles.monogram}>AC</span>
              <div>
                <h3 className={styles.name}>{PERFIL_DATA.nombre}</h3>
                <p className={styles.role}>{PERFIL_DATA.subtitulo}</p>
              </div>
            </div>
            <p className={styles.bio}>
              Ingeniero en Sistemas de Información (UTN) y Especialista en Automatización Robótica de Procesos (Blue Prism &amp; Power Automate) y desarrollo de software Full-Stack.
            </p>
            <div className={styles.quickActions}>
              <button
                type="button"
                onClick={handleCopyEmail}
                className={styles.copyEmailBtn}
              >
                <img
                  src="/Images/Contacto/email.png"
                  alt=""
                  className={styles.contactIcon}
                  loading="lazy"
                />
                <span>{copied ? "¡Email copiado al portapapeles!" : CONTACTO_DATA.email}</span>
              </button>
              <a
                href={PERFIL_DATA.cvUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.cvLinkBtn}
              >
                Ver CV Completo (PDF) ↗
              </a>
            </div>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Secciones</h4>
            <ul className={styles.navLinks}>
              <li><Link to="/home">Inicio &amp; Resumen</Link></li>
              <li><Link to="/experiencia">Experiencia Profesional</Link></li>
              <li><Link to="/proyectos">Proyectos Destacados</Link></li>
              <li><Link to="/herramientas">Stack &amp; Herramientas</Link></li>
              <li><Link to="/educacion">Educación Académica</Link></li>
              <li><Link to="/cursos">Cursos &amp; Certificaciones</Link></li>
              <li><Link to="/idiomas">Idiomas</Link></li>
            </ul>
          </div>

          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Canales de Contacto Directo</h4>
            <div className={styles.contactCards}>
              <a
                href={`mailto:${CONTACTO_DATA.email}`}
                className={styles.contactItem}
              >
                <img
                  src="/Images/Contacto/email.png"
                  alt="Email"
                  className={styles.contactIcon}
                  loading="lazy"
                />
                <div>
                  <span className={styles.contactLabel}>Correo Electrónico</span>
                  <span className={styles.contactValue}>{CONTACTO_DATA.email}</span>
                </div>
              </a>

              <a
                href={CONTACTO_DATA.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.contactItem}
              >
                <img
                  src="/Images/Contacto/telefono.png"
                  alt="Teléfono"
                  className={styles.contactIcon}
                  loading="lazy"
                />
                <div>
                  <span className={styles.contactLabel}>Teléfono / WhatsApp</span>
                  <span className={styles.contactValue}>{CONTACTO_DATA.telefono}</span>
                </div>
              </a>

              <a
                href={CONTACTO_DATA.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.contactItem}
              >
                <img
                  src="/Images/Contacto/linkedin.png"
                  alt="LinkedIn"
                  className={styles.contactIcon}
                  loading="lazy"
                />
                <div>
                  <span className={styles.contactLabel}>Perfil Profesional</span>
                  <span className={styles.contactValue}>LinkedIn ↗</span>
                </div>
              </a>

              <a
                href={CONTACTO_DATA.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.contactItem}
              >
                <img
                  src="/Images/Contacto/github.png"
                  alt="GitHub"
                  className={styles.contactIcon}
                  loading="lazy"
                />
                <div>
                  <span className={styles.contactLabel}>Repositorios &amp; Código</span>
                  <span className={styles.contactValue}>GitHub ↗</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <span>© {new Date().getFullYear()} Augusto Comeglio — PersonalWebsiteV3</span>
          <span className={styles.techBadge}>
            Diseñado con React 19 · Vite · Modern CSS
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
