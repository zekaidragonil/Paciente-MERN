import usePacientes from '../hooks/usePacientes'
import Paciente from './Pacientes';


const ListadoPaciente = ( ) =>{
  const { pacientes,  } = usePacientes();

    

    return(
    <>
        {pacientes.length ? 
        (
         <>
       <h1 className='text-center font-bold text-3xl'>Listado de pacientes</h1>
        
          {pacientes.map(element => (
           <Paciente 
             key={element._id}
             paciente={element}
            />
          ))}
          
         </>
        ):
        (
          <>
              <h1 className='text-center font-bold text-3xl'>Registre nuevo pacientes para mostrar datos </h1>
              
          </>
        ) }
        </>
    )
}

export default ListadoPaciente 