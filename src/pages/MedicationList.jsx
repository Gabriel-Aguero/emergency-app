/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

const MedicacionList = ({ medicacionList }) => {
  // const [medicacionFiltered, setMedicacionFiltered] = useState("");
  // const [search, setSearch] = useState("");

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
        const timestamp = info.getValue(); // Obtiene el timestamp
        if (timestamp && timestamp.seconds) {
          const date = new Date(timestamp.seconds * 1000); // Convierte el timestamp a fecha
          return date.toLocaleDateString("es-ES"); // Formatea la fecha (en formato es-ES)
        }
        return "Fecha Inválida"; // En caso de que no haya timestamp válido
      }      
    },
    {
      header: "Cantidad",
            accessorKey: "medQuantity",      
    }
  ]
    // {
    //   name: "Acciones",
    //   cell: (row) => (
    //     <div className="flex gap-2 justify-center">
    //       <button
    //         onClick={() => handleEdit(row.id)}
    //         className="bg-blue-500 text-white rounded-md p-1 hover:bg-blue-700 transition duration-200"
    //       >
    //         <IconEdit />
    //       </button>
    //       <button
    //         onClick={() => handleDelete(row.id)}
    //         className="bg-red-500 text-white rounded-md p-1 hover:bg-red-700 transition duration-200"
    //       >
    //         <IconDelete />
    //       </button>
    //     </div>
    //   ),
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   button: true,
    // },
  

  const table = useReactTable({data: medicacionList, columns, getCoreRowModel: getCoreRowModel() }); 

  // const handleSearch = (e) => {
  //   setSearch(e.target.value);
  //   const filteredData = medicacionList.filter((medicacion) => {
  //     return medicacion.medication.toLowerCase().includes(search.toLowerCase());
  //   });
  //   setMedicacionFiltered(filteredData);
  // };

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
              <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-600 text-center">
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
