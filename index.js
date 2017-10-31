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

function matchPeople(people) {
  const INITIAL_OBJ = {
    santas: [],
    receivers: []
  }

  const group1 = people.reduce((group, person, i) => {
    if(i % 2 === 0) {
      return  [...group, ...[person]];
    }
    return group;
  }, [])

  const group2 = people.reduce((group, person, i) => {
    if(i % 2 !== 0) {
      return  [...group, ...[person]];
    }
    return group;
  }, [])

  console.log(group1, group2)
  // people
  //   .reduce((acc, cur) => {
  //     return {acc.santas = 
  //   }, INITIAL_OBJ)  
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
      const people = body.map(createPerson.bind(this, headers))
      
      resolve(people);
    }
  })
})

const handleError = (error) => {
  console.error(error);
}

readFile(FILE_PATH)
  .then(parseCSV)
  .then(matchPeople)
  .catch(handleError)


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
