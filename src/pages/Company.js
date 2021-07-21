import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import Format from '../helpers/format'

import { ibjeApi } from   '../services/api'

function Company() {
  const format = new Format()

  const storage = JSON.parse(localStorage.getItem('data')) || {}

  const location = useLocation()

  const history = useHistory()

  const [ data, setData ] = useState({ ...storage, ...location.state })
  const [ states, setStates ] = useState([])
  const [ state, setState ] = useState(storage.state)
  const [ cities, setCities ] = useState([])

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

  function save() {
    localStorage.setItem('data', JSON.stringify(data))
  }

  function handleChange(e) {
    setData({ ...data, [ e.target.name ]: e.target.value })
  }

  function handleMask(e) {
    const { target: { name, value, attributes: { mask } } } = e

    setData({ ...data, [ name ]: format.mask(value, mask.value) })
  }
  
  function handleState(event) {
    const state = event.target.value
    setState(state)
    setData({ ...data, state })
  }
  
  function handleSubmit() {
    save()
    history.push('/employee', data)
  }

  return (
    <div className="company container">
      <form onSubmit={handleSubmit}>
        <h1>Gerador de Recibos</h1>
        
        <fieldset>
        <label>
            <span>Nome da Empresa</span>
            <input 
              type="text" name="company" required autoFocus
              value={data.company || ''} onChange={handleChange}
            />
          </label>
          <label>
            <span>CNPJ</span>
            <input 
              type="text" name="cnpj" required 
              mask="xx.xxx.xxx/xxxx-xx" value={data.cnpj || ''} 
              onChange={handleMask}
            />
          </label>
          <label>
            <span>Telefone</span>
            <input 
              type="tel" name="tel" required 
              mask="(xx) xxxx-xxxx" value={data.tel || ''} 
              onChange={handleMask}
            />
          </label>
          <fieldset>
            <legend>Endereço</legend>
            <label>
              <span>Logradouro</span>
              <input 
              type="text" name="street" required 
              value={data.street || ''} onChange={handleChange}
            />
            </label>
            <label>
              <span>Número</span>
              <input 
              type="number" name="number" required 
              value={data.number || ''} onChange={handleChange}
            />
            </label>
            <label>
              <span>Bairro</span>
              <input 
                type="text" name="district" required 
                value={data.district || ''} onChange={handleChange}
              />
            </label>
            <select onChange={handleState} value={data.state || ''}>
              <option>Estado</option>
              {states.map(({ id, sigla, nome }) => (
                <option key={id} value={sigla}>{nome}</option>
              ))}
            </select>
            
            <select name="city" value={!data.city ? storage.city || '' : data.city}
            onChange={handleChange} disabled={!state ? true : false}>
              <option>Cidade</option>
              {cities.map(({ id, sigla, nome }) => (
                <option key={id} value={sigla}>{nome}</option>
              ))}
            </select>     
          </fieldset>
        </fieldset>

        <button>Avançar</button>
      </form>
    </div>
  )
}

export default Company
