import React, { useState, useEffect } from "react";
import Header from "../../UI/Header/Header";
import Footer from "../../UI/Footer/Footer";
import SpotlightCard from "../../UI/SpotlightCard/SpotlightCard";
import ModalDialog from "../../UI/ModalDialog/ModalDialog";
import { CURSOS_DATA } from "../../../data/portfolioData";
import styles from "./Cursos.module.css";

function normalizeCertPath(src = "") {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return src.startsWith("/") ? src : `/${src}`;
}

const Cursos = ({ embedded = false }) => {
  const [cursos, setCursos] = useState(CURSOS_DATA);
  const [statusFilter, setStatusFilter] = useState("all");
  const [instFilter, setInstFilter] = useState("all");
  const [previewCourse, setPreviewCourse] = useState(null);

  useEffect(() => {
    fetch("/Data/Cursos.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((c) => ({
            ...c,
            SrcIstitucion: normalizeCertPath(c.SrcIstitucion),
            SrcCertificado: normalizeCertPath(c.SrcCertificado),
          }));
          setCursos(normalized);
        }
      })
      .catch(() => {});
  }, []);

  const institutions = [
    "all",
    ...Array.from(new Set(cursos.map((c) => c.Institucion))),
  ];

  const filteredCourses = cursos.filter((c) => {
    const matchStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "done"
        ? c.Status === "Done"
        : c.Status === "In Progress";
    const matchInst =
      instFilter === "all" ? true : c.Institucion === instFilter;
    return matchStatus && matchInst;
  });

  const doneCount = cursos.filter((c) => c.Status === "Done").length;
  const inProgressCount = cursos.filter((c) => c.Status === "In Progress").length;

  const isExternalUrl = (url = "") =>
    url.startsWith("http://") || url.startsWith("https://");

  const content = (
    <section className="section-block" id="cursos">
      <div className="section-header">
        <span className="section-eyebrow">
          <span>05</span> · Capacitación Continua &amp; Credenciales
        </span>
        <h2 className="section-title">
          Cursos &amp; <span className="gradient-text">Certificaciones</span>
        </h2>
        <p className="section-subtitle">
          Certificaciones oficiales en RPA (SS&amp;C Blue Prism, Arkademy), Inteligencia Artificial &amp; Copilot (Microsoft), Ciencia de Datos, Power BI, Python y Metodologías Ágiles.
        </p>
      </div>

      <div className={styles.filtersContainer}>
        <div className="filter-bar" style={{ marginBottom: 0 }}>
          <button
            type="button"
            className={`filter-pill ${statusFilter === "all" ? "active" : ""}`}
            onClick={() => setStatusFilter("all")}
          >
            Todos ({cursos.length})
          </button>
          <button
            type="button"
            className={`filter-pill ${statusFilter === "done" ? "active" : ""}`}
            onClick={() => setStatusFilter("done")}
          >
            Completados ({doneCount})
          </button>
          <button
            type="button"
            className={`filter-pill ${
              statusFilter === "progress" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("progress")}
          >
            En Curso ({inProgressCount})
          </button>
        </div>

        <div className="filter-bar" style={{ marginBottom: 0 }}>
          {institutions.map((inst) => (
            <button
              key={inst}
              type="button"
              className={`filter-pill ${instFilter === inst ? "active" : ""}`}
              onClick={() => setInstFilter(inst)}
            >
              {inst === "all" ? "Todas las instituciones" : inst}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.coursesGrid}>
        {filteredCourses.map((curso) => {
          const isDone = curso.Status === "Done";
          const external = isExternalUrl(curso.SrcCertificado);

          return (
            <SpotlightCard
              key={curso.id}
              className={`${styles.courseCard} scroll-reveal`}
            >
              <div className={styles.cardTop}>
                <div className={styles.instBadge}>
                  <div className={styles.instLogoWrapper}>
                    <img
                      src={curso.SrcIstitucion}
                      alt={`Logo de ${curso.Institucion}`}
                      className={styles.instLogo}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <span className={styles.instName}>{curso.Institucion}</span>
                    <span className={styles.expedicion}>
                      {curso.Expedicion !== "-"
                        ? `Expedición: ${curso.Expedicion}`
                        : "En progreso"}
                    </span>
                  </div>
                </div>

                <span
                  className={`status-badge ${
                    isDone ? "done" : "in-progress"
                  }`}
                >
                  <span className="status-dot" />
                  {isDone ? "Certificado" : "En Curso"}
                </span>
              </div>

              <h3 className={styles.courseTitle}>{curso.Titulo}</h3>

              <div className={styles.cardActions}>
                {!isDone ? (
                  <span className={styles.inProgressNotice}>
                    Cursando actualmente · Certificado próximamente
                  </span>
                ) : external ? (
                  <a
                    href={curso.SrcCertificado}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.certButtonExternal}
                  >
                    <span>Verificar insignia en Credly</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <div className={styles.actionGroup}>
                    <button
                      type="button"
                      className={styles.certButtonModal}
                      onClick={() => setPreviewCourse(curso)}
                    >
                      <span>Previsualizar Certificado</span>
                    </button>
                    <a
                      href={curso.SrcCertificado}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.openTabBtn}
                      title="Abrir imagen del certificado en nueva pestaña"
                      aria-label={`Abrir certificado de ${curso.Titulo} en nueva pestaña`}
                    >
                      ↗
                    </a>
                  </div>
                )}
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      <ModalDialog
        isOpen={Boolean(previewCourse)}
        onClose={() => setPreviewCourse(null)}
        title={previewCourse?.Titulo || "Certificado"}
        subtitle={
          previewCourse
            ? `${previewCourse.Institucion} · Expedición: ${previewCourse.Expedicion}`
            : ""
        }
      >
        {previewCourse && (
          <div className={styles.previewModalBody}>
            <div className={styles.certificateFrame}>
              <img
                src={previewCourse.SrcCertificado}
                alt={`Certificado de ${previewCourse.Titulo}`}
                className={styles.certificateImg}
                fetchpriority="low"
              />
            </div>
            <div className={styles.previewModalActions}>
              <a
                href={previewCourse.SrcCertificado}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Abrir certificado en tamaño completo ↗
              </a>
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

export default Cursos;
