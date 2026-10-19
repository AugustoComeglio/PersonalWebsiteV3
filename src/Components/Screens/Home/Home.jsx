import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../UI/Header/Header";
import Footer from "../../UI/Footer/Footer";
import SpotlightCard from "../../UI/SpotlightCard/SpotlightCard";
import Experiencia from "../Experiencia/Experiencia";
import Proyectos from "../Proyectos/Proyectos";
import Herramientas from "../Herramientas/Herramientas";
import Educacion from "../Educacion/Educacion";
import Cursos from "../Cursos/Cursos";
import Idiomas from "../Idiomas/Idiomas";
import { PERFIL_DATA, CONTACTO_DATA } from "../../../data/portfolioData";
import styles from "./Home.module.css";

function PillarIcon({ type }) {
  if (type === "robot") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" y1="16" x2="8" y2="16" />
        <line x1="16" y1="16" x2="16" y2="16" />
      </svg>
    );
  }
  if (type === "code") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }
  if (type === "chart") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const Home = () => {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACTO_DATA.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${CONTACTO_DATA.email}`;
    }
  };

  return (
    <div className="page-shell">
      <Header />

      <main className="main-container">
        {/* HERO SECTION */}
        <section className={styles.heroSection} aria-label="Presentación principal">
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className="status-dot" style={{ color: "var(--accent-emerald)" }} />
              <span>RPA Developer Sr @ Ctrl365 · Ing. en Sistemas (UTN)</span>
            </div>

            <h1 className={styles.heroTitle}>
              Hola, soy{" "}
              <span className="gradient-text">{PERFIL_DATA.nombre}</span>
            </h1>

            <p className={styles.heroSubtitle}>{PERFIL_DATA.subtitulo}</p>

            <p className={styles.heroBio}>{PERFIL_DATA.acercaDeMi}</p>

            <div className={styles.heroActions}>
              <a
                href={PERFIL_DATA.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <span>Ver Curriculum Vitae (PDF)</span>
                <span aria-hidden="true">↗</span>
              </a>

              <a href="#proyectos" className="btn-secondary">
                <span>Explorar Proyectos</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="btn-secondary"
              >
                <span>
                  {emailCopied ? "¡Email copiado!" : "Copiar Correo"}
                </span>
              </button>
            </div>

            <div className={styles.socialStrip}>
              <a
                href={CONTACTO_DATA.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.socialPill}
              >
                <img
                  src="/Images/Contacto/linkedin.png"
                  alt=""
                  className={styles.socialIcon}
                />
                <span>LinkedIn</span>
              </a>
              <a
                href={CONTACTO_DATA.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.socialPill}
              >
                <img
                  src="/Images/Contacto/github.png"
                  alt=""
                  className={styles.socialIcon}
                />
                <span>GitHub</span>
              </a>
              <a
                href={CONTACTO_DATA.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.socialPill}
              >
                <img
                  src="/Images/Contacto/telefono.png"
                  alt=""
                  className={styles.socialIcon}
                />
                <span>{CONTACTO_DATA.telefono}</span>
              </a>
              <a
                href={`mailto:${CONTACTO_DATA.email}`}
                className={styles.socialPill}
              >
                <img
                  src="/Images/Contacto/email.png"
                  alt=""
                  className={styles.socialIcon}
                />
                <span>{CONTACTO_DATA.email}</span>
              </a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <SpotlightCard className={styles.portraitFrame} as="div">
              <div className={styles.portraitInner}>
                {/* MANDATORY LCP Optimization: fetchpriority="high" and no loading="lazy" */}
                <img
                  src={PERFIL_DATA.foto}
                  alt="Foto de perfil de Augusto Comeglio"
                  className={styles.portraitImg}
                  fetchpriority="high"
                  width="420"
                  height="500"
                />
                <div className={styles.portraitCaption}>
                  <span className={styles.captionTitle}>Augusto Comeglio</span>
                  <span className={styles.captionSub}>
                    Automatización de Procesos &amp; Ingeniería de Software
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </section>

        {/* METRICS STRIP */}
        <section className={styles.metricsGrid} aria-label="Indicadores clave">
          {PERFIL_DATA.metricas.map((m, idx) => (
            <SpotlightCard key={idx} className={styles.metricCard}>
              <span className={`${styles.metricValue} gradient-text`}>
                {m.valor}
              </span>
              <span className={styles.metricLabel}>{m.etiqueta}</span>
              <span className={styles.metricDetail}>{m.detalle}</span>
            </SpotlightCard>
          ))}
        </section>

        {/* BENTO GRID: ACERCA DE MÍ, HABILIDADES Y OBJETIVOS */}
        <section className="section-block" id="acerca">
          <div className="section-header">
            <span className="section-eyebrow">
              <span>00</span> · Perfil Profesional &amp; Propuesta de Valor
            </span>
            <h2 className="section-title">
              Experiencia, Habilidades &amp;{" "}
              <span className="gradient-text">Objetivos</span>
            </h2>
            <p className="section-subtitle">
              {PERFIL_DATA.experienciaHabilidadesIntro}
            </p>
          </div>

          <div className={styles.bentoGrid}>
            {PERFIL_DATA.pilares.map((pilar) => (
              <SpotlightCard
                key={pilar.id}
                className={`${styles.pilarCard} scroll-reveal`}
              >
                <div className={styles.pilarIconBox}>
                  <PillarIcon type={pilar.icono} />
                </div>
                <h3 className={styles.pilarTitle}>{pilar.titulo}</h3>
                <p className={styles.pilarDesc}>{pilar.descripcion}</p>
                <span className={styles.pilarHighlight}>{pilar.destacado}</span>
              </SpotlightCard>
            ))}

            <SpotlightCard className={`${styles.objetivosCard} scroll-reveal`}>
              <div className={styles.objetivosContent}>
                <span className="section-eyebrow">Visión &amp; Futuro</span>
                <h3 className={styles.objetivosTitle}>Objetivos Profesionales</h3>
                <p className={styles.objetivosText}>
                  {PERFIL_DATA.objetivosProfesionales}
                </p>
              </div>
              <div className={styles.objetivosActions}>
                <a
                  href={PERFIL_DATA.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  <span>Descargar CV Actualizado</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <Link to="/experiencia" className="btn-secondary">
                  Ver Experiencia Detallada
                </Link>
              </div>
            </SpotlightCard>
          </div>
        </section>

        {/* INTEGRATED PORTFOLIO SECTIONS */}
        <Experiencia embedded />
        <Proyectos embedded />
        <Herramientas embedded />
        <Educacion embedded />
        <Cursos embedded />
        <Idiomas embedded />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
