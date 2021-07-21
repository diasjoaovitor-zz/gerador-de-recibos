import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

import Header from  '../../components/Header'
import Loader from '../../components/Loader'
import Lock from '../../components/Lock'

import decimo from '../../documents/decimo'

import FormatDate from '../../helpers/format-date'

import { salaryApi } from '../../services/api'

function Decimo() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const formatDate = new FormatDate()

  const { state } = useLocation()

  const [ date, setDate ] = useState(formatDate.today())
  const [ salaries, setSalaries ] = useState([])
  const [ salary, setSalary ] = useState(0)
  const [ loader, setLoader ] = useState(true)
  const [ lock, setLock ] = useState(false)

  useEffect(() => {
    !lock && (async () => {
      setLoader(true)
      try {
        const { data } = await salaryApi.get('/')

        setSalaries(data)
        const { salary } = data.find(object => object.period === formatDate.yearMonth(date))
        setSalary(salary || 0)
      } catch (error) {
        window.alert('Não foi possível encontrar os valores do salário mínimo')
        setSalary(salary || 0)
      }
      setLoader(false)
    })()
  }, [])

  useEffect(() => {
    if(!lock && loader === false) {
      const object = salaries.find(object => object.period === formatDate.yearMonth(date))

      object ? setSalary(object.salary) : setSalary('')
    }
  }, [date, lock])

  function generate(event) {
    event.preventDefault()

    const data = { ...state, date, salary }
    
    pdfMake.createPdf(decimo(data)).open()
  }

  function handleClick(e) {
    lock ? setLock(false) : setLock(true)
  }

  return (
    <div className="decimo container">
      <form onSubmit={generate}>
        <Header pathname="/document" state={state}>
          Recibo de Décimo Terceiro Salário
        </Header>
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
            <Lock lock={lock} handleClick={handleClick}>
              <input 
                type="number" value={salary} placeholder="não encontrado"
                onChange={event => setSalary(event.target.value)}
              />
            </Lock>
          </label>
        </fieldset>

        <button>Gerar</button>
      </form>

      {loader && <Loader />}
    </div>
  )
}

export default Decimo
