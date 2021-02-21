import { useState, useEffect } from 'react'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

import ferias from '../../../documents/ferias'

import FormatDate from '../../../helpers/format-date'

import { salaryApi } from '../../../services/api'

import './style.css'

function Ferias() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const formatDate = new FormatDate()

  const today = formatDate.today()

  const storage = JSON.parse(localStorage.getItem('data')) || {}

  const [ date, setDate ] = useState(today)
  const [ endDate, setEndDate ] = useState(formatDate.endDate(today))
  const [ salary, setSalary ] = useState(storage.salary)
  const [ oneThird, setOneThird ] = useState((storage.salary / 3).toFixed(2))
  const [ netValue, setNetValue ] = useState((storage.salary + storage.salary / 3).toFixed(2))

  useEffect(() => {
    (async () => {
      const { data: { salary } } = await salaryApi.get(`/show/${formatDate.yearMonth(date)}`)

      setEndDate(formatDate.endDate(date))
      setSalary(salary)
      setOneThird((salary / 3).toFixed(2))
      setNetValue(value())
    })()
  }, [date])

  useEffect(() => {
    setOneThird((salary / 3).toFixed(2))
    setNetValue(value())
  }, [salary])

  function value() {
    const netValue = Number(salary) + salary / 3

    return netValue.toFixed(2)
  }

  function generate(event) {
    event.preventDefault()

    const data = { ...storage, date, endDate, salary, oneThird, netValue }
    
    pdfMake.createPdf(ferias(data)).open()
  }

  return (
    <form id="ferias" onSubmit={generate}>
      <h1>Recibo de Férias</h1>

      <fieldset>
        <fieldset>
          <legend>Periodo</legend>
          <input 
            type="date" value={date} required 
            onChange={event => setDate(event.target.value)}
          />
          <input type="date" value={endDate} required readOnly />
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

export default Ferias
