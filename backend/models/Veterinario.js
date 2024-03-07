import mongoose from "mongoose";
import generarID from "../helpers/generald.js";
import bcrypt from 'bcrypt';
const veterinarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type:String,
        default: null,
        trim: true

    },
    web: {
        type: String,
        default: null,
    },
    token :{
        type: String,
        default: generarID(),
    },
    confirmado: {
        type : Boolean,
        default: false
    }

})

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  // Asigna el password hasheado al modelo
  veterinarioSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }
    this.password = await hashPassword(this.password);
  });


veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password);

}

const Veterinario = mongoose.model('Veterinario', veterinarioSchema)


export default Veterinario;