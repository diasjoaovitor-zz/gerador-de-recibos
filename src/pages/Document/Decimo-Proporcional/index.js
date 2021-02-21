import { useState, useEffect } from 'react'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

import decimoProporcional from '../../../documents/decimo-proporcional'

import FormatDate from '../../../helpers/format-date'

import { salaryApi } from '../../../services/api'

import './style.css'

function DecimoProporcional() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const formatDate = new FormatDate()

  const today = formatDate.today()

  const storage = JSON.parse(localStorage.getItem('data')) || {}

  const [ date, setDate ] = useState(today)
  const [ endDate, setEndDate ] = useState(formatDate.endDate(today))
  const [ period, setPeriod ] = useState('um mês')
  const [ salary, setSalary ] = useState(storage.salary)
  const [ netValue, setNetValue ] = useState(proportional())

  useEffect(() => {
    (async () => {
      const { data: { salary } } = await salaryApi.get(`/show/${formatDate.yearMonth(date)}`)

      setEndDate(formatDate.endDate(date))
      setPeriod('um mês')
      setSalary(salary)
      setNetValue(proportional())
    })()
  }, [date])

  useEffect(() => {
    const months = formatDate.countMonths(date, endDate)

    setPeriod(formatDate.period(months))
    setNetValue(proportional())
  }, [endDate])

  useEffect(() => {
    setNetValue(proportional())
  }, [salary])

  function proportional() {
    const months = formatDate.countMonths(date, endDate)

    return (salary / 12 * months).toFixed(2)
  }

  function generate(event) {
    event.preventDefault()

    const data = { ...storage, date, endDate, period, salary, netValue }
    
    pdfMake.createPdf(decimoProporcional(data)).open()
  }

  return (
    <form id="decimo-proporcional" onSubmit={generate}>
      <h1>Recibo de Décimo Terceiro Salário Proporcional</h1>

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
          <span>Valor Líquido</span>
          <output>{netValue}</output>
        </label>
      </fieldset>

      <button>Gerar</button>
    </form>
  )
}

export default DecimoProporcional
