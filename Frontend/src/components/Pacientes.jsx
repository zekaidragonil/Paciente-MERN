import usePacientes from "../hooks/usePacientes"

const Paciente = ({paciente}) => {
const { email, fecha, nombre, propietario, sintomas, _id } = paciente
 const { setEdicion, eliminarPaciente } = usePacientes();

  const fechaActual = (fecha) =>{
    const nueva =  new Date(fecha)
    return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nueva)
  }


    return(
       <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
         <p className=" text-indigo-700 my-2 font-bold uppercase">Nombre: <span className=" text-black font-normal normal-case">{nombre}</span></p>
         {/* <p className=" text-indigo-800 my-2 font-bold uppercase">propietario: <span className=" text-black font-normal normal-case">{propietario}</span></p> */}
         <p className=" text-indigo-700 my-2 font-bold uppercase">email: <span className=" text-black font-normal normal-case">{email}</span></p>
         <p className=" text-indigo-700 my-2 font-bold uppercase">fecha: <span className=" text-black font-normal normal-case">{fechaActual(fecha)}</span></p>
         <p className=" text-indigo-700 my-2 font-bold uppercase">sintomas: <span className=" text-black font-normal normal-case">{sintomas}</span></p>

         <div className="flex justify-between my-5">
            <button onClick={() => setEdicion(paciente)} 
            className="text-white uppercase py-2 px-10 bg-indigo-600 rounded-lg font-bold hover:bg-indigo-700  cursor-pointer">
             editar

            </button>
            <button onClick={() => eliminarPaciente(paciente._id)}  
            className="text-white uppercase py-2 px-10 bg-red-600 rounded-lg  font-bold hover:bg-red-700  cursor-pointer">
             borrar
            </button>

         </div>
       </div>
    )
}

export default Paciente 