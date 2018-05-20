const mongoose = require('mongoose');
const Joi = require('joi');

const DownloadCode = mongoose.model('downloadCode', new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  redeemed: {
    type: Boolean,
    default: false,
    require: true
  }
}));

function validateCode(code) {
  const schema = {
    code: Joi.string().min(14).max(14).required()
  }

  return Joi.validate(code, schema);
}

exports.DownloadCode = DownloadCode;
exports.validate = validateCode;