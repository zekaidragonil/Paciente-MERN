
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import AuthLayout from './layouts/Auth'
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/Olvidepassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import NuevoPassword from './paginas/nuevoPassowrd'
import { AuthProvider } from './context/AuthProvider'
import RutaProtegida from './layouts/RoutaProtegida'
import AdministraPacientes from './paginas/AdministrarPacientes'
import { PacientesProvider } from './context/PacientesProvider'

function App() {
  return (
   <BrowserRouter>
   <AuthProvider>
    <PacientesProvider>
    <Routes>
      <Route path='/'element={<AuthLayout/>}>
         <Route index element={<Login />} />
          <Route path='registrar' element={<Registrar />} />
          <Route path='olvide-password' element={<OlvidePassword />} />
          <Route path='olvide-password/:token' element={<NuevoPassword />} />
          <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
      </Route>
      
      <Route path='/admin' element={<RutaProtegida/>}>
        <Route  index element={<AdministraPacientes/>} />

      </Route>
    </Routes>
    </PacientesProvider>
    </AuthProvider>
   </BrowserRouter>
  )
}

export default App
