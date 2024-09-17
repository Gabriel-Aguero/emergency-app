/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { IconAdd, IconDelete, IconEdit } from "../components/icons/Icons";

const MedicacionList = ({ medicacionList }) => {  
  // const [search, setSearch] = useState("");
  const [alert, setAlert] = useState("");
  const [sorting, setSorting] = useState([]);
  const [medicacionFiltered, setMedicacionFiltered] = useState("");

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

  const handleAdd = () => {
    // Implementa la lógica de agregar elementos a la tabla
    console.log("Agregando elemento a la tabla con este ID: {}");

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
        const expirationString = info.getValue(); // Obtiene el valor del campo medExpiration como texto
    
        if (expirationString) {
          const expirationDate = new Date(expirationString); // Convierte la cadena de texto a una fecha
          const today = new Date(); // Fecha actual
    
          // Calcula la diferencia en días entre la fecha actual y la fecha de vencimiento
          const differenceInTime = expirationDate.getTime() - today.getTime();
          const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Diferencia en días
    
          // Determina el color en función de los días que faltan para el vencimiento
          let color = "black"; // Por defecto, negro
          if (differenceInDays > 30) {
            setAlert("green"); // Si faltan más de 30 días, se muestra el color verde            
          } else if (differenceInDays > 20 && differenceInDays <= 30) {
            setAlert("yellow"); // Si faltan entre 20 y 30 días, se muestra el color amarillo            
          } else if (differenceInDays <= 20) {
            setAlert("red"); // Si faltan menos de 20 días, se muestra el color rojo            
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
        ); // Si el valor no es un texto válido
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
    
  

  const table = useReactTable({ 
    data: medicacionList, 
    columns, 
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: medicacionFiltered,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setMedicacionFiltered,
  });   

  return (
    <div className="mt-2 p-2">

      {/* añadir boton para agregar elementos a la tabla medicacion     */}
      
      
      <div className="flex justify-start gap-2 items-center">
        <button
          onClick={() => handleAdd()}
          className="bg-black text-white rounded-md p-1 hover:bg-blue-700 transition duration-200"
        >
          <IconAdd />
        </button>
        {/* creamos el input para buscar por medicacion */}
        <input
          type="text"
          placeholder="Buscar por medicación"          
          className="bg-black text-white rounded-md p-1 hover:bg-blue-700 transition duration-200"
          onChange={(e) => setMedicacionFiltered(e.target.value)}
        />

      </div>
      <table className="min-w-full shadow-xl rounded-lg mt-1">
        <thead className="bg-black/80 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} 
                  onClick={header.column.getToggleSortingHandler()}
                  className="text-center py-3 px-4 uppercase font-semibold text-sm">
                  { header.isPlaceholder ? null : (
                    <div>
                      { flexRender(
                        header.column.columnDef.header,
                        header.getContext()) 
                      }

                      {
                        { 'asc': "⬆️", 'desc': "⬇️" }[header.column.getIsSorted() ?? null ]   
                      }
                    </div>  
                  )}
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
      
      {/* paginación de la tabla medicacion  */}
      <div className="flex mt-2 gap-2 items-center">
      <button className="bg-black text-white rounded-md p-1 hover:bg-blue-700 transition duration-200"
      onClick={()=> table.setPageIndex(0)}
      >
        Primer Pagina
      </button>
      <button className="bg-black text-white rounded-md p-1 hover:bg-blue-700 transition duration-200"
      onClick={()=> table.previousPage()}      
      >
        Pagina Anterior
      </button>
      <button className="bg-black text-white rounded-md p-1 hover:bg-blue-700 transition duration-200"
      onClick={()=> table.setPageIndex(table.getPageIndex() + 1)}>      
        Siguiente Pagina
      </button>
      <button className="bg-black text-white rounded-md p-1 hover:bg-blue-700 transition duration-200"
      onClick={()=> table.setPageIndex(table.getPageCount() - 1)}>
        Última Pagina
      </button>
      </div>
    </div>
  );
};

export default MedicacionList;
