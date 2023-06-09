const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
connectDB();

const app = express()

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/data', require('./goalRouter'));

app.listen(port, () => console.log(`Server started on port ${port}`));
