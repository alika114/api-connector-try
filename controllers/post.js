
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const path = require('path');

exports.getPosts = (req,res)=>{
    //res.send("simplified get method from routes file");
    res.json({
        posts : [
            {title : "first post"},
            {title : "second post"}
        ]
    });
};



exports.createPost = async(req,res)=>{
    console.log(req.body);
    //res.send("got the json");
    const { sessionID, query, context, audioOutput, projectID, languageCode, event } = req.body;
    const SESSIONID = sessionID || require('uuid/v1')();
    
    console.log(`project id : ${projectID} and sessionId : ${SESSIONID} `)

	
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: path.resolve('D:/node-api/cer/akilaorbita-esyxgg-8a005abaf79c.json')
    });
    
    const sessionPath = sessionClient.sessionPath(projectID, SESSIONID);

    // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: query,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };
  
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    
    res.json({
      "response": result.fulfillmentText
    });

    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }

};