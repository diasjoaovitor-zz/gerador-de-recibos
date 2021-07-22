import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

import Header from  '../../components/Header'
import Loader from '../../components/Loader'
import Lock from '../../components/Lock'

import feriasProporcionais from '../../documents/ferias-proporcionais'

import FormatDate from '../../helpers/format-date'

import { salaryApi } from '../../services/api'

function FeriasProporcionais() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const formatDate = new FormatDate()

  const { state } = useLocation()

  const today = formatDate.today()
  const nextDate = formatDate.endDate(today)

  const [ date, setDate ] = useState(today)
  const [ endDate, setEndDate ] = useState(nextDate)
  const [ period, setPeriod ] = useState('um mês')
  const [ salaries, setSalaries ] = useState([])
  const [ salary, setSalary ] = useState(0)
  const [ oneThird, setOneThird ] = useState(0)
  const [ netValue, setNetValue ] = useState(0)
  const [ loader, setLoader ] = useState(true)
  const [ lock, setLock ] = useState(false)

  useEffect(() => {
    !lock && (async () => {
      setLoader(true)
      try {
        const { data } = await salaryApi.get('/')

        setSalaries(data)
        const { salary } = data.find(object => object.period === formatDate.yearMonth(date))

        if(salary) {
          setSalary(salary || 0)
          setOneThird((salary / 3).toFixed(2))
          setNetValue(proportional(date, endDate, salary))
        }
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

      const endDate = formatDate.endDate(date)

      const salary = object ? object.salary : ''

      const months = formatDate.countMonths(date, endDate)

      setEndDate(endDate)
      setPeriod(formatDate.period(months))
      setSalary(salary)
      setOneThird((salary / 3).toFixed(2))
      setNetValue(proportional(date, endDate, salary))
    }
  }, [date, lock])

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
    const data = { ...state, salary, oneThird, netValue, date, endDate, period }
    
    pdfMake.createPdf(feriasProporcionais(data)).open()
  }

  function handleClick(e) {
    lock ? setLock(false) : setLock(true)
  }

  function handleEndDate(e) {
    const year = formatDate.year(date)
    const endYear = formatDate.year(e.target.value)

    if(endYear) {
      if(endYear - year <= 1) {
        setEndDate(e.target.value)
      } else {
        window.alert('O período não deve ser maior que 1 ano')
        setEndDate(formatDate.endDate(date))
      }
    }
  }

  return (
    <div className="ferias-proporcionais container">
      <form onSubmit={generate}>
        <Header pathname="/document" state={state}>
          Férias Proporcionais
        </Header>
        <fieldset>
          <fieldset>
            <legend>Período</legend>
            <label>
              <span>Início</span>
              <input 
                type="date" value={date} required 
                onChange={event => setDate(event.target.value)}
              />
            </label>
            <label>
              <span>Fim</span>
              <input 
                type="date" value={endDate} required
                onChange={handleEndDate}
              />
            </label>
            <output>{period}</output>
          </fieldset>
          <label>
            <span>Salário</span>
            <Lock lock={lock} handleClick={handleClick}>
              <input 
                type="number" value={salary} placeholder="não encontrado"
                onChange={event => setSalary(event.target.value)}
              />
            </Lock>
          </label>
          <label>
          <span>Terço de Férias</span>
          <input type="number" value={oneThird || ''} onChange={e => setOneThird(e.target.value)} />

        </label>
          <label>
            <span>Valor Líquido</span>
            <input type="number" value={netValue || ''} onChange={e => setNetValue(e.target.value)} />
        </label>
        </fieldset>

        <button>Gerar</button>
      </form>

      {loader && <Loader />}
    </div>
  )
}

export default FeriasProporcionais
