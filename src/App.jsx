import React from "react";
import AppRouter from "./Routes/AppRouter";

function App() {
  return (
    <>
      <div className="ambient-backdrop" aria-hidden="true" />
      <AppRouter />
    </>
  );
}

export default App;
