import { useState, useEffect } from 'react'

import Company from '../components/Company'
import Employee from '../components/Employee'

import FormatDate from '../helpers/format-date'
import Format from '../helpers/format'

import { salaryApi, ibjeApi } from '../services/api'

function Index() {
  const formatDate = new FormatDate()
  const format = new Format()

  const storage = JSON.parse(localStorage.getItem('data')) || {}

  const [ component, setComponent ] = useState('company')
  const [ data, setData ] = useState(storage)
  const [ states, setStates ] = useState([])
  const [ state, setState ] = useState('')
  const [ cities, setCities ] = useState([])
  
  useEffect(() => {
    (async () => {
      try {
        const { data: { salary } } = await salaryApi.get(`/show/${formatDate.yearMonth(formatDate.today())}`)

        setData({ ...data, salary })
      } catch (error) {
        setData({ ...data, salary: 0 })
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const { data } = await ibjeApi.get('/estados')

        setStates(data.sort((a, b)=> a.nome.localeCompare(b.nome)))
      } catch (error) {
        window.alert('Erro! Tente atualizar a página')
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const { data } = await ibjeApi.get(`/estados/${state}/municipios`)

        setCities(data.sort((a, b)=> a.nome.localeCompare(b.nome)))
      } catch (error) {
        window.alert('Erro! Tente atualizar a página')
      }
    })()
  }, [state])

  
  function handleChange(event) {
    setData({ ...data, [ event.target.name ]: event.target.value })
  }

  function handleMask(event) {
    const { target: { name, value, attributes: { mask } } } = event

    setData({ ...data, [ name ]: format.mask(value, mask.value) })
  }

  function handleState(event) {
    const state = event.target.value
    setState(state)
    setData({ ...data, state })
  }

  function save() {
    localStorage.setItem('data', JSON.stringify(data))
  }

  if(component === 'company')
    return (
      <Company 
        data={data} states={states} state={state} cities={cities}
        handleChange={handleChange} handleMask={handleMask} handleState={handleState}
        handleSubmit={() => { 
          setComponent('employee')
          save()
        }}
      />
    )
  
  if(component === 'employee')
    return (
      <Employee 
        data={data} 
        handleChange={handleChange} handleMask={handleMask} handleSubmit={save}
      />
    )
}

export default Index
