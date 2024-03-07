import { Link } from "react-router-dom";
import  { useState } from 'react'
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () =>{
    const [nombre, setNombre ] = useState('') 
    const [email, setEmail ] = useState('') 
    const [password, setPassword ] = useState('') 
    const [repetirpassowod, setRepetirpassowod ] = useState('') 
    const [alert , setAlert ] = useState({});
 
    const handleSubmit = async e =>{
    e.preventDefault();

    if([nombre, email, password, repetirpassowod].includes('')){
        setAlert({msg: 'hay campos vacios', error:true})
      return
    }
    if(password !== repetirpassowod){
        setAlert({msg:'los password no son iguales', error:true})
        return;
    }
    if(password.length < 6){
        setAlert({msg: ' el password es muy corto ', error:true})
        return;
    }
    setAlert({});

    //  crear el usuario con la api
       try {
        const  url = "/veterinarios"
        
         await clienteAxios.post(url, {nombre, email, password});

         setAlert({
          msg: 'Creado correctamente, reciba tu email ', error:false
         })
                
       } catch (error) {
          setAlert({
            msg: error.response.data.msg,
            error: true
          })
       }

       setNombre('');
       setEmail('');
       setPassword('');
       setRepetirpassowod('');

  }

  const { msg } = alert

    return (
        <>
          <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Crea tu Cuenta y Administra {""}  <span className="text-black"> tus Pacientes</span></h1>
          </div>
          <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

           { msg && <Alerta
              alerta={alert} 
             /> }
            <form  onSubmit={handleSubmit} action="">
              <div className="my-5">
                <label className="uppercase text-gray-600 text-xl font-bold" htmlFor="">
                    nombre :</label>
                <input
                 className="borde w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                 type="text" 
                 placeholder="nombre" 
                  value={nombre}
                   onInput={e => setNombre(e.target.value)}/>
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 text-xl font-bold" htmlFor="">
                    Email :</label>
                <input
                 className="borde w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                 type="text" 
                 placeholder="Email de registro"
                 value={email}
                 onInput={e => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="uppercase text-gray-600 text-xl font-bold" htmlFor="">Password :</label>
                <input
                 className="borde w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                 type="password" 
                 placeholder="password" 
                 value={password}
                 onInput={e => setPassword(e.target.value)}
                 />
              </div>
              <div>
                <label className="uppercase text-gray-600 text-xl font-bold" htmlFor="">
                    Repite Password :</label>
                <input
                 className="borde w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                 type="password" 
                 placeholder=" repite password"
                 value={repetirpassowod}
                 onInput={e => setRepetirpassowod(e.target.value)}/>
              </div>
              <input type="submit" value="Crear cuenta"
               className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5
               hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
            </form>
            <nav className="mt-10 lg:flex lg:justify-between">
           <Link className="block text-center my-5 text-gray-500" to="/">Ya tienes una cuenta? Inicia session</Link>
           <Link className="block text-center my-5 text-gray-500" to="/olvide-password">Olvide mi password</Link>
            </nav>

          </div>
        </>
    );

}

export default Registrar;