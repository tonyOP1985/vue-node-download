const mongoose = require('mongoose');
const RandomCode = require('./RandomCode');

mongoose.connect('mongodb://localhost/download-code-test')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const codeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  redeemed: {
    type: Boolean,
    default: false,
    required: true
  }
});

const Code = mongoose.model('downloadCode', codeSchema);

const autoGenCode = new RandomCode();

// num = number of codes generated
function createRandCode(num) {
  let arr = [];
  for (let i = 0; i <= num; i++) {
    let newCode = autoGenCode.create12CharCode();
    arr.push(newCode);
  }
  return arr
}

// adds codes mongodb
function addCodes(num) {
  const codeArray = createRandCode(num);
  codeArray.forEach( async (code) => {
    const authCode = new Code({ code });

    const result = await authCode.save();
  })
}

addCodes(20);