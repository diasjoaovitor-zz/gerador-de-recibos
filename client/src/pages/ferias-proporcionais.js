import { useState } from 'react'
import { Link } from 'react-router-dom'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

import Footer from '../components/footer'

import API from '../api'
import Period from '../helpers/period'
import Format from '../helpers/format'

export default function FeriasProporcionais() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const p = new Period()
  const format = new Format()

  const [ name, setName ] = useState([])
  const [ RG, setRG ] = useState([])
  const [ date, setDate ] = useState(p.start())
  const [ period, setPeriod ] = useState([])

  const handleSubmit = async event => {
    event.preventDefault()

    const api = new API()

    const yearMonth = date.slice(0, 7)
    const { salary } = await api.data(yearMonth)
    const oneThird = (salary/3).toFixed(2)
    
    const year = date.slice(0, 4)

    const data = {
      document: 'decimo-proporcional', 
      name, RG, year, salary, period, date,
    }

    await api.create(data)

    const value = (salary / 12) * period
    const total = value + oneThird

    pdfMake.createPdf(
      document(
        name, RG, year, format.currency(salary), format.currency(oneThird), format.currency(value), 
        format.extensive(value), format.extensive(oneThird), format.currency(total), format.extensive(total), 
        format.zero(period), format.date(date)
      )
    ).open()
  }

  return (
    <div className="document">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <header>
            <h1>Recibo de Férias - Proporcional</h1>
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
              type="text" placeholder="Nome Completo" autoFocus
              onChange={event => setName(event.target.value)}
            />
            <input 
              type="text" placeholder="RG" 
              value={RG} onChange={event => setRG(format.rg(event.target.value))}
            />
          </fieldset>

          <fieldset>
            <legend>Periodo</legend>
            <input 
              type="number" placeholder="quantidade de meses" required
              onChange={event => setPeriod(event.target.value)} 
            />
          </fieldset>

          <fieldset>
            <legend>Data</legend>
            <input 
              type="date" required
              value={date} onChange={event => setDate(event.target.value)}
            />
          </fieldset>

          <button>Criar</button>
        </form>

        <Footer />
      </div>
    </div>
  )
}

function document(name, RG, year, salary, oneThird, value, extensive, extensiveOneThird, total, extensiveTotal, period, date) {
  const docDefinition = {
    content: [
      {
        text: 'Recibo de Férias - Proporcional',
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
        text: `Ano: ${year}`, margin: [0, 5]
      },
      {
        text: `Salario base:  ${salary}`
      },
      {
        text: `1/3 férias:  ${oneThird}`, margin: [0, 5]
      },
      {
        text: `Recebi da empresa João Pedro Ferreira dos Santos, estabelecida na Praça do Mercado, 190, em Poções – BA, no ano de ${year}, o valor proporcional de ${value} – ${extensive}, referente a ${period} meses, com terço de férias equivalente a ${oneThird} - ${extensiveOneThird}, resultando no total de ${total} - ${extensiveTotal}.`,
        margin: [0, 30, 0, 10]
      },
      {
        text: 'Para clareza e documento, firmo o presente recibo, dando plena e geral quitação.'
      },
      {
        text: `Data:  ${date}`, margin: [0, 20, 0, 5]
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