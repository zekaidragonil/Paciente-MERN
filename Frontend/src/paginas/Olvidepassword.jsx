
import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
const OlvidePassword = () =>{
const [email, setEmail] = useState('')
const [alert , setAlert ] = useState({});

const handleSubmit= async (e) => {
      e.preventDefault();
      if(email === ""){
        
        return setAlert({msg:'el correo no puede ir vacio', error:true})
      }

      try {
        const {data} =  await  clienteAxios.post('/veterinarios/reset-password', {email})
        
        setAlert({msg: data.msg })
        
      } catch (error) {

        setAlert({msg: error.response.data.msg, error:true })
        
      }
}

const { msg } = alert
    return (
        <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Recupera tu Acceso y no Pierdas  {""}  <span className="text-black"> tus Pacientes</span></h1>
          </div>
          <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          { msg && <Alerta
              alerta={alert} 
             /> }
            <form onSubmit={handleSubmit} action="">
              <div className="my-5">
                <label className="uppercase text-gray-600 text-xl font-bold" htmlFor="">
                    Email :</label>
                <input
                 className="borde w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                 type="text" 
                 value={email}
                 onInput={e => setEmail(e.target.value)}
                 placeholder="Email de registro" />
              </div>
              <input type="submit" value="Recuperar password"
               className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5
               hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
              </form>
              <nav>
              <Link className="block text-center my-5 text-gray-500" to="/registrar">No tienes en la cuenta? Registrar</Link>
              <Link className="block text-center my-5 text-gray-500" to="/">Ya tienes una cuenta? Inicia session</Link>
             </nav>
              </div>
        </>
    );

}

export default OlvidePassword;