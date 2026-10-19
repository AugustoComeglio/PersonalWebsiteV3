import React, { useState, useEffect } from "react";
import Header from "../../UI/Header/Header";
import Footer from "../../UI/Footer/Footer";
import SpotlightCard from "../../UI/SpotlightCard/SpotlightCard";
import { HERRAMIENTAS_DATA } from "../../../data/portfolioData";
import styles from "./Herramientas.module.css";

function normalizeSrc(src = "") {
  if (!src) return "";
  return src.replace(/^\.\.\//, "/").replace(/^(?!\/|https?:)/, "/");
}

const Herramientas = ({ embedded = false }) => {
  const [categorias, setCategorias] = useState(HERRAMIENTAS_DATA);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedIds, setCollapsedIds] = useState(() => new Set());
  const [hiddenIds, setHiddenIds] = useState(() => new Set());

  useEffect(() => {
    fetch("/Data/Herramientas.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((cat) => {
            const match = HERRAMIENTAS_DATA.find((d) => d.Id === cat.Id);
            return {
              ...match,
              ...cat,
              Herramientas: (cat.Herramientas || []).map((h) => ({
                ...h,
                Src: normalizeSrc(h.Src),
              })),
            };
          });
          setCategorias(normalized);
        }
      })
      .catch(() => {});
  }, []);

  const allTools = categorias.flatMap((c) =>
    (c.Herramientas || []).map((h) => ({ ...h, categoria: c.Tipo }))
  );

  const toggleCategoryCollapse = (id) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setHiddenIds((hPrev) => {
          const hNext = new Set(hPrev);
          hNext.delete(id);
          return hNext;
        });
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handlePanelTransitionEnd = (e, id, isCollapsed) => {
    if (e.propertyName === "block-size" && isCollapsed) {
      setHiddenIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    }
  };

  const filteredCategories = categorias
    .filter((cat) =>
      selectedCategory === "all" ? true : String(cat.Id) === String(selectedCategory)
    )
    .map((cat) => ({
      ...cat,
      Herramientas: (cat.Herramientas || []).filter((h) =>
        h.Nombre.toLowerCase().includes(searchQuery.trim().toLowerCase())
      ),
    }))
    .filter((cat) => cat.Herramientas.length > 0);

  const content = (
    <section className="section-block" id="herramientas">
      <div className="section-header">
        <span className="section-eyebrow">
          <span>03</span> · Ecosistema Tecnológico
        </span>
        <h2 className="section-title">
          Herramientas &amp; <span className="gradient-text">Tecnologías</span>
        </h2>
        <p className="section-subtitle">
          Stack integral que combina automatización corporativa (RPA), desarrollo Back-End y Front-End, bases de datos y gestión ágil de proyectos.
        </p>
      </div>

      {/* Infinite Tech Marquee */}
      <div className={styles.marqueeWrapper} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...allTools, ...allTools].map((tool, index) => (
            <div key={`${tool.Nombre}-${index}`} className={styles.marqueePill}>
              <img
                src={tool.Src}
                alt=""
                className={styles.marqueeIcon}
                loading="lazy"
              />
              <span>{tool.Nombre}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.controlsRow}>
        <div className="filter-bar" style={{ marginBottom: 0 }}>
          <button
            type="button"
            className={`filter-pill ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            Todas ({allTools.length})
          </button>
          {categorias.map((cat) => (
            <button
              key={cat.Id}
              type="button"
              className={`filter-pill ${
                String(selectedCategory) === String(cat.Id) ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat.Id)}
            >
              {cat.Tipo} ({cat.Herramientas?.length || 0})
            </button>
          ))}
        </div>

        <div className={styles.searchBox}>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrar herramienta (ej. Blue Prism, React, Python)..."
            className={styles.searchInput}
            aria-label="Filtrar herramientas por nombre"
          />
        </div>
      </div>

      <div className={styles.categoriesStack}>
        {filteredCategories.map((cat) => {
          const isCollapsed = collapsedIds.has(cat.Id);
          const isHidden = hiddenIds.has(cat.Id);

          return (
            <SpotlightCard
              key={cat.Id}
              className={`${styles.categoryCard} scroll-reveal`}
            >
              <button
                type="button"
                className={styles.categoryHeaderBtn}
                onClick={() => toggleCategoryCollapse(cat.Id)}
                aria-expanded={!isCollapsed}
              >
                <div className={styles.categoryTitleGroup}>
                  <div className={styles.titleAndCount}>
                    <h3 className={styles.categoryTitle}>{cat.Tipo}</h3>
                    <span className={styles.countBadge}>
                      {cat.Herramientas.length}{" "}
                      {cat.Herramientas.length === 1 ? "herramienta" : "herramientas"}
                    </span>
                  </div>
                  {cat.DescripcionCategoria && (
                    <p className={styles.categorySubtitle}>
                      {cat.DescripcionCategoria}
                    </p>
                  )}
                </div>

                <span
                  className={`${styles.chevron} ${
                    !isCollapsed ? styles.chevronOpen : ""
                  }`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>

              <div
                className={`expandable-panel ${
                  !isCollapsed ? "is-expanded" : ""
                }`}
                hidden={isHidden && isCollapsed}
                onTransitionEnd={(e) =>
                  handlePanelTransitionEnd(e, cat.Id, isCollapsed)
                }
              >
                <div className={styles.toolsGrid}>
                  {cat.Herramientas.map((herr, i) => (
                    <div key={`${herr.Nombre}-${i}`} className={styles.toolTile}>
                      <div className={styles.toolIconBox}>
                        <img
                          src={herr.Src}
                          alt={`Logo de ${herr.Nombre}`}
                          className={styles.toolIcon}
                          loading="lazy"
                        />
                      </div>
                      <span className={styles.toolName}>{herr.Nombre}</span>
                    </div>
                  ))}
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

export default Herramientas;
