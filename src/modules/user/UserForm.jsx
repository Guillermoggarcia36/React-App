// Importacion de hooks
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function UserForm({ onClose, onSave, selectedUser }) {
  const [idusuario, setIdusuario] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [rol, setRol] = useState("");
  const [tipodocumento, setTipodocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [estado, setEstado] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setIdusuario(selectedUser.id_usuario);
      setNombres(selectedUser.nombres);
      setApellidos(selectedUser.apellidos);
      setRol(selectedUser.id_rolFK);
      setTipodocumento(selectedUser.tipo_documento || "");
      setTelefono(selectedUser.numero_telefono || "");
      setCorreo(selectedUser.correo_electronico || "");
      setEstado(selectedUser.estado_usuario === "Activo");
    }
  }, [selectedUser]);

  const saveUser = () => {
    const usuario = {
      id_usuario: idusuario,
      nombres,
      apellidos,
      id_rolFK: rol,
      tipo_documento: tipodocumento,
      numero_telefono: telefono,
      correo_electronico: correo,
      estado_usuario: estado ? "Activo" : "Inactivo",
    };

    onSave(usuario);
    onClose();

    Swal.fire({
      title: "¡Usuario guardado!",
      text: "Se ha guardado correctamente.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Renderizado JSX
  return (
    <div className="overlay">
      <div className="adduser-container">
        <div className="adduser-title">
          <h2>Usuarios</h2>
        </div>

        <form className="adduser-form">
          <label htmlFor="idusuario">Id de usuario</label>
          <input
            type="text"
            id="idusuario"
            maxLength="12"
            value={idusuario}
            onChange={(e) => setIdusuario(e.target.value)}
          />

          <label htmlFor="nombres">Nombres</label>
          <input
            type="text"
            id="nombres"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
          />

          <label htmlFor="apellidos">Apellidos</label>
          <input
            type="text"
            id="apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />

          <label htmlFor="rol">Rol usuario</label>
          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="" disabled hidden>
              Seleccione un rol
            </option>
            <option value="1">Administrativo</option>
            <option value="2">Medico</option>
            <option value="3">Paciente</option>
            <option value="4">Enfermeria</option>
          </select>

          <label htmlFor="tipodocumento">Tipo documento</label>
          <select
            value={tipodocumento}
            onChange={(e) => setTipodocumento(e.target.value)}
          >
            <option value="" disabled hidden>
              Seleccione tipo de documento
            </option>
            <option value="CC">CC</option>
            <option value="CE">CE</option>
            <option value="PPT">PPT</option>
            <option value="PP">PP</option>
            <option value="PT">PT</option>
            <option value="TI">TI</option>
          </select>

          <label htmlFor="telefono">Telefono</label>
          <input
            type="text"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />

          <label htmlFor="correo">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <label htmlFor="checkbox" className="checkbox-label">
            Usuario activo
            <input
              type="checkbox"
              checked={estado}
              onChange={(e) => setEstado(e.target.checked)}
            />
          </label>

          <div className="buttons">
            <button type="button" className="btn-saveUser" onClick={saveUser}>
              Guardar
            </button>

            <button type="button" className="btn cancel" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;