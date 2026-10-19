import React, { useState, useEffect } from "react";
import Header from "../../UI/Header/Header";
import Footer from "../../UI/Footer/Footer";
import SpotlightCard from "../../UI/SpotlightCard/SpotlightCard";
import { IDIOMAS_DATA } from "../../../data/portfolioData";
import styles from "./Idiomas.module.css";

const LEVEL_METADATA = {
  C2: { porcentaje: 100, descriptor: "Nativo / Dominio Completo" },
  B1: { porcentaje: 65, descriptor: "Intermedio (CEFR B1)" },
  A2: { porcentaje: 40, descriptor: "Elemental / Básico (CEFR A2)" },
};

const Idiomas = ({ embedded = false }) => {
  const [idiomas, setIdiomas] = useState(IDIOMAS_DATA);

  useEffect(() => {
    fetch("/Data/Idiomas.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const enriched = data.map((item) => {
            const match = IDIOMAS_DATA.find((d) => d.id === item.id);
            const meta = LEVEL_METADATA[item.Nivel] || {
              porcentaje: 60,
              descriptor: `Nivel ${item.Nivel}`,
            };
            return {
              ...match,
              ...item,
              Porcentaje: match?.Porcentaje ?? meta.porcentaje,
              Descriptor: match?.Descriptor ?? meta.descriptor,
            };
          });
          setIdiomas(enriched);
        }
      })
      .catch(() => {});
  }, []);

  const content = (
    <section className="section-block" id="idiomas">
      <div className="section-header">
        <span className="section-eyebrow">
          <span>06</span> · Comunicación Internacional
        </span>
        <h2 className="section-title">
          Competencia en <span className="gradient-text">Idiomas</span>
        </h2>
        <p className="section-subtitle">
          Capacidad para colaborar en proyectos multinacionales, relevar requerimientos y trabajar con documentación técnica global.
        </p>
      </div>

      <div className={styles.langGrid}>
        {idiomas.map((item) => {
          const pct = item.Porcentaje ?? 65;

          return (
            <SpotlightCard
              key={item.id}
              className={`${styles.langCard} scroll-reveal`}
            >
              <div className={styles.topRow}>
                <div className={styles.flagAndName}>
                  <div className={styles.flagWrapper}>
                    <img
                      src={item.Src}
                      alt={`Bandera representativa de ${item.Idioma}`}
                      className={styles.flagImg}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className={styles.langName}>{item.Idioma}</h3>
                    <span className={styles.langDescriptor}>
                      {item.Descriptor || `Nivel ${item.Nivel}`}
                    </span>
                  </div>
                </div>

                {/* Conic-gradient ring chart with accessible semantic table below */}
                <div
                  className={styles.ringChart}
                  style={{ "--p": `${pct}%` }}
                  aria-hidden="true"
                >
                  <div className={styles.ringInner}>
                    <span className={styles.cefrCode}>{item.Nivel}</span>
                  </div>
                </div>
              </div>

              {item.Detalle && (
                <p className={styles.langDetail}>{item.Detalle}</p>
              )}

              <div className={styles.barTrack} aria-hidden="true">
                <div
                  className={styles.barFill}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      {/* MANDATORY Accessible Semantic Data Table Fallback for Conic-Gradient Charts */}
      <table className={styles.srOnlyTable}>
        <caption>Resumen de competencia en idiomas según el Marco Común Europeo (CEFR)</caption>
        <thead>
          <tr>
            <th scope="col">Idioma</th>
            <th scope="col">Nivel CEFR</th>
            <th scope="col">Descriptor</th>
            <th scope="col">Porcentaje estimado</th>
          </tr>
        </thead>
        <tbody>
          {idiomas.map((item) => (
            <tr key={item.id}>
              <td>{item.Idioma}</td>
              <td>{item.Nivel}</td>
              <td>{item.Descriptor}</td>
              <td>{item.Porcentaje}%</td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default Idiomas;
