import axios from 'axios'

const salaryApi = axios.create({ baseURL: 'https://salariominimo.herokuapp.com' })

const ibjeApi = axios.create({ baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades' })

export { salaryApi, ibjeApi }

