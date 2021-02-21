import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Index from './pages'
import Document from './pages/Document'
import Decimo from './pages/Document/Decimo'
import DecimoProporcional from './pages/Document/Decimo-Proporcional'
import Ferias from './pages/Document/Ferias'
import FeriasProporcionais from './pages/Document/Ferias-Proporcionais'
import Salario from './pages/Document/Salario'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Index} path="/" exact />
        <Route component={Document} path="/document" />
        <Route component={Decimo} path="/decimo" />
        <Route component={DecimoProporcional} path="/decimo-proporcional" />
        <Route component={Ferias} path="/ferias" />
        <Route component={FeriasProporcionais} path="/ferias-proporcionais" />
        <Route component={Salario} path="/salario" />
      </Switch>
    </BrowserRouter>
  )
} 

export default Routes
