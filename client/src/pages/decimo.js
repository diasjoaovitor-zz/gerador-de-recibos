import { useState } from 'react'
import { Link } from 'react-router-dom'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

import Footer from '../components/footer'

import API from '../api'
import Period from '../helpers/period'
import Format from '../helpers/format'

export default function Decimo() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const period = new Period()
  const format = new Format()

  const [ name, setName ] = useState([])
  const [ RG, setRG ] = useState([])
  const [ date, setDate ] = useState(period.start())

  const handleSubmit = async event => {
    event.preventDefault()

    const api = new API()

    const yearMonth = date.slice(0, 7)
    const { salary } = await api.data(yearMonth)

    const year = date.slice(0, 4)

    const data = {
      document: 'decimo', 
      name, RG, year, salary, date
    }

    await api.create(data)

    pdfMake.createPdf(
      document(
        name, RG, year, format.currency(salary), 
        format.extensive(salary), format.date(date)
      )
    ).open()
  }

  return (
    <div className="document">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <header>
            <h1>Recibo de Décimo Terceiro Salário</h1>
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

function document(name, RG, year, salary, extensive, date) {
  const docDefinition = {
    content: [
      {
        text: 'Recibo de Décimo Terceiro Salário',
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
        text: `   Recebi da empresa João Pedro Ferreira dos Santos, estabelecida na Praça do Mercado, 190, em Poções – BA, no ano de ${year}, o valor integral de ${salary} – ${extensive}.`,
        margin: [0, 30, 0, 10]
      },
      {
        text: '   Para clareza e documento, firmo o presente recibo, dando plena e geral quitação.'
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