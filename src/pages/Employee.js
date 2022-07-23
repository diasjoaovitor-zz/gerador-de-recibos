import { useState } from 'react'
import NumberFormat from 'react-number-format'
import { useLocation, useHistory } from 'react-router-dom'

import Header from '../components/Header'

function Employee() {
  const { state } = useLocation()

  const history = useHistory()

  const [ data, setData ] = useState({ ...state })

  function handleChange(e) {
    setData({ ...data, [ e.target.name ]: e.target.value })
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
            <NumberFormat
              format="###.###.###-##" allowEmptyFormatting mask="_" required 
              name="cpf" value={data.cpf || ''} onChange={handleChange}
            />
          </label>
          <label>
            <span>RG</span>
            <NumberFormat
              format="##.###.###-##" allowEmptyFormatting mask="_" required 
              name="rg" value={data.rg || ''} onChange={handleChange}
            />
          </label>   
        </fieldset>

        <button>Avançar</button>
      </form>
    </div>
  )
}

export default Employee
