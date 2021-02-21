import { useState } from "react"

import { Link } from 'react-router-dom'

function Document() {
  const [ document, setDocument ] = useState()

  return (
    <form id="document">
      <h1>Gerador de Recibos</h1>
      
      <fieldset>
        <select onChange={event => setDocument(event.target.value)}>
          <option>Tipo de Documento</option>
          <option value="decimo">décimo terceiro</option>
          <option value="decimo-proporcional">décimo terceiro proporcional</option>
          <option value="ferias">férias</option>
          <option value="ferias-proporcionais">férias proporcionais</option>
          <option value="salario">salário</option>
        </select>
      </fieldset>

      <Link to={`/${document}`}>
        <button>Avançar</button>
      </Link>
    </form>
  )
}

export default Document
