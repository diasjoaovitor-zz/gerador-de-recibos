class Format {
  constructor(data) {
    this.data = data
    
    this.string = this.init()
    this.periods = this.getPeriods()
    this.salaries = this.getSalaries()
  }

  init() {
    const { table } = this.data

    const data = table.match(/[\d]{4}.+\,00/g)

    return data
  }

  number(value) {
    const number = value.replace('.', '').replace(/,00/g, '')

    return number
  }

  getPeriods() {
    const periods = this.string.map(string => string.slice(0, 7).replace('.', '-'))

    return periods.reverse()
  }

  getSalaries() {
    const salaries = this.string.map(string => this.number(string.slice(-(string.length - 7))))

    return salaries.reverse()
  }
  
  response() {
    const data = []

    this.periods.forEach((period, index) => {
      data.push({ period, salary: this.salaries[index] })
    })
    
    return data
  }
}

export default Format