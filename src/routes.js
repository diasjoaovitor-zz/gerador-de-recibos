import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Company from './pages/Company.js'
import Employee from './pages/Employee'
import SelectDocument from './pages/Select-Document'
import Decimo from './pages/Document/Decimo'
import DecimoProporcional from './pages/Document/Decimo-Proporcional'
import Ferias from './pages/Document/Ferias'
import FeriasProporcionais from './pages/Document/Ferias-Proporcionais'
import Salario from './pages/Document/Salario'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
       {/* />
        <Route component={DecimoProporcional} path="/decimo-proporcional" />
        <Route component={Ferias} path="/ferias" />
        <Route component={FeriasProporcionais} path="/ferias-proporcionais" />
  <Route component={Salario} path="/salario" />*/}
      </Switch>
    </BrowserRouter>
  )
} 

export default Routes
