import extenso from 'extenso'

export default class Format {
  rg(value) {
    const array = [...value.replace(/\D/g, '')]
    const mask = 'xx.xxx.xxx-xx'
    const limit = mask.slice(0, value.length)[value.length - 1] !== 'x'
      ? mask.slice(0, value.length + 1)
      : mask.slice(0, value.length)

    return limit.replace(/x/g, () => array.shift() || '')
  }

  date(date) {
    const array = date.split('-')

    const [ year, month, day ] = array

    const d = new Date(year, month - 1, day)

    return d.toLocaleDateString('pt-br')
  }

  currency(value) {
    return Intl.NumberFormat('pt-br', {
      style: 'currency', currency: 'BRL'
    }).format(value)   
  }

  extensive(value) {
    value = Number(value).toFixed(2)
    const sentence = extenso(String(value).replace('.', ','), { mode: 'currency' })
    
    return sentence.slice(0, 3) === 'mil' ? 'um ' + sentence : sentence
  }

  zero(value) {
    return value < 10 ? `0${value}` : value
  }

  lastOccurrence(sentence) {
    sentence = sentence.split('').reverse().join('')

    return sentence.replace(',', 'e ').split('').reverse().join('')
  }
}
