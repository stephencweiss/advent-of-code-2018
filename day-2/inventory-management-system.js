const fs = require ('fs');
const path = require ('path');

let idString = '';
let idsArray = [];

const readPuzzleInput = (file) => {
  // I: A file with sample data
  // O: An array of numbers
  return new Promise ((resolve, reject) => {

    let readStream = fs.createReadStream(file, {encoding:'utf8'});
    
    readStream
    .on('data', function processChunk(chunk) {
      idString += chunk;
    })
    .on('end', () => { 
      idsArray = idString.split('\n')
      resolve(idsArray)
    })
  })
}

let filePath = path.join(__dirname, '/puzzle-input')
Promise.resolve(readPuzzleInput(filePath))
  .then((idsArray) => console.log('resolved -->', idsArray ))

// for each element in an array,
// find the counts of twos and threes
// call check sum

const findRepeatingLetters = (string) => {

}

const calcCheckSum = (obj) => {
  let reducer = (accumulator, currentValue) => {return accumulator * currentValue}
  return reducedData = Object.values(obj).reduce(reducer)
}

let sample = {
  twos: 3,
  threes: 4
}

console.log(`The checkSum is --> `,calcCheckSum(sample));
