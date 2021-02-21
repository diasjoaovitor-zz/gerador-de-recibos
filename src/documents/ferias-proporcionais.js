import docHeader from './partials/doc-header'
import docFooter from './partials/doc-footer'
import docStyles from './partials/doc-styles'

import Format from '../helpers/format'
import FormatDate from '../helpers/format-date'

function feriasProporcionais(data) {
  const { salary, oneThird, netValue, date, endDate, period, employee } = data
  const document = 'Recibo de Férias Proporcionais'

  const format = new Format()
  const formatDate = new FormatDate()

  const docDefinition = {
    content: [
      ...docHeader({ ...data, document }), 
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                text: [
                  {
                    text: 'Salário: ',
                    style: 'label'
                  },
                  format.currency(salary)
                ],
                border: [true, false, true, true]
              },
              {
                text: [
                  {
                    text: 'Terço de Férias: ',
                    style: 'label'
                  },
                  format.currency(oneThird)
                ],
                border: [true, false, true, true]
              }
            ]
          ]
        }
      },
      {
        table: {
          widths: ['*', '*'],
          body: [
            [ 
              {
                text: [
                  {
                    text: 'Valor Líquido: ',
                    style: 'label'
                  },
                  format.currency(netValue)
                ],
                border: [true, false, true, true]
              },
              {
                text: [
                  {
                    text: 'Periodo: ',
                    style: 'label'
                  },
                  `${formatDate.finalDate(date)} a ${formatDate.finalDate(endDate)}`
                ],
                border: [true, false, true, true]
              }
            ]
          ]
        }
      },
      {
        table: {
          widths: ['*'],
          body: [
            [
              {
                text: `Declaro que recebi a quantia líquida de ${format.currency(netValue)} - ${format.extensive(netValue)}, referente ao pagamento das minhas férias, proporcionais a ${period}.`,
                margin: [10, 10, 10, 2],
                border: [true, false, true, false]
              }
            ],
            [
              {
                text: 'Para clareza e documento, firmo o presente recibo, dando plena e geral quitação.',
                margin: [10, 0, 10, 10],
                border: [true, false, true, false]
              }
            ]
          ]
        }
      },
      ...docFooter(employee)
    ],
    ...docStyles
  }

  return docDefinition
}

export default feriasProporcionais
