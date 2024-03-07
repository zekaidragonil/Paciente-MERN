import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import { useEffect, useState } from "react"
import clienteAxios from "../config/axios"


const NuevoPassword = () => {
   const [password, setPassword] = useState('')
   const [alert, setAlert] = useState({});
   const [ tokenvalido, setToken] = useState(false);
   const [passwordModificado, setPasswordMdoficiado] = useState(false)
   const { token } = useParams();

   useEffect(() => {
      const comprobarToken = async () => {

         try {
           await clienteAxios(`/veterinarios/reset-password/${token}`);
           setAlert({
            msg: "Coloca tu nuevo password"
           });
           setPasswordMdoficiado(true)
           setToken(true)
         } catch (error) {
            setAlert({
               msg: 'Hubo un error con el enlace',
               error: true
            });
         }

      }
      comprobarToken();

   }, [])

   const { msg } = alert

   const handleSubmit = async (e) =>{
      e.preventDefault()
      
      try{
        const   url = `/veterinarios/reset-password/${token}`;

      const {  data } =  await clienteAxios.post(url,{ password });
        
        setAlert({msg: data.msg});

      }catch (error){
         setAlert({msg: error.response.data.msg, error:true});
      }
   }

   return (
      <>
     
         <div>
            <h1 className="text-indigo-600 font-black text-6xl">
               Restablece tu Acceso y no Pierdas  {""}  <span className="text-black"> tus Pacientes</span></h1>
         </div>
         <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {msg && <Alerta
               alerta={alert}
            />}
            <>
             {tokenvalido && (
            <form onSubmit={handleSubmit}>
               <div>
                  <label className="uppercase text-gray-600 text-xl font-bold" htmlFor="">Password :</label>
                  <input
                     className="borde w-full p-3 mt-3 bg-gray-50 rounded-xl"
                     type="password"
                     placeholder=" Nuevo password"
                     value={password}
                     onInput={e => setPassword(e.target.value)}
                  />
               </div>
               <input type="submit" value="Recuperar password"
               className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5
               hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
            </form>    
              )}
              {passwordModificado && (
       <Link className="block text-center my-5 text-gray-500" to="/"> Inicia session</Link>
              )}
              
              </>
         </div>
       
      </>
   )
}
export default NuevoPassword