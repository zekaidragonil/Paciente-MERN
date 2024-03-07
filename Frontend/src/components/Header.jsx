import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"


const Header = ( ) =>{
  const { cerrarSesion}= useAuth();

    return(
        <header className="py-10 bg-indigo-600">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <h1 className="font-bold text-2xl text-indigo-200 text-center">
                     Administrador de paciente de {''} 
                        <span className="text-white font-black">  Veterinaria</span>
                     </h1>

                     <nav className="flex gap-4 items-center flex-col  lg:flex-row mt-5 lg:mt-0">
                     <Link to="/admin" className="text-white text-sm uppercase">Pacientes </Link>
                     <Link to="/admin" className="text-white text-sm uppercase">Perfil </Link>
                     <button onClick={cerrarSesion} className="text-white text-sm uppercase">cerrar sesion</button>
                </nav>  
        
            </div>

        </header>
    )
}

export default Header 