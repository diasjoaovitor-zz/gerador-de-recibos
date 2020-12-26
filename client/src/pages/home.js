import { useState } from 'react'
import { Link } from 'react-router-dom'

import Footer from '../components/footer'

export default function Home() {
  const [ page, setPage ] = useState('')
  const [ nextPage, setNextPage ] = useState(false)

  const event = (event, value) => {
    if(value) {
      setNextPage(true)
      setPage(event.target.value)
    } else {
      event.preventDefault()
    }
  }

  return (
    <div className="home">
      <div className="container">
        <form>
          <h1>Gerador de Recibos</h1>

          <fieldset>
            <legend>Selecione o tipo de documento</legend>

            <Link to={`/${page}`} onClick={e => event(e, nextPage)} onChange={e => event(e, true)}>
              <select>
                <option value="">Tipo de documento</option>
                <option value="decimo">décimo terceiro</option>
                <option value="decimo-proporcional">décimo terceiro proporcional</option>
                <option value="ferias">férias</option>
                <option value="ferias-proporcionais">férias proporcionais</option>
                <option value="salario">salário</option>
                <option value="salario-proporcional">salário proporcional</option>
              </select>
            </Link>
          </fieldset>

          <Link to={`/${page}`}>
            <button>Avançar</button>
          </Link>
        </form>

        <Footer />
      </div>
    </div>
  )
}
