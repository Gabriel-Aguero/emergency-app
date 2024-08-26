/* eslint-disable react/prop-types */
import { useState } from "react";
import { IconDelete } from "../components/icons/Icons";
import { IconEdit } from "../components/icons/Icons";
import DataTable, { createTheme } from "react-data-table-component";

const MedicacionList = ({ medications }) => {
  const [medicacionFiltered, setMedicacionFiltered] = useState("");
  const [search, setSearch] = useState("");

  const handleEdit = (id) => {
    // Implementa la lógica de edición
    console.log(`Editando medicación con ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Implementa la lógica de eliminación
    console.log(`Eliminando medicación con ID: ${id}`);
  };

  const solarizedTheme = createTheme(
    "solarized",
    {
      text: {
        primary: "#268bd2",
        secondary: "#2aa198",
      },
      background: {
        default: "#002b36",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  // Establecemos los estilos para las filas dependiendo del tiempo restante hasta la vencimiento
  const conditionalRowStyles = [
    {
      when: (row) => {
        const now = new Date();
        const expirationDate = new Date(row.medExpiration.seconds * 1000);
        const timeDiff = expirationDate - now;
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        return daysDiff <= 10;
      },
      style: {
        backgroundColor: "#dc2626", // Red Tailwind equivalent
        color: "white",
        "&:hover": {
          backgroundColor: "#b91c1c", // Red Tailwind equivalent
        },
      },
    },
    {
      when: (row) => {
        const now = new Date();
        const expirationDate = new Date(row.medExpiration.seconds * 1000);
        const timeDiff = expirationDate - now;
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        return daysDiff >= 10 && daysDiff <= 30;
      },
      style: {
        background: "#ca8a04",
        color: "white",
        "&:hover": {
          background: "#eab308",
        },
      },
    },
    {
      when: (row) => {
        const now = new Date();
        const expirationDate = new Date(row.medExpiration.seconds * 1000);
        const timeDiff = expirationDate - now;
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        return daysDiff >= 30 && daysDiff <= 60;
      },
      style: {
        background: "#16a34a",
        color: "white",
        "&:hover": {
          background: "#22c55e",
        },
      },
    },
  ];

  const columns = [
    {
      name: "Medicacion",
      selector: (row) => row.medication,
      sortable: true,
    },
    {
      name: "Fecha de Vencimiento",
      selector: (row) =>
        row.medExpiration
          ? new Date(row.medExpiration.seconds * 1000).toLocaleDateString()
          : "",
      format: (row) =>
        new Date(row.medExpiration.seconds * 1000).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Cantidad",
      selector: (row) => row.medQuantity,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => handleEdit(row.id)}
            className="bg-blue-500 text-white rounded-md p-1 hover:bg-blue-700 transition duration-200"
          >
            <IconEdit />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="bg-red-500 text-white rounded-md p-1 hover:bg-red-700 transition duration-200"
          >
            <IconDelete />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filteredData = medications.filter((medicacion) => {
      return medicacion.medication.toLowerCase().includes(search.toLowerCase());
    });
    setMedicacionFiltered(filteredData);
  };

  return (
    <div className="mt-2 p-5">
      <input
        type="text"
        onChange={handleSearch}
        className="bg-slate-300 mb-2 p-2 text-black focus:outline-none focus:bg-slate-700 focus:text-white"
      />
      <DataTable
        title="Medicacion"
        className="text-2xl text-center bg-black"
        columns={columns}
        data={search ? medicacionFiltered : medications}
        fixedHeader={true}
        fixedFooter={true}
        pagination={true}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15]}
        conditionalRowStyles={conditionalRowStyles}
        theme="solarized"
      />
      {/* <table className="min-w-full shadow-xl rounded-lg mt-1">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
              Descripción
            </th>
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
              Fecha de Vencimiento
            </th>
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
              Cantidad
            </th>
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medicacion) => (
            <tr
              key={medicacion.id}
              className={`${getRowColor(medicacion.medExpiration)} border-b border-gray-200 hover:bg-gray-600 text-center`}
            >
              <td className="py-3 px-4 capitalize">{medicacion.medication}</td>
              <td className="py-3 px-4">
                {new Date(
                  medicacion.medExpiration.seconds * 1000
                ).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">{medicacion.medQuantity}</td>
              <td className="flex flex-col gap-2 py-3 px-4 justify-center items-center">
                <button
                  onClick={() => handleEdit(medicacion.id)}
                  className="bg-blue-500 text-white rounded-md p-1 hover:bg-blue-700 transition duration-200"
                >
                  <IconEdit />
                </button>
                <button
                  onClick={() => handleDelete(medicacion.id)}
                  className="bg-red-500 text-white rounded-md p-1 hover:bg-red-700 transition duration-200"
                >
                  <IconDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default MedicacionList;
