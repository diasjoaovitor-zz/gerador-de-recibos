import { useState, useEffect } from 'react'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

import feriasProporcionais from '../../../documents/ferias-proporcionais'

import FormatDate from '../../../helpers/format-date'

import { salaryApi } from '../../../services/api'

import './style.css'

function FeriasProporcionais() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const formatDate = new FormatDate()

  const today = formatDate.today()

  const storage = JSON.parse(localStorage.getItem('data')) || {}

  const [ date, setDate ] = useState(today)
  const [ endDate, setEndDate ] = useState(formatDate.endDate(today))
  const [ period, setPeriod ] = useState('um mês')
  const [ salary, setSalary ] = useState(storage.salary)
  const [ oneThird, setOneThird ] = useState((storage.salary / 3).toFixed(2))
  const [ netValue, setNetValue ] = useState(proportional())

  useEffect(() => {
    (async () => {
      const { data: { salary } } = await salaryApi.get(`/show/${formatDate.yearMonth(date)}`)

      setEndDate(formatDate.endDate(date))
      setPeriod('um mês')
      setSalary(salary)
      setOneThird((salary / 3).toFixed(2))
      setNetValue(proportional())
    })()
  }, [date])

  useEffect(() => {
    const months = formatDate.countMonths(date, endDate)

    setPeriod(formatDate.period(months))
    setNetValue(proportional())
  }, [endDate])

  useEffect(() => {
    setOneThird((salary / 3).toFixed(2))
    setNetValue(proportional())
  }, [salary])

  function proportional() {
    const months = formatDate.countMonths(date, endDate)

    const netValue = salary / 12 * months + salary / 3

    return netValue.toFixed(2)
  }

  function generate(event) {
    event.preventDefault()

    const data = { ...storage, date, endDate, period, salary, oneThird, netValue }
    
    pdfMake.createPdf(feriasProporcionais(data)).open()
  }

  return (
    <form id="ferias-proporcionais" onSubmit={generate}>
      <h1>Recibo de Férias Proporcionais</h1>

      <fieldset>
        <fieldset>
          <legend>Periodo</legend>
          <input 
            type="date" value={date} required 
            onChange={event => setDate(event.target.proportional)}
          />
          <input 
            type="date" value={endDate} required 
            onChange={event => setEndDate(event.target.proportional)}
          />
          <output>{period}</output>
        </fieldset>
        <label>
          <span>Salário</span>
          <input 
            type="number" value={salary}
            onChange={event => setSalary(event.target.proportional)}
          />
        </label>
        <label>
          <span>Terço de Férias</span>
          <output>{oneThird}</output>
        </label>
        <label>
          <span>Valor Líquido</span>
          <output>{netValue}</output>
        </label>
      </fieldset>

      <button>Gerar</button>
    </form>
  )
}

export default FeriasProporcionais
