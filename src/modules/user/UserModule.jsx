import { useState } from "react";
// Mediante npm se instala Sweetalert
import Swal from "sweetalert2";

// Importacion de componentes
import UserTable from "./UserTable";
import UserForm from "./UserForm";

// Modulo principal
function UserModule() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Variables de listado de usuarios
  const [usuarios, setUsuarios] = useState([]);

  // Variable usuario seleccionado para edición
  const [selectedUser, setSelectedUser] = useState(null);

  // Agregar o editar usuario
  const agregarUsuario = (usuarioNuevo) => {
    setUsuarios((prev) => {
      // Si existe se edita
      const existe = prev.some((u) => u.id_usuario === usuarioNuevo.id_usuario);

      if (existe) {
        return prev.map((u) =>
          u.id_usuario === usuarioNuevo.id_usuario ? usuarioNuevo : u
        );
      }

      // Si no existe, agregarlo
      return [...prev, usuarioNuevo];
    });

    // Popup mensaje de guardado de usuario
    Swal.fire({
      title: "¡ Usuario guardado !",
      text: "Se ha guardado correctamente.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Inactivar usuario
  const inactivarUsuario = (idUsuario) => {
    const usuario = usuarios.find((u) => u.id_usuario === idUsuario);

    if (!usuario) return;

    if (usuario.estado_usuario === "Inactivo") {
      Swal.fire({
        title: "Usuario ya inactivo",
        text: `El usuario ${usuario.nombres} ${usuario.apellidos} ya está inactivo.`,
        icon: "info",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const usuariosActualizados = usuarios.map((u) =>
      u.id_usuario === idUsuario ? { ...u, estado_usuario: "Inactivo" } : u
    );
    setUsuarios(usuariosActualizados);

    Swal.fire({
      title: "Usuario inactivo",
      text: `El usuario ha sido desactivado.`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <section className="content-area">
      <div className="title-content">
        <h1>Usuarios</h1>
      </div>

      <div className="user-container">
        <div className="content-container">
          <div className="search">
            <label htmlFor="busqueda">
              Buscar:
              <input type="text" id="busqueda" name="busqueda" />
            </label>

            <button
              className="btn-adduser"
              onClick={() => {
                setSelectedUser(null); // limpiar formulario
                setMostrarFormulario(true);
              }}
            >
              Agregar usuario
            </button>
          </div>

          <UserTable
            data={usuarios}
            onEditUser={(user) => {
              setSelectedUser(user);
              setMostrarFormulario(true);
            }}
            onDeleteUser={inactivarUsuario}
          />
        </div>
      </div>

      {mostrarFormulario && (
        <UserForm
          onSave={agregarUsuario}
          selectedUser={selectedUser}
          onClose={() => setMostrarFormulario(false)}
        />
      )}
    </section>
  );
}

export default UserModule;