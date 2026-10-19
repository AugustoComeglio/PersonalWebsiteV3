import React, { useState, useEffect } from "react";
import Header from "../../UI/Header/Header";
import Footer from "../../UI/Footer/Footer";
import SpotlightCard from "../../UI/SpotlightCard/SpotlightCard";
import { EXPERIENCIA_DATA } from "../../../data/portfolioData";
import styles from "./Experiencia.module.css";

const FILTERS = [
  { id: "all", label: "Toda la trayectoria" },
  { id: "rpa", label: "RPA & Automatización" },
  { id: "it", label: "Asistencia Técnica & IT" },
  { id: "active", label: "Puestos Actuales" },
];

function splitTasks(tareasText = "") {
  return tareasText
    .split(/,\s+(?=[a-záéíóúñA-ZÁÉÍÓÚÑ])/g)
    .map((t) => {
      const trimmed = t.trim().replace(/\.$/, "");
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    })
    .filter(Boolean);
}

const Experiencia = ({ embedded = false }) => {
  const [experiencias, setExperiencias] = useState(EXPERIENCIA_DATA);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/Data/Experiencia.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const enriched = data.map((item) => {
            const match = EXPERIENCIA_DATA.find((d) => d.id === item.id);
            return {
              ...match,
              ...item,
              actual: item.FechaFin?.toLowerCase().includes("actualidad"),
            };
          });
          setExperiencias(enriched);
        }
      })
      .catch(() => {});
  }, []);

  const filteredList = experiencias.filter((item) => {
    if (filter === "rpa") return item.Puesto.toLowerCase().includes("rpa");
    if (filter === "it") return !item.Puesto.toLowerCase().includes("rpa");
    if (filter === "active") return item.FechaFin?.toLowerCase().includes("actualidad");
    return true;
  });

  const content = (
    <section className="section-block" id="experiencia">
      <div className="section-header">
        <span className="section-eyebrow">
          <span>01</span> · Trayectoria Profesional
        </span>
        <h2 className="section-title">
          Experiencia <span className="gradient-text">Laboral</span>
        </h2>
        <p className="section-subtitle">
          Automatización de procesos corporativos a escala internacional para el sector financiero (España y Chile) y soporte de infraestructura tecnológica.
        </p>
      </div>

      <div className="filter-bar" role="tablist" aria-label="Filtrar experiencia laboral">
        {FILTERS.map((f) => (
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

      <div className={styles.timeline}>
        {filteredList.map((item) => {
          const isCurrent = item.FechaFin?.toLowerCase().includes("actualidad");
          const taskItems =
            Array.isArray(item.TareasLista) && item.TareasLista.length > 0
              ? item.TareasLista
              : splitTasks(item.Tareas);

          return (
            <div key={item.id} className={`${styles.timelineItem} scroll-reveal`}>
              <div className={styles.timelineRail} aria-hidden="true">
                <span
                  className={`${styles.timelineDot} ${
                    isCurrent ? styles.timelineDotActive : ""
                  }`}
                />
                <span className={styles.timelineLine} />
              </div>

              <SpotlightCard className={styles.expCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.companyLogoBox}>
                    <img
                      src={item.Src}
                      alt={`Logo de ${item.Empresa}`}
                      className={styles.companyLogo}
                      loading="lazy"
                    />
                  </div>

                  <div className={styles.headerInfo}>
                    <div className={styles.titleRow}>
                      <h3 className={styles.roleTitle}>{item.Puesto}</h3>
                      <span
                        className={`status-badge ${
                          isCurrent ? "done" : "in-progress"
                        }`}
                      >
                        <span className="status-dot" />
                        {item.FechaInicio} — {item.FechaFin}
                      </span>
                    </div>

                    <div className={styles.metaRow}>
                      <a
                        href={item.Web}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.companyLink}
                      >
                        {item.Empresa} ↗
                      </a>
                      <span className={styles.metaBadge}>{item.Modalidad}</span>
                      {item.Proyecto && item.Proyecto !== "-" && (
                        <span className={styles.projectBadge}>
                          Cliente: <strong>{item.Proyecto}</strong>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  {taskItems.length > 0 ? (
                    <ul className={styles.taskGrid} aria-label="Responsabilidades principales">
                      {taskItems.map((task, idx) => (
                        <li key={idx} className={styles.taskChip}>
                          <span className={styles.checkIcon} aria-hidden="true">
                            ✦
                          </span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.rawDescription}>{item.Tareas}</p>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className={styles.tagsRow}>
                      {item.tags.map((tag) => (
                        <span key={tag} className={styles.techTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </SpotlightCard>
            </div>
          );
        })}
      </div>
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

export default Experiencia;
