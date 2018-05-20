const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const downloadCodes = require('./routes/downloadCodes');
const download = require('./routes/download');

const app = express();

// connect to MongoDB Instance
mongoose.connect('mongodb://localhost/download-code-test')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use(cors());

// routes
app.use('/api/codes', downloadCodes);
app.use('/api/download', download);

app.get('/', (req, res) => {
  res.send('It works!');
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});