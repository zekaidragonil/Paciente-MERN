import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const PacientesContext = createContext();

export const PacientesProvider = ({children}) => {
    const [ pacientes , setPacientes] = useState([]);
    const [ paciente , setPaciente] = useState({});  

    useEffect(()=>{
        const obtenerPacinetes = async ( ) =>{
            try{
            const token = localStorage.getItem('token');
            if(!token)return;
    
              const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }         
            }

            const { data } = await clienteAxios('/pacientes', config);
            setPacientes(data);

         }catch(error){
            
         }   
        }
        obtenerPacinetes()
         
       },[]);


   const guardarPacientes = async (pacientes) => {   
    const token = localStorage.getItem('token');
    const config = {
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
     }         


 }   
    
    if(pacientes.id){
      try {
    
       const { data} =  await clienteAxios.put(`/pacientes/${pacientes.id}`, pacientes, config)
       const pacienteAcutalizado = pacientes.map(pacientstrate => pacientstrate._id === 
        data._id ? data : pacientstrate);
        setPacientes(pacienteAcutalizado);

      } catch (error) {
        console.log(error.response.data.msg)
      }

    }else {
      try{
     
        const { data } = await clienteAxios.post('/pacientes', pacientes, config);    
        const { createdAt , updatedAt, __v, ...pacienteAlmacenado } = data    
        setPacientes([pacienteAlmacenado, ...pacientes]);
     
       //setAlert({msg: data.msg});
    }catch(error ){
        console.log(error.response.data.msg)
   //  setAlert({msg: error.response.data.msg, error:true })
    }    
    }
   
    }


    const setEdicion = (paciente) => {
     setPaciente(paciente)
    }

    const eliminarPaciente = async (id) => {
      const token = localStorage.getItem('token');
      const config = {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`
       }         
      }  
      
      const confirmar = confirm('Desea  eliminar ')
      
      if(confirmar)
         try{
        const {data } = await clienteAxios.delete(`/pacientes/${id}`, config);
         const pacienteActualizado = pacientes.filter( pacienteState => pacienteState._id !==
               id )
               setPacientes(pacienteActualizado);
      }catch (error){
        console.log(error)

      }
    } 

        return(
            <PacientesContext.Provider
                value={{
                    pacientes,
                    guardarPacientes,
                    setEdicion,
                    paciente,
                    eliminarPaciente,


                }}>
                   {children}
            </PacientesContext.Provider>
        )
}


export default PacientesContext