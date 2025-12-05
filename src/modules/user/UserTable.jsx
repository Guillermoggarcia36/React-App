// Importacion de imagenes
import editImage from "../../../../assets/icons/editar.png";
import deleteImage from "../../../../assets/icons/borrar.png";
import { useState, useMemo, useEffect } from "react";

// Descripción de roles
const roles = {
  1: "Administrativo",
  2: "Medico",
  3: "Paciente",
  4: "Enfermeria",
};

// Funcion principal de componente con sus parametros - props
function UserTable({ data, onEditUser, onDeleteUser }) {
  // Asegura que "data" sea un arreglo
  const allUsers = Array.isArray(data) ? data : [];

  // Viarables de paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Recalcular página actual cuando los datos cambian o cambie rowsPerPage
  useEffect(() => {
    setCurrentPage(1);
  }, [data, rowsPerPage]);

  // Calcular usuarios a mostrar para la pagina actual
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return allUsers.slice(start, start + rowsPerPage);
  }, [allUsers, currentPage, rowsPerPage]);

  // Si no hay usuarios en todo el set mostrar mensaje
  if (!allUsers || allUsers.length === 0) {
    return <p>No hay datos de usuarios disponibles. Crea uno</p>;
  }

  // Funcion para traducir roles de numeros a descripcion
  function translateNameRol(idRol) {
    return roles[idRol] || "Desconocido";
  }

  // Renderizado JSX
  return (
    <>
    <table className="tables">
      <thead>
        <tr className="tables-columns">
          <th>ID</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Rol</th>
          <th>Estado usuario</th>
          <th>...</th>
        </tr>
      </thead>

      {/* Renderizar usuarios a tabla */}
      <tbody className="usuarios-body">
        {paginatedUsers.map((user) => (
          <tr key={user.id_usuario}>
            <td>{user.id_usuario}</td>
            <td>{user.nombres}</td>
            <td>{user.apellidos}</td>
            <td>{translateNameRol(user.id_rolFK)}</td>
            <td>{user.estado_usuario}</td>
            <td>
              <img
                className="edit-btn"
                src={editImage}
                alt="Editar"
                onClick={() => onEditUser(user)}
              />
              <img
                className="delete-btn"
                src={deleteImage}
                alt="Borrar"
                onClick={() => onDeleteUser(user.id_usuario)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {/* Controles de paginación */}
    <div className="pagination" style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "12px" }}>
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      {(() => {
        const totalPages = Math.max(1, Math.ceil(allUsers.length / rowsPerPage));
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        return (
          <div style={{ display: "flex", gap: "6px" }}>
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                aria-current={p === currentPage}
                style={{ fontWeight: p === currentPage ? "700" : "400" }}
              >
                {p}
              </button>
            ))}
          </div>
        );
      })()}

      <button
        onClick={() => {
          const totalPages = Math.max(1, Math.ceil(allUsers.length / rowsPerPage));
          setCurrentPage((p) => Math.min(totalPages, p + 1));
        }}
        disabled={currentPage >= Math.ceil(allUsers.length / rowsPerPage)}
      >
        Siguiente
      </button>

      <div style={{ marginLeft: "12px" }}>
        <label htmlFor="rowsPerPage">Filas:</label>{" "}
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
    </>
  );
}

export default UserTable;