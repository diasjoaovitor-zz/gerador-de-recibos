import { useState, useEffect } from 'react'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

import salario from '../../../documents/salario'

import FormatDate from '../../../helpers/format-date'

import { salaryApi } from '../../../services/api'

import './style.css'

function Salario() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const formatDate = new FormatDate()

  const storage = JSON.parse(localStorage.getItem('data')) || {}

  const [ date, setDate ] = useState(formatDate.today())
  const [ salary, setSalary ] = useState(storage.salary)

  useEffect(() => {
    (async () => {
      const { data: { salary } } = await salaryApi.get(`/show/${formatDate.yearMonth(date)}`)

      setSalary(salary)
    })()
  }, [date])

  function generate(event) {
    event.preventDefault()

    const data = { ...storage, date, salary }
    
    pdfMake.createPdf(salario(data)).open()
  }

  return (
    <form id="salario" onSubmit={generate}>
      <h1>Recibo de Salário</h1>

      <fieldset>
        <label>
          <span>Data</span>
          <input 
            type="date" value={date} required 
            onChange={event => setDate(event.target.value)}
          />
        </label>
        <label>
          <span>Salário</span>
          <input 
            type="number" value={salary}
            onChange={event => setSalary(event.target.value)}
          />
        </label>
      </fieldset>

      <button>Gerar</button>
    </form>
  )
}

export default Salario
