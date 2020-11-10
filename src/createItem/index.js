const AWS = require('aws-sdk');
exports.handler =  (event, context, callback) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  // We need the table name
  const tableName = process.env.TABLE_NAME;
  
  console.log("This is the event body " + JSON.parse(event.body).itemName);

  // We need the Dynamo API to insert

  var params = {
    TableName : tableName,
    Item: {
      itemId: event.requestContext.requestId,
      itemName: JSON.parse(event.body).itemName,
      itemPrice: JSON.parse(event.body).itemPrice
    }
  };
  
  var documentClient = new AWS.DynamoDB.DocumentClient();
  
  documentClient.put(params, function(err, data) {
    if (err) console.log(err);
    else console.log(data);
  });

  // We need to return the value

  const responseMessage = {
    "statusCode" : 201,
     "headers" : {
          "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
        },
    "body" : JSON.stringify({
      "itemId" : event.requestContext.requestId,
      "itemName" : JSON.parse(event.body).itemName,
      "itemPrice": JSON.parse(event.body).itemPrice
    })
  }

  return callback(null, responseMessage);
};