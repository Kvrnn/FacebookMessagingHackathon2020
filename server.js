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

const Wit = require("node-wit/lib/wit");


const client = new Wit({accessToken: process.env.WIT_SERVER_ACCESS_TOKEN});
client.message('what is the weather in London?', {})
    .then((data) => {
        console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
    })
    .catch(console.error);

// const {interactive} = require('node-wit');
// interactive(client);

app.use('/inbound', hookRouter)

app.listen(appport, function(err) {
    if(err){throw new Error(err)}
    console.log(`Server is running on port: ${appport}`);
});
