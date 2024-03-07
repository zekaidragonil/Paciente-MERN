import Paciente from "../models/paciente.js"

const AgregarPaciente = async (req, res) =>{

    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    
    try {
      
    const pacienteAlmacenado = await paciente.save();  
    res.json(pacienteAlmacenado);

    } catch (error) {
        console.log(error)
    }
}
const Obtenerpacientes = async (req, res) =>{
    const paciente = await Paciente.find().where('veterinario').equals(req.veterinario);
    res.json(paciente);
}


const Obtenerpaciente = async(req , res) =>{
    const { id } = req.params;
    const paciente = await Paciente.findById(id);
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
       return  res.json({msg: "Accion no valida"})
    }
    if(paciente){
        res.json(paciente);
    }
}

const actualizaPacientes = async(req , res) =>{
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return  res.status(404).json({msg: "No encontrado"})
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
       return  res.json({msg: "Accion no valida"})
    }

    paciente.nombre = req.body.nombre || paciente.nombre
    paciente.propietario = req.body.propietario || paciente.propietario;
    try{
        
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);

    } catch ( error ){
       console.log(error);
    }
}

const eliminarPacientes = async(req , res) =>{

    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return  res.status(404).json({msg: "No encontrado"})
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
       return  res.json({msg: "Accion no valida"})
    }

    try {
        await paciente.deleteOne();
        res.json({msg: "Paciente eliminado"})
        
    } catch (error) {
        console.log(error)
    }
}


export {AgregarPaciente, Obtenerpacientes, Obtenerpaciente,actualizaPacientes, eliminarPacientes}