function docFooter(employee) {
  const docFooter = [
    {
      table: {
        widths: ['*'],
        body: [
          [
            {
              text: '__________________________________________________',
              style: 'footer',
              margin: [0, 30, 0, 0],
              border: [true, false, true, false]
            }
          ], 
          [
            {
              text: employee,
              style: 'footer',
              margin: [0, 0, 0, 20],
              border: [true, false, true, true]
            }
          ]
        ]
      }
    }
  ]

  return docFooter
}

export default docFooter
