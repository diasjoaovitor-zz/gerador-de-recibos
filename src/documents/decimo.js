import docHeader from './partials/doc-header'
import docFooter from './partials/doc-footer'
import docStyles from './partials/doc-styles'

import Format from '../helpers/format'
import FormatDate from '../helpers/format-date'

function decimo(data) {
  const { salary, date, employee } = data
  const document = 'Recibo de Décimo Terceiro Salário'

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
                    text: 'Data: ',
                    style: 'label'
                  },
                  formatDate.finalDate(date)
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
                text: `Declaro que recebi a quantia líquida de ${format.currency(salary)} - ${format.extensive(salary)}, referente ao pagamento do meu décimo terceiro salário.`,
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

export default decimo
