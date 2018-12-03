const fs = require ('fs');
const path = require ('path');

let filePath = path.join(__dirname, '/puzzle-input');
let samplePath = path.join(__dirname, '/sample-input');
let idString = '';
let idsArray = [];
let canvas = [];
let designOverlapSqInches = 0;

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
};

const createCanvas = (height, width, canvas) => {
  while (canvas.length < height) {
    let row = []
    while (row.length < width) {
      row.push(0)
    }
    canvas.push(row)
  }
  return canvas
}

// create input array
readPuzzleInput(samplePath)
  .then((canvas) => {
    // create canvas
    let height = 1000;
    let width = 1000;
    createCanvas(height, width, canvas)
  })
  // for each element
  .then((idsArray) => {
    idsArray.forEach(updateCanvas(el, canvas))
    })

const processElement = (element) => {
  debugger;
  let elArray = element.split(' ');
  let structuredEl = {
    id: 0,
    xOffset: 0,
    yOffset: 0,
    designWidth: 0,
    desightHeight: 0,
  }
  structuredEl.id = elArray[0].replace('#','');
  let locations = elArray[2].split(',');
  structuredEl.xOffset = locations[0];
  structuredEl.yOffset = locations[1];
  let designDimensions = elArray[3].split('x');
  structuredEl.designWidth = designDimensions[0]
  structuredEl.desightHeight = designDimensions[1]
  return structuredEl;
}

const updateCanvas = (el, canvas) => {
  processElement(el)
  // update the canvas (an single design, canvas)
    // if the canvas is empty (0s) - update with the id
    // if the canvas is not empty - update with x
      // add 1 to designOverlapSqInches count
}

console.log(processElement('#1 @ 1,3: 4x4'));

  
// return overall count

// debugger;
// let test = new Array(new Array(3), new Array(3), new Array(3));
// console.log(`The test is --> `, test)

debugger;

console.log(`The canvas is now --> `, canvas)

