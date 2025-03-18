/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IconAlertWarning } from "../components/icons/Icons";
import { dataServicio } from "../context/sector";
import Swal from "sweetalert2";

const FormData = () => {
  const {
    isAuthenticated,
    logout,
    addCarro,
    usuario,
    carros,
    deleteCarro,
    updateCarro,
    getCarrosByServicio,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const today = new Date().toLocaleDateString();
  const [editingCarro, setEditingCarro] = useState(null);

  // variables para el formulario de registro de carro de paro
  const [cartData, setCartData] = useState({
    numCarro: "",
    precintoMedicacion: "",
    precintoDescartable: "",
    fechaInicio: "",
    fechaUltimoControl: today || "",
    servicioName: "",
  });

  const [editFormData, setEditFormData] = useState({
    numCarro: "",
    precintoMedicacion: "",
    precintoDescartable: "",
    fechaInicio: "",
    fechaUltimoControl: "",
  });

  // Función para cerrar sesión
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Envio de datos del carro al back
  const cargarCarro = async (e) => {
    e.preventDefault();

    try {
      await addCarro(cartData);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "El carro se ha registrado correctamente",
        text: "Ve a los carros registrados para agregar información del contenido",
        showConfirmButton: false,
        timer: 3000,
      });

      // limpiar los datos del formulario
      setCartData({
        numCarro: "",
        precintoMedicacion: "",
        precintoDescartable: "",
        fechaInicio: "",
        fechaUltimoControl: today || "",
        servicioName: usuario.servicioName,
      });

      // Actualiza la lista de carros
      await getCarrosByServicio(usuario.servicioName);
    } catch (error) {
      // Muestra un mensaje de error
      console.error("Error al registrar el carro:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudieron registrar los datos del carro.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  // Capturo los datos del formulario de registro de carro de paro
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setCartData({
      ...cartData,
      [name]: value,
    });
  };

  // Función para eliminar un carro
  const handleDeleteCarro = async (carroId) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
      });

      if (result.isConfirmed) {
        await deleteCarro(carroId);
        await getCarrosByServicio(usuario.servicioName); // Actualizar la lista de carros
        Swal.fire("Eliminado", "El carro ha sido eliminado.", "success");
      }
    } catch (error) {
      console.error("Error al eliminar el carro:", error);
      Swal.fire("Error", "No se pudo eliminar el carro.", "error");
    }
  };

  // Función para abrir el modal de edición
  const handleEditCarro = (carro) => {
    setEditingCarro(carro);
    setEditFormData({
      numCarro: carro.numCarro,
      precintoMedicacion: carro.precintoMedicacion,
      precintoDescartable: carro.precintoDescartable,
      fechaInicio: carro.fechaInicio,
      fechaUltimoControl: today,
    });
  };

  // Función para guardar los cambios al editar
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await updateCarro(editFormData, editingCarro.id);
      await getCarrosByServicio(usuario.servicioName); // Actualizar la lista de carros
      setEditingCarro(null); // Cerrar el modal de edición
      Swal.fire("Actualizado", "El carro ha sido actualizado.", "success");
    } catch (error) {
      console.error("Error al actualizar el carro:", error);
      Swal.fire("Error", "No se pudo actualizar el carro.", "error");
    }
  };

  const handleDetailCarro = async (idCarro) => {
    navigate(`/elementos_del_carro/${idCarro}`);
  };

  // ordeno los servicios alfabeticamente
  const sortedServicios = [...dataServicio].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

  // Filtra los carros por el servicio del usuario actual
  const carrosFiltrados = carros.filter(
    (carro) => carro.servicioName === usuario.servicioName
  );

  useEffect(() => {
    if (usuario && usuario.servicioName) {
      getCarrosByServicio(usuario.servicioName);
    }
  }, [usuario, usuario.servicioName]);

  if (!isAuthenticated) return null;

  return (
    <>
      <section className="bg-white">
        <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto p-8 border-2 border-gray-700-600 shadow-lg rounded-lg">
            <div className="flex flex-col gap-4 items-center justify-center">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="/"
              >
                <span className="sr-only">Home</span>
                <img
                  src="/logo.svg"
                  alt="logo"
                  className="h-auto rounded-full bg-slate-200"
                />
              </a>
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl capitalize">
                Bienvenido {usuario.firstName} {usuario.lastName}{" "}
              </h1>
              <p className="mt-4 leading-relaxed text-gray-500">
                En este formulario podrás registrar la información sobre el
                carro de paro.
              </p>
            </div>
            <form
              action="#"
              className="mt-8 grid grid-cols-2 gap-6 border-2 border-gray-400 shadow-lg rounded-lg p-4"
              onSubmit={cargarCarro}
            >
              <div className="col-span-2 border-2 border-gray-800 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <label htmlFor="cargarCarro" className="flex gap-4">
                    <IconAlertWarning />
                    <span className="text-sm text-gray-700">
                      Para continuar con el registro de información debes
                      guardar los datos del carro.
                    </span>
                  </label>
                </div>
              </div>

              {/* fecha de inicio  */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="fechaInicio"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fecha de inicio
                  </label>

                  <input
                    type="date"
                    name="fechaInicio"
                    placeholder="Fecha de inicio"
                    value={cartData.fechaInicio}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* servicio */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="servicioName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Servicio
                  </label>
                  <select
                    name="servicioName"
                    value={cartData.servicioName}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    required
                    // onChange={(e) => setServicioName(e.target.value)}
                  >
                    <option value="" disabled>
                      Seleccione un Servicio
                    </option>
                    {sortedServicios.map((servicio) => (
                      <option key={servicio.id} value={servicio.nombre}>
                        {servicio.nombre.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* numero de carro */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="numCarro"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Número de carro
                  </label>

                  <input
                    type="text"
                    name="numCarro"
                    value={cartData.numCarro}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* precinto de medicacion */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="precinto"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Precinto sección medicación
                  </label>

                  <input
                    type="number"
                    name="precintoMedicacion"
                    placeholder="Número de Precinto"
                    value={cartData.precintoMedicacion}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* precinto de descartable */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="precinto"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Precinto sección descartable
                  </label>

                  <input
                    type="number"
                    name="precintoDescartable"
                    placeholder="Número de Precinto"
                    value={cartData.precintoDescartable}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* fecha de ultimo control */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="fecha_ultimo_control"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fecha de último control
                  </label>

                  <input
                    type="text"
                    name="fechaUltimoControl"
                    placeholder={today}
                    // value={cartData.fechaUltimoControl}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    required
                    readOnly
                  />
                </div>
              </div>

              <div className="col-span-2">
                <div className="col-span-6 flex flex-col gap-4 sm:flex sm:flex-row sm:items-center sm:gap-4">
                  <button
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    type="submit"
                  >
                    Guardar
                  </button>
                  <button
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    type="button"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* Carros registrados */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Carros Registrados</h2>
            {carrosFiltrados.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {carrosFiltrados.map((carro) => (
                  <div
                    key={carro.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Carro #{carro.numCarro}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Servicio: {carro.servicioName}
                        </p>
                      </div>
                      <div className="text-md text-gray-700 font-bold">
                        <p className="flex justify-between gap-2 border-b-2 border-gray-500 p-2">
                          <span className="font-medium">Fecha Inicio:</span>{" "}
                          {carro.fechaInicio}
                        </p>
                        <p className="flex justify-between gap-2 border-b-2 border-gray-500 p-2">
                          <span className="font-medium">
                            Precinto Medicación:
                          </span>{" "}
                          {carro.precintoMedicacion}
                        </p>
                        <p className="flex justify-between gap-2 border-b-2 border-gray-500 p-2">
                          <span className="font-medium">
                            Precinto Descartable:
                          </span>{" "}
                          {carro.precintoDescartable}
                        </p>
                        <p className="flex justify-between gap-2 border-b-2 border-gray-500 p-2">
                          <span className="font-medium">Último Control:</span>{" "}
                          {carro.fechaUltimoControl}
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-between gap-2">
                        <button
                          className="w-full text-sm py-2 px-4 text-gray-100 bg-blue-600 hover:bg-blue-800 rounded-lg font-medium"
                          onClick={() => handleDetailCarro(carro.id)}
                        >
                          Ver Detalles
                        </button>
                        <button
                          className="w-full text-sm py-2 text-gray-100 px-4 rounded-lg bg-blue-600 hover:bg-blue-800 font-medium"
                          onClick={() => handleEditCarro(carro)}
                        >
                          Editar
                        </button>
                        <button
                          className="w-full text-sm py-2 px-4 text-gray-100 bg-red-600 hover:bg-red-800 rounded-lg font-medium"
                          onClick={() => handleDeleteCarro(carro.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-700 text-center font-bold">
                No hay carros registrados.
              </p>
            )}
          </div>
        </main>
      </section>

      {/* Modal de edición de carro */}
      {editingCarro && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Editar Carro</h2>
            <form onSubmit={handleSaveEdit}>
              <div className="space-y-4">
                <input
                  type="text"
                  name="numCarro"
                  value={editFormData.numCarro}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      numCarro: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Número de Carro"
                  required
                />
                <input
                  type="number"
                  name="precintoMedicacion"
                  value={editFormData.precintoMedicacion}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      precintoMedicacion: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Precinto Medicación"
                  required
                />
                <input
                  type="number"
                  name="precintoDescartable"
                  value={editFormData.precintoDescartable}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      precintoDescartable: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Precinto Descartable"
                  required
                />
                <input
                  type="date"
                  name="fechaInicio"
                  value={editFormData.fechaInicio}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      fechaInicio: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-gray-800 font-medium"
                  onClick={() => setEditingCarro(null)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FormData;
