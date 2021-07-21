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
  const nextDate = formatDate.endDate(today)

  const storage = JSON.parse(localStorage.getItem('data')) || {}

  const [ date, setDate ] = useState(today)
  const [ endDate, setEndDate ] = useState(nextDate)
  const [ period, setPeriod ] = useState('um mês')
  const [ salary, setSalary ] = useState(storage.salary)
  const [ oneThird, setOneThird ] = useState((storage.salary / 3).toFixed(2))
  const [ netValue, setNetValue ] = useState(proportional(today, nextDate, date.salary))

  useEffect(() => {
    (async () => {
      const { data: { salary } } = await salaryApi.get(`/show/${formatDate.yearMonth(date)}`)
      
      const endDate = formatDate.endDate(date)

      setEndDate(endDate)
      setPeriod('um mês')
      setSalary(salary)
      setOneThird((salary / 3).toFixed(2))
      setNetValue(proportional(date, endDate, salary))
    })()
  }, [date])

  useEffect(() => {
    const months = formatDate.countMonths(date, endDate)

    setPeriod(formatDate.period(months))
    setNetValue(proportional(date, endDate, salary))
  }, [endDate])

  useEffect(() => {
    setOneThird((salary / 3).toFixed(2))
    setNetValue(proportional(date, endDate, salary))
  }, [salary])

  function proportional(date, endDate, salary) {
    if(!date || !endDate)
      return

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
            onChange={event => setDate(event.target.value)}
          />
          <input 
            type="date" value={endDate} required 
            onChange={event => setEndDate(event.target.value)}
          />
          <output>{period}</output>
        </fieldset>
        <label>
          <span>Salário</span>
          <input 
            type="number" value={salary}
            onChange={event => setSalary(event.target.value)}
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
