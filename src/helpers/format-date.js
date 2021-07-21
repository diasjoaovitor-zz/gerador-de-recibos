class FormatDate {
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

  today() {
    const { year, month, day } = this.date()

    return `${year}-${month}-${day}`
  }

  endDate(date) {
    const [ year, month, day ] = date.split('-')

    let nextMonth = Number(month) + 1
    let nextYear = year

    if(nextMonth > 12) {
      nextMonth = 1
      nextYear++
    }
    
    return `${nextYear}-${this.format(nextMonth)}-${day}`
  }

  finalDate(date) {
    const [ year, month, day ] = date.split('-')

    return `${day}/${month}/${year}`
  }

  yearMonth(date) {
    const yearMonth = date.slice(0, 7)

    return yearMonth
  }

  year(date) {
    const year = date.slice(0, 4)

    return year
  }

  countMonths(initial, final) {
    initial = initial.slice(5, 7)
    final = final.slice(5, 7)

    if(initial > final)
      return initial - (initial - final)

    if(initial === final)
      return 12

    return final - initial
  }

  period(value) {
    const sentence = ['menos de um mês', 'um mês', 'dois meses', 'três meses', 'quatro meses', 'cinco meses', 'seis meses', 'sete meses', 'oito meses', 'nove meses', 'dez meses', 'onze meses', 'doze meses']

    return sentence[value]
  }
}

export default FormatDate
