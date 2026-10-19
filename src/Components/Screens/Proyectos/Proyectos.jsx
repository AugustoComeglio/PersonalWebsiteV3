import React, { useState, useEffect } from "react";
import Header from "../../UI/Header/Header";
import Footer from "../../UI/Footer/Footer";
import SpotlightCard from "../../UI/SpotlightCard/SpotlightCard";
import ModalDialog from "../../UI/ModalDialog/ModalDialog";
import { PROYECTOS_DATA } from "../../../data/portfolioData";
import styles from "./Proyectos.module.css";

const TECH_FILTERS = [
  { id: "all", label: "Todos los proyectos" },
  { id: "python", label: "Python · FastAPI · IA" },
  { id: "react", label: "React & Front-End" },
  { id: "enterprise", label: "Angular · Ruby · Java" },
];

function normalizePath(src = "") {
  if (!src) return "";
  return src.replace(/^\.\.\//, "/").replace(/^(?!\/|https?:)/, "/");
}

const Proyectos = ({ embedded = false }) => {
  const [proyectos, setProyectos] = useState(PROYECTOS_DATA);
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch("/Data/Proyectos.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((p, idx) => ({
            ...p,
            id: p.id ? `${p.id}-${idx}` : `${idx}`,
            Src: normalizePath(p.Src),
            Herramientas: (p.Herramientas || []).map((h) => ({
              ...h,
              Src: normalizePath(h.Src),
            })),
          }));
          setProyectos(normalized);
        }
      })
      .catch(() => {});
  }, []);

  const filteredProjects = proyectos.filter((project) => {
    if (filter === "all") return true;
    const tools = (project.Herramientas || []).map((t) =>
      t.Nombre.toLowerCase()
    );
    if (filter === "python") {
      return tools.some((t) =>
        ["python", "fastapi", "pytorch", "streamlit"].includes(t)
      );
    }
    if (filter === "react") {
      return tools.some((t) =>
        ["react", "vite", "javascript", "html5"].includes(t)
      );
    }
    if (filter === "enterprise") {
      return tools.some((t) =>
        ["angular", "ruby", "java", "mysql", "postgresql", "docker"].includes(t)
      );
    }
    return true;
  });

  const content = (
    <section className="section-block" id="proyectos">
      <div className="section-header">
        <span className="section-eyebrow">
          <span>02</span> · Portafolio de Ingeniería &amp; Software
        </span>
        <h2 className="section-title">
          Proyectos <span className="gradient-text">Destacados</span>
        </h2>
        <p className="section-subtitle">
          Aplicaciones Full-Stack, modelos de redes neuronales Transformer (Seq2Seq), arquitecturas RESTful con FastAPI/Ruby on Rails y sistemas de gestión.
        </p>
      </div>

      <div className="filter-bar" role="tablist" aria-label="Filtrar proyectos por tecnología">
        {TECH_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={`filter-pill ${filter === f.id ? "active" : ""}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className={styles.projectsGrid}>
        {filteredProjects.map((project) => (
          <SpotlightCard
            key={project.id}
            className={`${styles.projectCard} scroll-reveal`}
          >
            <div className={styles.imageWrapper}>
              <img
                src={project.Src}
                alt={`Vista previa de ${project.Nombre}`}
                className={styles.projectImg}
                loading="lazy"
              />
              <div className={styles.imageOverlay}>
                <span className={styles.datePill}>
                  {project.FechaInicio} — {project.FechaFin}
                </span>
              </div>
            </div>

            <div className={styles.cardContent}>
              <h3 className={styles.projectTitle}>{project.Nombre}</h3>
              <p className={styles.projectDesc}>{project.Descrpcion}</p>

              <div className={styles.techStack} aria-label="Tecnologías utilizadas">
                {(project.Herramientas || []).map((herr, idx) => (
                  <span key={`${herr.Nombre}-${idx}`} className={styles.techBadge}>
                    <img
                      src={herr.Src}
                      alt=""
                      className={styles.techIcon}
                      loading="lazy"
                    />
                    <span>{herr.Nombre}</span>
                  </span>
                ))}
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.externalLinks}>
                  {(project.Links || []).map((lnk, idx) => (
                    <a
                      key={`${lnk.Nombre}-${idx}`}
                      href={lnk.Link}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.repoLink}
                    >
                      <span>{lnk.Nombre}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>

                <button
                  type="button"
                  className={styles.inspectBtn}
                  onClick={() => setSelectedProject(project)}
                >
                  Ver ficha
                </button>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      <ModalDialog
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.Nombre || ""}
        subtitle={
          selectedProject
            ? `${selectedProject.FechaInicio} — ${selectedProject.FechaFin}`
            : ""
        }
      >
        {selectedProject && (
          <div className={styles.modalContent}>
            <div className={styles.modalImageFrame}>
              <img
                src={selectedProject.Src}
                alt={selectedProject.Nombre}
                className={styles.modalImage}
                fetchpriority="low"
              />
            </div>

            <div className={styles.modalDetails}>
              <h4>Descripción del Proyecto</h4>
              <p className={styles.modalText}>{selectedProject.Descrpcion}</p>

              <h4>Stack Tecnológico</h4>
              <div className={styles.techStack}>
                {(selectedProject.Herramientas || []).map((herr, idx) => (
                  <span key={idx} className={styles.techBadge}>
                    <img
                      src={herr.Src}
                      alt=""
                      className={styles.techIcon}
                      loading="lazy"
                    />
                    <span>{herr.Nombre}</span>
                  </span>
                ))}
              </div>

              <h4>Enlaces y Repositorios</h4>
              <div className={styles.externalLinks}>
                {(selectedProject.Links || []).map((lnk, idx) => (
                  <a
                    key={idx}
                    href={lnk.Link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    <span>{lnk.Nombre}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </ModalDialog>
    </section>
  );

  if (embedded) return content;

  return (
    <div className="page-shell">
      <Header />
      <main className="main-container">{content}</main>
      <Footer />
    </div>
  );
};

export default Proyectos;
