/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { IconDelete, IconEdit } from "../components/icons/Icons";

const MedicacionList = ({ medicacionList }) => {
  // const [medicacionFiltered, setMedicacionFiltered] = useState("");
  // const [search, setSearch] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    console.log(medicacionList);
  }, [medicacionList]);

  const handleEdit = (id) => {
    // Implementa la lógica de edición
    console.log(`Editando medicación con ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Implementa la lógica de eliminación
    console.log(`Eliminando medicación con ID: ${id}`);
  };

  const columns = [
    {
      header: "ID",
      accessorKey: "id",      
    },
    {
      header: "Medicacion",
      accessorKey: "medication",      
    },
    {
      header: "Fecha de Vencimiento",
      accessorKey: "medExpiration",
      cell: (info) => {
        const timestamp = info.getValue(); // Obtiene el valor del campo medExpiration
    
        if (timestamp && timestamp.seconds && timestamp.nanoseconds) {
          const expirationDate = new Date(timestamp.seconds * 1000); // Convierte a formato de fecha
          const today = new Date(); // Fecha actual
    
          // Calcula la diferencia en días entre la fecha actual y la fecha de vencimiento
          const differenceInTime = expirationDate.getTime() - today.getTime();
          const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Diferencia en días
    
          // Determina el color en función de los días que faltan para el vencimiento
          let color = "black"; // Por defecto, gris
          if (differenceInDays > 30) {            
            setAlert("green");
          } else if (differenceInDays > 20 && differenceInDays <= 30) {            
            setAlert("yellow");
          } else if (differenceInDays <= 20 && differenceInDays > 0) {          
            setAlert("red");
          } else if (differenceInDays <= 0) {
            setAlert("red");
          }
    
          return (
            <span
              style={{
                color: color, // Aplica el color según los días restantes
                fontWeight: "bold",
              }}
            >
              {expirationDate.toLocaleDateString("es-ES")} {/* Formatea la fecha */}
            </span>
          );
        }
    
        return (
          <span style={{ color: "gray" }}>Fecha Inválida</span>
        ); // Si el valor no es un timestamp válido
      }
    },
    {
      header: "Cantidad",
            accessorKey: "medQuantity",      
    },
    {
    header: "Acciones",
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
  ]
    
  

  const table = useReactTable({data: medicacionList, columns, getCoreRowModel: getCoreRowModel() });   

  return (
    <div className="mt-2 p-2">
          
      <table className="min-w-full shadow-xl rounded-lg mt-1">
        <thead className="bg-gray-800 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-center py-3 px-4 uppercase font-semibold text-sm">
                  { header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext()) }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>          
          {
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={`border-b border-gray-500 hover:bg-blue-300 text-center ${alert === "red" ? "bg-red-500 hover:bg-red-800" : ""} ${alert === "yellow" ? "bg-yellow-500" : ""} ${alert === "green" ? "bg-green-500" : ""}`}>
                {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-3 text-black px-4 capitalize">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}                  
              </tr>
              ))}          
        </tbody>
      </table>
    </div>
  );
};

export default MedicacionList;
