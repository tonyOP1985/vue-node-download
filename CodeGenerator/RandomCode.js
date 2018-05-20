const _ = require('lodash');

class RandomCode {

  constructor() {
    this.alphabet = 'ABCDEFGIHJKLMNOPQRSTUVWXYZ';
    this.numbers = '1234567890';
  }

  shuffleChars() {
    let alphaArr = _.shuffle(this.alphabet.split(''));
    let numArr = _.shuffle(this.numbers.split(''));
    return [alphaArr, numArr];
  }

  create4CharSubCode(arr) {
    let newCode = [];
    for (let i = 0; i < 4; i++) {
      let alphaIndex = Math.floor(Math.random() * arr[0].length);
      let numIndex = Math.floor(Math.random() * arr[1].length);
      let arrIndex = Math.floor(Math.random() * arr.length);
  
      if (arrIndex === 0) {
        newCode.push(arr[0][alphaIndex]);
      } else {
        newCode.push(arr[1][numIndex]);
      }
    }
    return newCode.join('');
  }

  create12CharCode() {
    let result = [];
    let count = 0;
    for (let i = 0; i < 3; i++) {
      count++;
      result.push(this.create4CharSubCode(this.shuffleChars()));
      if (count === 3) return result.join('');
      result.push('-');
    }
  }
}

module.exports = RandomCode;