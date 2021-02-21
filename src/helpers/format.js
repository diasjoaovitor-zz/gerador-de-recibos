import extenso from 'extenso'

class Format {
  mask(value, mask) {
    const array = [...value.replace(/\D/g, '')]
    
    const limit = mask.slice(0, value.length)[value.length - 1] !== 'x'
      ? mask.slice(0, value.length + 1)
      : mask.slice(0, value.length)

    return limit.replace(/x/g, () => array.shift() || '')
  }

  currency(value) {
    return Intl.NumberFormat('pt-br', {
      style: 'currency', currency: 'BRL'
    }).format(value)   
  }

  extensive(value) {
    value = String(value)
    value = value.includes('.') ? value.replace('.', ',') : value
    
    const sentence = extenso(value, { mode: 'currency' })
    
    return sentence.slice(0, 3) === 'mil' ? `um ${sentence}` : sentence
  }
}

export default Format
