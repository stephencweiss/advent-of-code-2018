const fs = require ('fs');
const path = require ('path');

let filePath = path.join(__dirname, '/puzzle-input');
let samplePath = path.join(__dirname, '/sample-input');
let idString = '';
let idsArray = [];
let repeaterObject = {
  twos: 0,
  threes: 0,
};

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

const findCharFrequency = (string) => {
  // I: A string
  // O: Character frequency of the string
  let frequency = {}
  for (let i = 0; i < string.length; i++) {
    let curChar = string[i]
    if (frequency[curChar]){
      frequency[curChar] += 1;
    } else {
      frequency[curChar] = 1;
    }
  }
  return frequency
};

const updateGlobalRepeatCount = (frequency) => {
  // I: A string's character frequency
  // O: Increments a global var, repeaterObject, if a letter is repeated two or three times
  let keys = Object.keys(frequency)
  let repeatPresent = {
    twos: false,
    threes: false
  }
  for (let j = 0; j < keys.length; j++) {
    if (frequency[keys[j]] === 2) {
      repeatPresent.twos = true;
    }
    if (frequency[keys[j]] === 3) {
      repeatPresent.threes = true;
    }
  }
  if (repeatPresent.twos === true) { repeaterObject.twos += 1 }
  if (repeatPresent.threes === true) { repeaterObject.threes += 1 }
  
};

const calcCheckSum = (obj) => {
  let reducer = (accumulator, currentValue) => {return accumulator * currentValue}
  return reducedData = Object.values(obj).reduce(reducer)
};

const findCloseId = (arr) => {
  // I: An array
  // O: The letters that two elements *share* when they differ by only one element overall
  // for each el; String if nothing found.
  for (let i = 0; i < arr.length - 1; i += 1) {
    let targetId = arr[i];
    for (let j = i + 1; j < arr.length; j += 1) {
      let comparisonId = arr[j];
      if (compareStrings(targetId, comparisonId)){
        return (compareStrings(targetId, comparisonId).join(''))
      }
    }
  }
  return 'No Near Matches Found'
};

const compareStrings = (strA, strB) => {
  // I: Takes in two strings
  // O: The similarities and differences of the two strings (or null if there is more than one difference)
  const simSet = []
  const diffSet = []
  for (let i = 0; i < Math.min(strA.length, strB.length); i += 1) {
    if (strA[i] === strB[i]) {
      simSet.push(strA[i])
    } else {
      diffSet.push(strA[i])
      if (diffSet.length > 1) {
        return null;
      }
    }
  }
  return simSet;
};

// Calculate
Promise.resolve(readPuzzleInput(filePath))
  .then((idsArray) => {
    idsArray.map((str) => {
      let freq = findCharFrequency(str);
      updateGlobalRepeatCount(freq);
    });
    return repeaterObject;
  })
  .then((repeaterObject) => {
    const checkSum = calcCheckSum(repeaterObject)
    console.log(`The checkSum is --> `, checkSum)
  })
  .then(() => {return findCloseId(idsArray)})
  .then(result => console.log(`The shared characters are -->`, result))

