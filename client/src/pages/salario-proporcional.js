import { useState } from 'react'
import { Link } from 'react-router-dom'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

import Footer from '../components/footer'

import API from '../api'
import Period from '../helpers/period'
import Format from '../helpers/format'

export default function Salario() {
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
    
    const year = date.slice(0, 4)

    const data = {
      document: 'decimo-proporcional', 
      name, RG, year, salary, period, date,
    }

    await api.create(data)

    const months = period.split(',').length

    const value = (salary / 12) * months

    pdfMake.createPdf(
      document(
        name, RG, format.currency(salary), year, 
        format.lastOccurrence(period), format.currency(value), 
        format.extensive(value), format.zero(months), format.date(date)
      )
    ).open()
  }

  return (
    <div className="document">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <header>
            <h1>Recibo de Salário Proporcional</h1>
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
              type="text" placeholder="janeiro, fevereiro, março"
              onChange={event => setPeriod(event.target.value)} 
            />
          </fieldset>

          <fieldset>
            <legend>Data</legend>
            <input 
              type="date" 
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

function document(name, RG, salary, year, period, value, extensive, months, date) {
  const docDefinition = {
    content: [
      {
        text: 'Recibo de Salário Proporcional',
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
        text: `Salario base:  ${salary}`, margin: [0, 5]
      },
      {
        text: `Ano: ${year}`
      },
      {
        text: `Meses: ${period}`, margin: [0, 5]
      },
      {
        text: `Recebi da empresa João Pedro Ferreira dos Santos, estabelecida na Praça do Mercado, 190, em Poções – BA, no ano de ${year}, a importação de ${value} – ${extensive}, proporcional a ${months} meses a qual prestei serviço e dou o meu ciente. `,
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