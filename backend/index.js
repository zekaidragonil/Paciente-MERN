import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import veterinarioReoute from './Route/veterinarioReoute.js'
import pacineteroute from './Route/pacienteRoute.js';
import cors from 'cors';

const app = express(); 
app.use(express.json());
dotenv.config();
conectarDB();
const dominiosPermtidos = [process.env.FROTEND_URL]

const corsOptions = {
    origin: function(origin , callback){
        if(dominiosPermtidos.indexOf(origin) !== -1){
            callback(null, true);
        } else{
            callback(new Error('No permitido por CORS'))
        }
    } 
}

app.use(cors(corsOptions));

app.use('/api/veterinarios', veterinarioReoute);
app.use('/api/pacientes', pacineteroute)

const PORT = process.env.PORT || 4000 ;

app.listen(PORT, () =>{
    console.log(`servidor funcionando en puerto ${PORT}`);
});