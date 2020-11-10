const AWS = require('aws-sdk');
exports.handler =  (event, context, callback) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  // The table name
   // We need the table name
   const tableName = process.env.TABLE_NAME;
   var requestItemId = event.pathParameters.itemId;

  // The scan query
  var params = {
    TableName : tableName,
    Key: {
       "itemId": requestItemId
    }
  };

  var documentClient = new AWS.DynamoDB.DocumentClient();
  

  // Return the data

  documentClient.get(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
        },
        body: JSON.stringify(data.Item)
      }

      callback(null, response);
    }
 });

};