import { useState } from 'react';
import Formulario from '../components/Formulario';
import ListadoPaciente from '../components/ListadoPacientes';



const AdministraPacientes = () => {
 const [ mostrarFormulario , setMostrarFormularo] = useState(false);

    return (
        <div className='flex flex-col md:flex-row'>
            <button type='button' className='bg-indigo-600 text-white mb-10 md:hidden font-bold uppercase mx-10 p-3 rounded-md'
             onClick={() => setMostrarFormularo(!mostrarFormulario)}>
             mostrar formulario
            </button>
            <div className={` ${mostrarFormulario ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5 `}>
                <Formulario />
            </div>
            <div className='md:w-1/2 lg:w-3/5'>
                <ListadoPaciente />
            </div>
        </div>
    );
}

export default AdministraPacientes