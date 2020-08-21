const
    Wit = require("node-wit/lib/wit"),
    client = new Wit({accessToken: process.env.WIT_SERVER_ACCESS_TOKEN}),
    request = require('request');

const handles ={
    // Handles messages events
    'handleMessage': function(sender_psid, message) {
        if(!message.text){
            res = {
                "text": `...`
            }
        } else{
            client.message(message.text, {})
                .then((data) => {
                    console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
                    if(data.intents[0].name === 'introduction' && data.intents[0].confidence >= .50){
                        if(data.traits[3].robotic.value === 'yes' && data.traits[3].robotic.confidence >= .50){
                            res = {
                                "text": `Beep Boop *robot noises*`
                            }
                            callSendAPI(sender_psid,res)
                        }
                        res = {
                            "text": `Hello. :)`
                        }
                        callSendAPI(sender_psid,res)
                    } else{
                        res = {
                            "text": `Yes`
                        }
                        callSendAPI(sender_psid,res)
                    }
                })
                .catch(err=>{
                    console.dir(err)
                    res = {
                        "text": `There seems to be an error. Please Wait.`
                    }
                    callSendAPI(sender_psid,res)
                });
        }
    },
    // Handles messaging_postbacks events
    'handlePostback': function(sender_psid, postback) {
        console.log('okay')
    },
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (err) {
            console.error("Unable to send message:" + err);
        } else {
            console.log('message sent!')
        }
    });
}

module.exports = handles;
