const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use('/api/user', require('./routes/user'));

const PORT = config.get('port');

async function start() {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    app.listen(PORT, () => console.log(`App is started on port ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();