import  express  from "express";
import { registro, 
perfil, 
confirmar, 
autenticar,
resetPassword , 
comprobartoken,
 nuevoPassword
} from '../controllers/veterControllers.js'
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router(); 


router.post('/', registro );
router.get('/confirmar/:token',  confirmar );
router.post('/login', autenticar );

router.post('/reset-password', resetPassword);
router.route('/reset-password/:token').get(comprobartoken).post(nuevoPassword);


router.get('/perfil', checkAuth, perfil );

export default router;