require('dotenv').config()
const // Declare dependencies here
    express     = require('express'),
    bodyParser  = require('body-parser'),
    cors        = require('cors'),
    appport     = process.env.PORT || 3000,
    app         = express().use( // Declare middleware here
                                bodyParser.json(),
                                cors(),
                                express.json(),
                                );

const
    hookRouter = require('./api/hook')

app.use('/inbound', hookRouter)

app.listen(appport, function(err) {
    if(err){throw new Error(err)}
    console.log(`Server is running on port: ${appport}`);
});
