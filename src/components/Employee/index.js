import { Link } from 'react-router-dom'

import './style.css'

function Employee(props) {
  const { 
    data,
    handleChange, handleMask, handleSubmit
  } = props

  return (
    <form id="employee">
      <h1>Gerador de Recibos</h1>
      
      <fieldset>
        <input 
          type="text" placeholder="Nome do Funcionário" required 
          name="employee" value={data.employee || ''} onChange={handleChange}
        />
        <input 
          type="text" placeholder="CPF" required 
          name="cpf" mask="xxx.xxx.xxx-xx" value={data.cpf || ''} onChange={handleMask}
        />
        <input 
          type="text" placeholder="RG" required 
          name="rg" mask="xxx.xxx.xxx-xx" value={data.rg || ''} onChange={handleMask}
        />
      </fieldset>

      <Link to="/document" onClick={handleSubmit}>
        <button>Avançar</button>
      </Link>
    </form>
  )
}

export default Employee
