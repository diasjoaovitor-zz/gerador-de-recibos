import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/home'
import Decimo from './pages/decimo'
import DecimoProporcional from './pages/decimo-proporcional'
import Ferias from './pages/ferias'
import FeriasProporcionais from './pages/ferias-proporcionais'
import Salario from './pages/salario'



export default function Routes() {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={Decimo} path="/decimo" />
      <Route component={DecimoProporcional} path="/decimo-proporcional" />
      <Route component={Ferias} path="/ferias" />
      <Route component={FeriasProporcionais} path="/ferias-proporcionais" />
      <Route component={Salario} path="/salario" />
    </BrowserRouter>
  )
}