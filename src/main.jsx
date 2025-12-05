import ReactDOM from "react-dom/client";
// CORRECCIÓN: Agregar Routes y Route aquí
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutMain from "./Dashboard.jsx";
import UserModule from "./modules/user/UserModule.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LayoutMain />}>
        <Route path="usuarios" element={<UserModule />} />
        <Route index element={<h1>Pagina principal - Dashboard</h1>} />
        <Route path="citas" element={<h1>Modulo de citas - en progreso. . .</h1>} />     
      </Route>
    </Routes>
  </BrowserRouter>
);