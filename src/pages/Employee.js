import { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import Header from '../components/Header'

import Format from '../helpers/format'

function Employee() {
  const format = new Format()

  const { state } = useLocation()

  const history = useHistory()

  const [ data, setData ] = useState({ ...state })

  function handleChange(e) {
    setData({ ...data, [ e.target.name ]: e.target.value })
  }

  function handleMask(e) {
    const { target: { name, value, attributes: { mask } } } = e

    setData({ ...data, [ name ]: format.mask(value, mask.value) })
  }

  function handleSubmit() {
    history.push('/document', data)
  }

  return (
    <div className="employee container">
      <form onSubmit={handleSubmit}>
        <Header pathname="/" state={data}>
          Gerador de Recibos
        </Header>

        <fieldset>
          <label>
            <span>Nome do Funcionário</span>
            <input
              type="text" name="employee"
              required autoFocus={true}
              value={data.employee || ''} onChange={handleChange}
            />
          </label>
          <label>
            <span>CPF</span>
            <input
              type="text" name="cpf"
              mask="xxx.xxx.xxx-xx" 
              value={data.cpf || ''} onChange={handleMask}
            />
          </label>
          <label>
            <span>RG</span>
            <input
              type="text" name="rg"
              mask="xx.xxx.xxx-xx" 
              value={data.rg || ''} onChange={handleMask}
            />
          </label>   
        </fieldset>

        <button>Avançar</button>
      </form>
    </div>
  )
}

export default Employee
