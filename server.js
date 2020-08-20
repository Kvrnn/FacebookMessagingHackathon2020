/**
 * DO NOT EDIT THESE CONST
 * They are required dependencies
 */
                  require('dotenv').config()
const express   = require('express');
const cors      = require('cors');

// Opening the App and setting the port.
const app = express();
const appport = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

const mainRouter = require('./pages/index')

app.use('/', mainRouter) // Index

app.listen(appport, function(err) {
    console.log(`Server is running on port: ${appport}`);
});
