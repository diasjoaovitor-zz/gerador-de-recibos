export default class Period {
  format(value) {
    return value < 10 ? `0${value}` : value
  }

  date() {
    const date = new Date()

    const year = date.getFullYear()
    const month = this.format(date.getMonth() + 1)
    const day = this.format(date.getDate())

    return { year, month, day }
  }

  start() {
    const { year, month, day } = this.date()

    return `${year}-${month}-${day}`
  }

  end() {
    const { year, month, day } = this.date()

    let nextYear = year
    let nextMonth = month

    if(month + 1 > 12) {
      nextMonth = `01`
      String(nextYear++)
    } 

    return `${nextYear}-${nextMonth}-${day}`
  }
}
