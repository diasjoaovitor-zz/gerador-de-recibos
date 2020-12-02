import scrape from 'scrape-it'
import Format from './format.js'

class Controller {
  async data(req, res) {
    try {
      const { yearMonth } = req.params
      const { data } = await scrape('http://www.ipeadata.gov.br/exibeserie.aspx?stub=1&serid1739471028=1739471028', {
        table: 'table'
      })

      const format = new Format(data)
      const response = format.response()
      const result = response.find(({ period }) => period === yearMonth)

      return res.status(200).json(result)
      
    } catch (error) {
      return res.status(400).json({
        msg: 'Request error',
        error: error
      })
    }
  }

  create(req, res) {
    try {
     const document = req.body

      return res.status(200).json(document)
    } catch (error) {
      return res.status(400).json({
        msg: 'Create error',
        error: error
      })
    }    
  }
}

export default Controller