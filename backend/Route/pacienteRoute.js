import  express  from "express";
const router = express.Router();
import { AgregarPaciente , Obtenerpacientes, Obtenerpaciente ,
    actualizaPacientes, eliminarPacientes } from "../controllers/pacienteController.js";
import checkAuth from '../middleware/authMiddleware.js'

router.route('/').post(checkAuth, AgregarPaciente).get(checkAuth, Obtenerpacientes);

router
.route('/:id')
.get(checkAuth, Obtenerpaciente)
.put(checkAuth, actualizaPacientes)
.delete(checkAuth, eliminarPacientes);



export default router