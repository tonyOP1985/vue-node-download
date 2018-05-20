const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  const fileLoaction = path.join('./download', 'pics.zip');
  console.log(fileLoaction);
  res.download(fileLoaction, 'pics.zip');
});

module.exports = router;