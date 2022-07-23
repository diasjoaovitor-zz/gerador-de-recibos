import extenso from 'extenso'

class Format {
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
