import './style.css'

function Company(props) {
  const { 
    data, states, state, cities, 
    handleChange, handleMask, handleState, handleSubmit
  } = props

  return (
    <form id="company" onSubmit={handleSubmit}>
      <h1>Gerador de Recibos</h1>
      
      <fieldset>
        <input 
          type="text" placeholder="Nome da Empresa" required 
          name="company" value={data.company || ''} onChange={handleChange}
        />
        <input 
          type="text" placeholder="CNPJ" required 
          name="cnpj" mask="xx.xxx.xxx/xxxx-xx" value={data.cnpj || ''} onChange={handleMask}
        />
        <input 
          type="tel" placeholder="Telefone" required 
          name="tel" mask="xxxx-xxxx" value={data.tel || ''} onChange={handleMask}
        />

        <fieldset>
          <legend>Endereço</legend>

          <input 
            type="text" placeholder="Logradouro" required 
            name="street" value={data.street || ''} onChange={handleChange}
          />
          <input 
            type="number" placeholder="Número" required 
            name="number" value={data.number || ''} onChange={handleChange}
          />
          <input 
            type="text" placeholder="Bairro" required 
            name="district" value={data.district || ''} onChange={handleChange}
          />

          <select onChange={handleState}>
            <option>Estado</option>
            {states.map(({ id, sigla, nome }) => (
              <option key={id} value={sigla}>{nome}</option>
            ))}
          </select>
          
          <select name="city"
          onChange={handleChange} disabled={state === '' ? true : false}>
            <option>Cidade</option>
            {cities.map(({ id, sigla, nome }) => (
              <option key={id} value={sigla}>{nome}</option>
            ))}
          </select>
        </fieldset>
      </fieldset>

      <button>Avançar</button>
    </form>
  )
}

export default Company
