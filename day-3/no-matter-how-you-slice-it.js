const fs = require ('fs');
const path = require ('path');
const chalk = require('chalk');

// Test Variables
let samplePath = path.join(__dirname, '/sample-input');
let sampleHeight = 8;
let sampleWidth = 8;

// Final Variables
let filePath = path.join(__dirname, '/puzzle-input');
let height = 1000;
let width = 1000;

// General Variables
let idString = '';
let idsArray = [];
let canvas = [];
let designOverlapSqInches = 0;
let pointsOfOverlap = [];

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

const processElement = (element) => {
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
  structuredEl.xOffset = Number(locations[0]);
  structuredEl.yOffset = Number(locations[1].split(":")[0]);
  let designDimensions = elArray[3].split('x');
  structuredEl.designWidth = Number(designDimensions[0])
  structuredEl.desightHeight = Number(designDimensions[1])
  return structuredEl;
}

const updateCanvas = (el, canvas) => {
  /**
   * update the canvas (an single design, canvas)
   * if the canvas is empty (0s) - update with the id
   * if the canvas is not empty - update with x
   * Add 1 to designOverlapSqInches count
   */
  let structuredEl = processElement(el);

  for (let designRow = 0; designRow < structuredEl.desightHeight; designRow += 1) {
    for (let designCol = 0; designCol < structuredEl.designWidth; designCol += 1) {
      let currentRow = structuredEl.yOffset + designRow
      let currentCol = structuredEl.xOffset + designCol;
      if (canvas[currentRow][currentCol] === 0) {
        // If it's blank, mark it with the id
        canvas[currentRow][currentCol] = structuredEl.id;
      } 
      else if (canvas[currentRow][currentCol] === 'x') {
        // If it's already duplicated, move on
        continue;
      }
      else if (canvas[currentRow][currentCol] !== 0 && canvas[currentRow][currentCol] !== 'x') {
        // If it's the first time it's a duplicate, increment overlap counter
        canvas[currentRow][currentCol] = 'x';
        pointsOfOverlap.push({Row:currentRow, Col:currentCol})
        designOverlapSqInches += 1;
      }
      else {
        console.log(chalk.red('Uh oh! Unhandled case!'))
      }
    }
  }
}

// create an input array  
Promise.resolve(readPuzzleInput(filePath))
  .then(() => {
    // create canvas to mark our designs on
    return canvas = createCanvas(height, width, canvas)
  })
  .then(() => {
    // Update the canvas with our designs
    idsArray.forEach((el) => updateCanvas(el, canvas))
  })
  .then(() => {
    // Print the number of overlapping squares
    console.log(`The total overlap is --> `, designOverlapSqInches)
  });