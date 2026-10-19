import React, { useState, useEffect } from "react";
import Header from "../../UI/Header/Header";
import Footer from "../../UI/Footer/Footer";
import SpotlightCard from "../../UI/SpotlightCard/SpotlightCard";
import { EDUCACION_DATA } from "../../../data/portfolioData";
import styles from "./Educacion.module.css";

const Educacion = ({ embedded = false }) => {
  const [educacion, setEducacion] = useState(EDUCACION_DATA);

  useEffect(() => {
    fetch("/Data/Educacion.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const merged = data.map((item) => {
            const match = EDUCACION_DATA.find((d) => d.id === item.id);
            return { ...match, ...item };
          });
          setEducacion(merged);
        }
      })
      .catch(() => {});
  }, []);

  const content = (
    <section className="section-block" id="educacion">
      <div className="section-header">
        <span className="section-eyebrow">
          <span>04</span> · Formación Universitaria &amp; Académica
        </span>
        <h2 className="section-title">
          Educación <span className="gradient-text">Académica</span>
        </h2>
        <p className="section-subtitle">
          Graduado en Ingeniería en Sistemas de Información en la Universidad Tecnológica Nacional (FRM), con sólida base en gestión empresarial y arquitectura de sistemas.
        </p>
      </div>

      <div className={styles.eduGrid}>
        {educacion.map((item) => {
          const isDone = item.Status === "Done";
          const progressValue = item.progreso ?? (isDone ? 100 : 95);

          return (
            <SpotlightCard
              key={item.id}
              className={`${styles.eduCard} scroll-reveal`}
            >
              <div className={styles.cardTop}>
                <div className={styles.logoFrame}>
                  <img
                    src={item.Src}
                    alt={`Logo de ${item.Institucion}`}
                    className={styles.instLogo}
                    loading="lazy"
                  />
                </div>

                <span
                  className={`status-badge ${
                    isDone ? "done" : "in-progress"
                  }`}
                >
                  <span className="status-dot" />
                  {isDone ? "Finalizado" : "En Curso · Etapa Final"}
                </span>
              </div>

              <div className={styles.cardMain}>
                <span className={styles.period}>
                  {item.FechaInicio} — {item.FechaFin}
                </span>
                <h3 className={styles.degreeTitle}>{item.Carrera}</h3>
                <p className={styles.institutionName}>{item.Institucion}</p>

                {item.descripcion && (
                  <p className={styles.degreeDesc}>{item.descripcion}</p>
                )}
              </div>

              <div className={styles.progressSection}>
                <div className={styles.progressHeader}>
                  <span className={styles.highlightNote}>
                    {item.notaDestacada ||
                      (isDone ? "Título Completado" : "En progreso avanzado")}
                  </span>
                  <span className={styles.progressPct}>{progressValue}%</span>
                </div>
                <div
                  className={styles.progressBarTrack}
                  role="progressbar"
                  aria-valuenow={progressValue}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Avance académico en ${item.Carrera}`}
                >
                  <div
                    className={`${styles.progressBarFill} ${
                      isDone ? styles.fillDone : styles.fillActive
                    }`}
                    style={{ width: `${progressValue}%` }}
                  />
                </div>
              </div>
            </SpotlightCard>
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

export default Educacion;
