import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { Accordion } from "../components/Accordion";
import MedicacionList from "./MedicationList";
import DescartableList from "./DescartableList";
import ModalRegisterMedicacion from "./ModalRegisterMedicacion";
import Swal from "sweetalert2";
import ModalRegisterDescartable from "./ModalRegisterDescartable";

export const ContainerElementsCart = () => {
  const {
    usuario,
    isAuthenticated,
    getMedicationByCarro,
    getDescartableByCarro,
    medications,
    descartables,
  } = useContext(AuthContext);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddDescartableModalOpen, setIsAddDescartableModalOpen] =
    useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [loading, setLoading] = useState(true);
  // const location = useLocation();
  // const location = useLocation();
  const { idCarro } = useParams();
  // const { idCarro } = location.state || { idCarro: null };

  useEffect(() => {
    const cargarDatos = async () => {
      await getMedicationByCarro(idCarro);
      await getDescartableByCarro(idCarro);
      setLoading(false);
    };
    cargarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCarro, getMedicationByCarro]);

  useEffect(() => {
    if (!loading && medications.length === 0 && !alertShown) {
      Swal.fire({
        icon: "warning",
        title: "No hay medicaciones ni descartables registrados",
        text: "Agrega nuevas medicaciones o descartables",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#d33",
      });
      setAlertShown(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, medications, descartables, alertShown]);

  useEffect(() => {
    setAlertShown(false); // Reiniciar alertShown cuando cambia el idCarro
  }, [idCarro]);

  const cargarMedicacion = async () => {
    setIsAddModalOpen(true);
  };

  const cargarDescartables = async () => {
    setIsAddDescartableModalOpen(true);
  };

  const closeAddDescartableModal = () => {
    setIsAddDescartableModalOpen(false);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col mt-10 items-center min-h-screen">
        <h1 className="text-xl md:text-3xl font-medium mb-10 capitalize">
          Servicio: {usuario.servicioName}
        </h1>
        <h3 className="text-xl md:text-3xl font-bold mb-10 text-blue-800">
          Detalle del Carro de paro
        </h3>
        <div className="flex flex-col md:flex md:flex-row gap-4 justify-center items-center">
          <Link
            to={isAuthenticated ? "/formulario_de_datos" : "/check_carros"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Volver al listado de carros
          </Link>
          {isAuthenticated ? (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={cargarMedicacion}
              >
                Cargar Medicaciones
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={cargarDescartables}
              >
                Cargar Descartables
              </button>
            </>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mt-10 w-full max-w-4xl">
          {loading ? (
            <img src="/register.svg" alt="Logo" className="h-96 w-auto" />
          ) : (
            <>
              <Accordion title="Medicaciones">
                {medications.length > 0 ? (
                  <MedicacionList idCarro={idCarro} medications={medications} />
                ) : (
                  <p>No hay medicaciones registradas.</p>
                )}
              </Accordion>
              <Accordion title="Descartables">
                {descartables.length > 0 ? (
                  <DescartableList
                    idCarro={idCarro}
                    descartables={descartables}
                  />
                ) : (
                  <p>No hay descartables registrados.</p>
                )}
              </Accordion>
            </>
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <ModalRegisterMedicacion
          idCarro={idCarro}
          onClose={closeAddModal}
          onAdd={cargarMedicacion}
        />
      )}

      {isAddDescartableModalOpen && (
        <ModalRegisterDescartable
          idCarro={idCarro}
          onClose={closeAddDescartableModal}
          onAdd={cargarDescartables}
        />
      )}
    </>
  );
};
