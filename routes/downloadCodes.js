const express = require('express');
const mongoose = require('mongoose');
const { DownloadCode, validate } = require('../models/downloadCode');
const router = express.Router();

router.get('/', async (req, res) => {
  const downloadCodes = await DownloadCode.find();
  res.send(downloadCodes);
})

router.patch('/', async (req, res) => {
  const userCode = req.body.code;

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // finds code to check it if has already been redeemed
  const checkIfRedeemed = await DownloadCode.findOne({ code: userCode }, 'redeemed', (err, c) => {
    if (err) console.error(err);
  });
  // if code has already been redeemed
  if (checkIfRedeemed.redeemed) return res.status(400).send('This code cannot be redeemed.');

  // updates redeemed property to true if code has not been redeemed yet
  const update = await DownloadCode.findOneAndUpdate({ code: userCode }, {
    redeemed: true
  }, { new: true });

  res.send({code: update, message: 'Code has been redeemed!'});
});

module.exports = router;
