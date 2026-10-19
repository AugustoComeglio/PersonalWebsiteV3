import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "../Components/Screens/Home/Home";
import Cursos from "../Components/Screens/Cursos/Cursos";
import Educacion from "../Components/Screens/Educacion/Educacion";
import Experiencia from "../Components/Screens/Experiencia/Experiencia";
import Herramientas from "../Components/Screens/Herramientas/Herramientas";
import Idiomas from "../Components/Screens/Idiomas/Idiomas";
import Proyectos from "../Components/Screens/Proyectos/Proyectos";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="" element={<Navigate to="/home" replace />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/educacion" element={<Educacion />} />
        <Route path="/experiencia" element={<Experiencia />} />
        <Route path="/herramientas" element={<Herramientas />} />
        <Route path="/idiomas" element={<Idiomas />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
};

export default AppRouter;
