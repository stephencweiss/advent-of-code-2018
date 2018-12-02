const fs = require ('fs');
const path = require ('path');

let idString = '';
let idsArray = [];

const readPuzzleInput = (file) => {
  // I: A file with sample data
  // O: An array of numbers
  let readStream = fs.createReadStream(file, {encoding:'utf8'});

  readStream
    .on('data', function processChunk(chunk) {
      idString += chunk;
    })
    .on('end', () => { 
      idsArray = idString.split('\n')
      console.log(`The idsArray is --> `, idsArray)
    })
}

let filePath = path.join(__dirname, '/puzzle-input')
readPuzzleInput(filePath)