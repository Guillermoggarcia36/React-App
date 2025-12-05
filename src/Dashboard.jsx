import { useState, useEffect, useRef } from "react";
// Importamos solo lo necesario para ESTE componente
import { useNavigate, Outlet } from "react-router-dom";

// Importacion de iconos
import meditechLogo from "../../assets/logos/logoMeditech.svg";
import listaIcon from "../../assets/icons/lista.png";
import logoutIcon from "../../assets/icons/cerrarSesion.png";
import homeIcon from "../../assets/icons/casa.png";
import userIcon from "../../assets/icons/usuario3.png";
import citasIcon from "../../assets/icons/cita-medica.png";

function LayoutMain() {
  // Hooks
  const navigate = useNavigate();
  const [ahora, setAhora] = useState(new Date());
  const userOptionsRef = useRef(null);

  // Hook para actualizar de reloj
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAhora(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Formato de tiempo
  const opcionesHora = { hour: "2-digit", minute: "2-digit", hour12: true };
  const time = ahora.toLocaleTimeString("es-ES", opcionesHora);
  const opcionesFecha = { day: "numeric", month: "long", year: "numeric" };
  const date = ahora.toLocaleDateString("es-ES", opcionesFecha);

  // Manejores de eventos
  const handleUsersClick = () => {
    // Usa la RUTA configurada en tu Router (e.g., App.jsx)
    navigate("/usuarios");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleCitasClick = () => {
    navigate("/citas");
  };

  const handleLogoutClick = () => {
    // Redirección forzada fuera de React
    window.location.replace("../../index.html");
  };

  const toggleUserOptions = () => {
    if (userOptionsRef.current) {
      const currentDisplay = userOptionsRef.current.style.display;
      userOptionsRef.current.style.display =
        currentDisplay === "block" ? "none" : "block";
    }
  };

  // --- RENDERIZADO (JSX) ---
  return (
    <main className="main-container">
      <div className="logo-dashboard">
        <img src={meditechLogo} alt="Logo Meditech"></img>
      </div>
      <div className="date-time">
        <p>{time}</p>
        <p>{date}</p>
      </div>
      <div className="user">
        <button id="btn-user" onClick={toggleUserOptions}>
          <p id="name-user">Usuario</p>
          <img src={listaIcon} alt="Opciones"></img>
        </button>
        <div id="user-options" ref={userOptionsRef} style={{ display: "none" }}>
          <button id="logOut" onClick={handleLogoutClick}>
            <p>Cerrar sesion</p>
            <img src={logoutIcon} alt="Cerrar Sesión"></img>
          </button>
        </div>
      </div>
      <div id="sidebar-container">
        <button id="inicio-btn" onClick={handleHomeClick}>
          <p>Inicio</p>
          <img src={homeIcon} alt="Inicio"></img>
        </button>
        <button id="usuarios-btn" onClick={handleUsersClick}>
          <p>Usuarios</p>
          <img src={userIcon} alt="Usuarios"></img>
        </button>
        <button id="citas-btn" onClick={handleCitasClick}>
          <p>Citas medicas</p>
          <img src={citasIcon} alt="Citas Médicas"></img>
        </button>
      </div>
      <Outlet />
    </main>
  );
}

export default LayoutMain;