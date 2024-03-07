import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";


const ConfirmarCuenta = () =>{
const [cuentaConfirmada , setCuentaConformiada] = useState(false); 
 const [ alert,  setAlert ] = useState('');
 const [ cargando, setCargando] =useState(true)
 const { id } = useParams();

 useEffect(() =>{
  const ConfirmarCuenta = async () =>{
 try {
    const url = `/veterinarios/confirmar/${id}`;
   
   const { data } = await clienteAxios(url);
   setCuentaConformiada(true)  
   setAlert({
      msg: data.msg 
   })

 } catch (error) {
  setAlert({
   msg: error.response.data.msg,
   error:true
  })
 }
setCargando(false); 
  } 
  ConfirmarCuenta()
 },[]);

 
    return (
        <>
           <div>
            <h1 className="text-indigo-600 font-black text-6xl">
               Confirma tu cuenta y comienza administras {""}  <span className="text-black"> tus Pacientes</span></h1>
          </div>
          <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          { !cargando && <Alerta
              alerta={alert} 
             /> }

             {cuentaConfirmada && (
                      <Link className="block text-center my-5 text-gray-500" to="/">Inicia session</Link>
             )}

          </div>
        </>
    );

}

export default ConfirmarCuenta;