import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from '../hooks/usePacientes'

const Formulario = ( ) => {
const [ nombre, setNombre ] = useState('');
const [ propietario, setPropietario ] = useState('');
const [ email, setEmail ] = useState('');
const [ fecha, setFecha ] = useState('');
const [ sintomas, setSintomas ] = useState('');
const [alert , setAlert ] = useState({});
const [ id, setId] = useState(null);    
const { guardarPacientes, paciente} = usePacientes();

 useEffect(()=> {
    if(paciente?.nombre){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
        setId(paciente._id)
    }

 },[paciente])


const handleSubmit = (e) => {
 e.preventDefault();
  if([nombre, propietario, email, fecha , sintomas].includes('')){
    setAlert({msg: 'Los campos no puede ir vacios', error: true})
    return
  }  

  setAlert({})
  guardarPacientes({nombre, propietario, email, fecha , sintomas, id})
  

}
const { msg } = alert

    return(
        <div>
       <p className="text-lg text-center mt-10">Añade tus pacientes y  {''}
       <span className="text-indigo-600 font-bold" >Administralos</span>
     </p>
     <form  onSubmit={handleSubmit} action="" className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded">
     { msg && <Alerta
              alerta={alert} 
             /> }
         <div className="mb-5">
            <label htmlFor="mascota" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
            <input type="text"
              id="mascota"
              value={nombre}
              onInput={e => setNombre(e.target.value)}
              placeholder="nombre de la mascota" 
               className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />

         </div>
         <div className="mb-5">
            <label htmlFor="propietario"
             className="text-gray-700 uppercase font-bold">
                Nombre Propietario</label>
            <input type="text"
              id="propietario"
              value={propietario}
              onInput={e => setPropietario(e.target.value)}
              placeholder="nombre del propietario" 
               className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />

         </div>
         <div className="mb-5">
            <label htmlFor="email"
             className="text-gray-700 uppercase font-bold">
                email</label>
            <input type="text"
              id="email"
              value={email}
              onInput={e => setEmail(e.target.value)}
              placeholder="email" 
               className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />

         </div>
         <div className="mb-5">
            <label htmlFor="fecha"
             className="text-gray-700 uppercase font-bold">
                Fecha Alta</label>
            <input type="date"
              id="fecha"
    
              onInput={e => setFecha(e.target.value)}
              
               className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />

         </div>
         <div className="mb-5">
            <label htmlFor="sintomas"
             className="text-gray-700 uppercase font-bold">
                sintomas</label>
                <textarea 
         onInput={e => setSintomas(e.target.value)}
              id="sintomas"
              value={sintomas}
              placeholder="describe tu sintomas" 
               className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
         </div>

      
         <input type="submit"
           value={id ? 'Editar': 'Agregar paciente'}
            className="font-bold text-white uppercase  bg-indigo-500  p-3 w-full hover:bg-indigo-900 cursor-pointer transition-colors" 
          />

      </form>
     
</div>
    );
};

export default Formulario 

