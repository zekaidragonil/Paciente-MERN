import Veterinario from '../models/Veterinario.js'
import generaJWT from '../helpers/generarJWT.js';
import generarID from '../helpers/generald.js';
import emailRegistro from '../helpers/emailRegistro.js';
import emailOlvidePassword from '../helpers/emailOlvidePassowrd.js';


const registro = async (req, res) =>{
  const { email, nombre } = req.body
     
  const existeUser = await Veterinario.findOne({ email });

  if(existeUser){
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({msg: error.message});
  }
    try {
         
     const veterinario = new Veterinario(req.body);
     const veterinarioGuardado = await veterinario.save();

     emailRegistro({email, nombre, token:veterinarioGuardado.token});
     
     res.json(veterinarioGuardado)

    } catch (error) {
        console.log(error)
    }
}

const perfil = (req, res ) =>{
    const { veterinario } = req;
   
    res.json({veterinario })
}

const confirmar = async (req, res ) =>{
    const { token } = req.params


    const UsuarioConfirmar  = await Veterinario.findOne({ token })
 
    if( !UsuarioConfirmar){
        const error = new Error('Token no valido');
        return res.status(400).json({msg: error.message});
    }

    try {
      
        UsuarioConfirmar.confirmado = null;
        UsuarioConfirmar.confirmado = true;
        UsuarioConfirmar.token = null;
        await UsuarioConfirmar.save(); 
     res.json({ msg: " Tu cuenta esta confirmada..." }) 
        
    } catch (error) {
        console.log(error)
    }
 
}

const autenticar = async (req , res) =>{
    const { email, password,  } = req.body
  
      const Usuario = await Veterinario.findOne({email});  

      if(!Usuario){
        const error = new Error('Usuario no existe');
        return res.status(404).json({msg: error.message});
    }

    if(!Usuario.confirmado){
        const error = new Error('Tu cuenta no esta confirmada');
        return res.status(403).json({msg: error.message});
    }

    if(await Usuario.comprobarPassword(password)){
        
        res.json({
            _id: Usuario._id,
            nombre: Usuario.nombre,
            email: Usuario.email,
            token: generaJWT(Usuario.id)
        });
    }else{
        const error = new Error('Tu password incorrecto');
        return res.status(403).json({msg: error.message});
    }
}


const resetPassword = async (req, res ) =>{
    const { email } = req.body;

    const existeVeterinario = await Veterinario.findOne({ email});



    if(!existeVeterinario){
        const error = new Error(' el usuario no existe');
        return res.status(404).json({msg: error.message})
        }


        try {
             existeVeterinario.token = generarID();
             emailOlvidePassword({
                email,
                nombre: existeVeterinario.nombre,
                token: existeVeterinario.token})
             await existeVeterinario.save();
             res.json({msg: 'Se envio la informacion al correo ' })
        } catch (error) {
            console.log(error);
        }

}
const comprobartoken = async (req, res ) =>{
     const { token } = req.params;

     const tokenValido = await Veterinario.findOne({token})

     if(tokenValido){
 
         res.json({msg: "el usuario existe"});
     } else{
        const error = new Error(' Etoken es valido');
        return res.status(404).json({msg: error.message})
     }
}
const nuevoPassword = async (req, res ) =>{
    const { token } = req.params;
    const { password } = req.body;

    const veterinario = await Veterinario.findOne({ token })
       if(!veterinario){
        const error = new Error('Hubo un error');
        return res.status(404).json({msg: error.message})
       }

       try{
        veterinario.token = null,
        veterinario.password = password
        await veterinario.save(); 
        res.json({msg: "tu password fue cambiado correctament"})

       }catch (error) {

       }
}

export { registro, perfil, confirmar, autenticar, resetPassword, comprobartoken , nuevoPassword}