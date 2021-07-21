import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Company from './pages/Company'
import Employee from './pages/Employee'
import Document from './pages/Document'
import Decimo from './pages/Document-Pages/Decimo'
import DecimoProporcional from './pages/Document-Pages/Decimo-Proporcional.js'


import './css/style.css'
import './css/responsive.css'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Company} path="/" exact />
        <Route component={Employee} path="/employee" />
        <Route component={Document} path="/document" />
        <Route component={Decimo} path="/decimo" />
        <Route component={DecimoProporcional} path="/decimo-proporcional" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
