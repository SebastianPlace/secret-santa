const csvParse = require('csv-parse')
const fs = require('fs')

const FILE_PATH = './names.csv'

function createPerson(keys, values) {
  return keys
    .reduce((acc, cur, i) => {
      const obj = { [cur]: values[i] }
      return Object.assign({}, acc, obj);
    }, {})
}

const readFile = filePath => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) { reject(err) }
    else { resolve(data) }
  })
})

const parseCSV = data => new Promise((resolve, reject) => {
  csvParse(data, {}, (err, rows) => {
    if (err) { reject(err) }
    else {
      const headers = rows[0]
      const body = rows.slice(1)
      const people = body.map(row => { return createPerson(headers, row)} )
      resolve(people);
    }
  })
})

readFile(FILE_PATH)
  .then(parseCSV.bind(this))
  .then(people => console.log(people))


// take an object, randomly select unpaired object and pair them
// what does a pair look like?
// everyone needs to be a giver
// everyone needs to be a receiver
/* 
{
  giver: personB
  receiver: personA
}
*/
