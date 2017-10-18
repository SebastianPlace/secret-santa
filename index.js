const csvParse = require('csv-parse')
const fs = require('fs')

const FILE_PATH = './names.csv'

function createPerson(headers, row) {
  return headers
    .reduce((acc, cur, i) => {
      const obj = {
        [cur]: row[i]
      }
      return Object.assign({}, acc, obj);
    }, {})
}

fs.readFile(FILE_PATH, 'utf8', (err, data) => {
  if (err) { return console.error(err) }

  csvParse(data, {}, (err, rows) => {
    if (err) { return console.error(err) }
    const headers = rows[0]
    const body = rows.slice(1)
    const people = body.map(row => { return createPerson(headers, row)} )
    console.log(people)
    // take an object, randomly select unpaired object and pair them
    // what does a pair look like?
    /* 
    {
      santa: personB
      receiver: personA
    }
    */
  })
})