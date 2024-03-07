import { Link , useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";


  const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert , setAlert ] = useState({});
 const { setAuth} = useAuth();
  const navigate = useNavigate();


  const haldenSubmit = async (e) =>{
    e.preventDefault();

    if([email, password].includes('')){
      setAlert({ msg: "Todos los campos son obligatorios", error:true})
      return
    }

    try {
  
      const { data } = await clienteAxios.post('/veterinarios/login', {email, password})
       
      localStorage.setItem('token', data.token);
       setAuth(data);
      setAlert({msg: data.msg})
      navigate('/admin')
       
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
      
    }
  }

  
  const { msg } = alert

    return (
        <>
       
          <div>
            <h1 className="text-indigo-600 font-black text-6xl">
              Incia Session y Administra tu<span className="text-black"> pacientes </span></h1>
          </div>
          <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          { msg && <Alerta
              alerta={alert} 
             /> }
            <form onSubmit={haldenSubmit} action="">
              <div className="my-5">
                <label className="uppercase text-gray-600 text-xl font-bold" htmlFor="">Email :</label>
                <input
                 className="borde w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                 type="text" 
                 value={email}
                 onInput={e => setEmail(e.target.value)}
                 placeholder="Email de registro" />
              </div>
              <div>
                <label className="uppercase text-gray-600 text-xl font-bold" htmlFor="">Password :</label>
                <input
                 className="borde w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                 type="password" 
                 value={password}
                 onInput={e => setPassword(e.target.value)}
                 placeholder="password" />
              </div>
              <input type="submit" value="Iniciar Sesion"
               className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5
               hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
            </form>
         <nav className="mt-10 lg:flex lg:justify-between">
         <Link className="block text-center my-5 text-gray-500" to="/registrar">No tienes en la cuenta? Registrar</Link>
         <Link className="block text-center my-5 text-gray-500" to="/olvide-password">Olvide mi password</Link>
        </nav>

          </div>
          
        </>
    );

}

export default Login;