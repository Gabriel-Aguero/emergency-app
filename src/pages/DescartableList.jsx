/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { IconAdd, IconDelete, IconEdit } from "../components/icons/Icons";
import FormRegisterCart from "./FormRegisterCart";
import Swal from "sweetalert2";
import ModalDescartable from "./ModalDescartable";

const DescartableList = ({ descartablesList, idCarro }) => {
  const { deleteDescartable, user } = useContext(AuthContext);

  const [sorting, setSorting] = useState([]);
  const [descartableFiltered, setDescartableFiltered] = useState("");
  const [showFormRegisterInfo, setShowFormRegisterInfo] = useState(false);
  const [dataDescartable, setDataDescartable] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setShowFormRegisterInfo(false);
  }, [descartablesList]);

  const handleEdit = (data) => {
    setDataDescartable(data);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    // Implementa la lógica de eliminación

    Swal.fire({
      title: "Estas seguro de eliminar este elemento?",
      text: "Si eliminas este elemento no se podrá recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDescartable(id);
        Swal.fire({
          title: "Eliminado!",
          text: "El elemento ha sido eliminado correctamente",
          icon: "success",
        });
      }
    });
  };

  const handleAdd = () => {
    // Implementa la lógica de agregar elementos a la tabla
    setShowFormRegisterInfo(!showFormRegisterInfo);
  };

  const columns = [
    // {
    //   header: "ID",
    //   accessorKey: "id",
    // },
    {
      header: "Material",
      accessorKey: "material",
    },
    {
      header: "Fecha de Vencimiento",
      accessorKey: "matExpiration",
    },
    {
      header: "lote",
      accessorKey: "lot",
    },
    {
      header: "Cantidad",
      accessorKey: "matQuantity",
    },
  ];

  if (user) {
    columns.push({
      header: "Acciones",
      cell: (row) => {
        const dataMed = row.cell.row.original;
        return (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => handleEdit(dataMed)}
              className="bg-blue-500 text-white rounded-md p-1 hover:bg-blue-700 transition duration-200"
            >
              <IconEdit />
            </button>
            <button
              onClick={() => handleDelete(dataMed.id)}
              className="bg-red-500 text-white rounded-md p-1 hover:bg-red-700 transition duration-200"
            >
              <IconDelete />
            </button>
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    });
  }

  const table = useReactTable({
    data: descartablesList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: descartableFiltered,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setDescartableFiltered,
  });

  return (
    <>
      {showFormRegisterInfo ? (
        <FormRegisterCart idCarro={idCarro} />
      ) : (
        <>
          <div className="min-w-60 p-10 flex flex-col gap-2 justify-start items-start">
            <div className="flex justify-start gap-2 items-center">
              {user ? (
                <button
                  onClick={() => handleAdd()}
                  className="bg-black text-white rounded-md p-1 hover:bg-blue-700 transition duration-200"
                >
                  <IconAdd />
                </button>
              ) : (
                ""
              )}

              <p className="text-sm text-gray-700 dark:text-gray-400 hidden">
                {idCarro}
              </p>
              {/* creamos el input para buscar por medicacion */}
              <input
                type="text"
                placeholder="Buscar por medicación"
                className="bg-black/90 text-white rounded-md p-2 hover:bg-slate-300 transition duration-200 focus:bg-slate-800 focus:border-slate-800 focus:border-none"
                onChange={(e) => setDescartableFiltered(e.target.value)}
              />
            </div>

            <table className="min-w-full p-10 shadow-xl rounded-lg mt-1">
              <thead className="bg-slate-800 text-white">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="text-center py-3 px-4 uppercase font-semibold text-sm"
                      >
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

                            {
                              { asc: "⬆️", desc: "⬇️" }[
                                header.column.getIsSorted() ?? null
                              ]
                            }
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => {
                  // Obtenemos la fecha de vencimiento para cada fila
                  const expirationString = row.original.matExpiration;
                  let bgColor = ""; // Por defecto no hay color
                  let differenceInDays = 0; // Inicializamos la variable para días restantes

                  if (expirationString) {
                    const expirationDate = new Date(expirationString); // Convertimos el string a fecha
                    const today = new Date(); // Fecha actual

                    // Calcula la diferencia en días
                    const differenceInTime =
                      expirationDate.getTime() - today.getTime();
                    differenceInDays = Math.ceil(
                      differenceInTime / (1000 * 3600 * 24)
                    ); // Diferencia en días

                    // Asignamos el color de fondo según los días restantes
                    if (differenceInDays > 30) {
                      bgColor = "bg-green-400 hover:bg-green-500 font-bold"; // Más de 30 días
                    } else if (
                      differenceInDays > 20 &&
                      differenceInDays <= 30
                    ) {
                      bgColor = "bg-yellow-200 hover:bg-yellow-300 font-bold"; // Entre 20 y 30 días
                    } else if (differenceInDays <= 20 && differenceInDays > 0) {
                      bgColor = "bg-red-500 hover:bg-red-500 font-bold"; // Menos de 20 días
                    } else if (differenceInDays <= 0) {
                      bgColor = "bg-red-500 hover:bg-red-700 font-bold"; // Si ya venció
                    }
                  }

                  return (
                    <tr
                      key={row.id}
                      className={`border-b border-gray-500 text-center ${bgColor}`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="py-3 text-black px-4 capitalize"
                        >
                          {cell.column.id === "matExpiration" ? (
                            <span>
                              {/* Muestra la fecha y los días restantes */}
                              {expirationString
                                ? expirationString
                                : "Fecha Inválida"}
                              <br />
                              <span className="text-sm text-gray-700 font-bold">
                                {differenceInDays <= 0
                                  ? "Material vencido"
                                  : "Días restantes: " + differenceInDays}
                              </span>
                            </span>
                          ) : (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* paginación de la tabla medicacion  */}
            <div className="flex mt-2 gap-2 items-center">
              <button
                className="bg-black text-white rounded-md p-1 hover:bg-blue-700 transition duration-200"
                onClick={() => table.setPageIndex(0)}
              >
                Primer Pagina
              </button>
              <button
                className="bg-black text-white rounded-md p-1 hover:bg-blue-700 transition duration-200"
                onClick={() => table.previousPage()}
              >
                Pagina Anterior
              </button>
              <button
                className="bg-black text-white rounded-md p-1 hover:bg-blue-700 transition duration-200"
                onClick={() => table.setPageIndex(table.getPageIndex() + 1)}
              >
                Siguiente Pagina
              </button>
              <button
                className="bg-black text-white rounded-md p-1 hover:bg-blue-700 transition duration-200"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              >
                Última Pagina
              </button>
            </div>
          </div>

          <ModalDescartable
            dataDescartable={dataDescartable}
            isModalOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </>
      )}
    </>
  );
};

export default DescartableList;
