import { useState } from "react"
import { useHistory, useLocation } from 'react-router-dom'

import Header from '../components/Header'

function Document() {
  const history = useHistory()

  const { state } = useLocation()

  const [ document, setDocument ] = useState(state ? state.document || 'x' : 'x')

  function handleSubmit(e) {
    e.preventDefault()
    document !== 'x' ? history.push(`${document}`, state) : 
      window.alert('Selecione um tipo de documento')
  }

  return (
    <div className="document container" onSubmit={handleSubmit}>
      <form>
        <Header pathname="/employee" state={{ ...state, document }}>Gerador de Recibos</Header>
        
        <fieldset>
          <select value={document} onChange={event => setDocument(event.target.value)}>
            <option value="x">Tipo de Documento</option>
            <option value="decimo">décimo terceiro</option>
            <option value="decimo-proporcional">décimo terceiro proporcional</option>
            <option value="ferias">férias</option>
            <option value="ferias-proporcionais">férias proporcionais</option>
            <option value="salario">salário</option>
          </select>
        </fieldset>

        <button>Avançar</button>
      </form>
    </div>
  )
}

export default Document
