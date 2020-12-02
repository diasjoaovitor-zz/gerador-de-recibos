import { useState } from 'react'
import { Link } from 'react-router-dom'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

import Footer from '../components/footer'

import API from '../api'
import Period from '../helpers/period'
import Format from '../helpers/format'

export default function Ferias() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const period = new Period()
  const format = new Format()

  const [ name, setName ] = useState([])
  const [ RG, setRG ] = useState([])
  const [ start, setStart ] = useState(period.start())
  const [ end, setEnd ] = useState(period.end())

  const handleSubmit = async event => {
    event.preventDefault()

    const api = new API()

    const yearMonth = start.slice(0, 7)
    const { salary } = await api.data(yearMonth)
    const oneThird = (salary/3).toFixed(2)

    const data = {
      document: 'ferias', 
      name, RG, salary, oneThird, start, end
    }

    await api.create(data)

    const year = start.slice(0, 4)
    const total = Number(salary) + Number(oneThird)

    pdfMake.createPdf(
      document(
        name, RG, format.date(start), format.date(end), 
        format.currency(salary), format.currency(oneThird), 
        year, format.currency(total), format.extensive(total)
      )
    ).open()
  }

  return (
    <div className="document">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <header>
            <h1>Recibo de Férias</h1>
            <Link to="/">
              <div>
                <span className="material-icons">arrow_back</span>
                voltar
              </div>
            </Link>
          </header>

          <fieldset>
            <legend>Dados do funcionário</legend>
            <input 
              type="text" placeholder="Nome Completo" autoFocus required
              onChange={event => setName(event.target.value)}
            />
            <input 
              type="text" placeholder="RG" required
              value={RG} onChange={event => setRG(format.rg(event.target.value))}
            />
          </fieldset>

          <fieldset>
            <legend>Periodo de férias</legend>
            <label>
              <span>Inicio</span>
              <input 
                type="date" required
                value={start} onChange={event => setStart(event.target.value)}
              />
            </label>
            <label>
              <span>Fim</span>
              <input 
                type="date" required
                value={end} onChange={event => setEnd(event.target.value)}
              />
            </label>
          </fieldset>

          <button>Criar</button>
        </form>

        <Footer />
      </div>
    </div>
  )
}

function document(name, RG, start, end, salary, oneThird, year, total, extensive) {
  const docDefinition = {
    content: [
      {
        text: 'Recibo de Férias',
        fontSize: 28,
        bold: true,
        alignment: 'center'
      },
      {
        text: `Nome:  ${name}`, margin: [0, 40, 0, 5]
      },
      {
        text: `RG:  ${RG}`
      },
      {
        text: `Periodo de férias: ${start} a ${end}`, margin: [0, 5]
      },
      {
        text: `Salario base:  ${salary}`
      },
      {
        text: `1/3 férias:  ${oneThird}`, margin: [0, 5]
      },
      {
        text: `   Recebi da empresa João Pedro Ferreira dos Santos, estabelecida na Praça do Mercado, 190, em Poções – BA, no ano de ${year}, a importação de ${total} – ${extensive}, que me é paga por motivo das minhas férias regulares, ora concedidas e que vou gozar de acordo com a descrição acima.`,
        margin: [0, 25, 0, 10]
      },
      {
        text: '   Para clareza e documento, firmo o presente recibo, dando plena e geral quitação.'
      },
      {
        text: `Data:  ${start}`, margin: [0, 20, 0, 5]
      },
      {
        text: `Empregado: ${name}`
      },
      {
        text: `Empregador:  João Pedro Ferreira dos Santos`, margin: [0, 5, 0, 40]
      },
      {
        text: '__________________________________________________', 
        alignment: 'center'
      },
      {
        text: name, margin: [0, 10], alignment: 'center'
      }
    ]
  }

  return docDefinition
}