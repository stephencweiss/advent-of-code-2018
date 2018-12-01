const fs = require ('fs');

const setFrequencyInputs = (file) => {
  // I: A file with sample data
  // O: An array of numbers
  let inputs = '';
  let readStream = fs.createReadStream(__dirname + '/puzzle-input', {encoding:'utf8'});

  readStream
    .on('data', function processChunk(chunk) {
      inputs += chunk;
    })
    .on('end', () => { 
      let inputsAsArray = createArray(inputs);
      console.log(`The offset is ${findOffset(inputsAsArray)}`);
      console.log(`The firstRepeat is ${findFirstRepeat(inputsAsArray)}`);
    })
}

const createArray = (data) => {
  return data.split('\n').map(el => Number(el))
}

const findOffset = (array) => {
  let reducer = (accumulator, currentValue) => {return accumulator + currentValue}
  return reducedData = array.reduce(reducer)
}

const findFirstRepeat = (array) => {
  debugger;
  let currentIndex = 0;
  let count = 0;
  let currentFrequency = 0;
  let prevFrequencies = {0 : 1}
  let duplicateFound = false;
  while (!duplicateFound) {
    currentFrequency += array[currentIndex];
    if (prevFrequencies[currentFrequency]===1){
      prevFrequencies[currentFrequency] += 1;
      duplicateFound = true;
      return currentFrequency;
    } else {
      prevFrequencies[currentFrequency] = 1
    }
    count += 1;
    currentIndex = count % array.length;
  }

}


setFrequencyInputs('./puzzle-input')
// let sampleArray = [1,-2, 3, 1, 1, -2, 8]
// let sampleArray = [3, 3, 4, -2, -4]; // 10
// let sampleArray = [-6, 3, 8, 5, -6]; // 5
// let sampleArray = [7, 7, -2, -7, -4]; //14
// console.log(findOffset(sampleArray))
// console.log(findFirstRepeat(sampleArray))
