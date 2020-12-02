import axios from 'axios'

export default class API {
  constructor() {
    this.api = axios.create({
      baseURL:  '/api'
    })
  }

  async data(yearMonth) {
    const { data } = await this.api.get(`/${yearMonth}`)

    return data
  }

  async create(document) {
    const { data } = await this.api.post('/', document)
    
    return data
  }
}