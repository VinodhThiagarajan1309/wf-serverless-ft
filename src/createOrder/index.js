const AWS = require('aws-sdk');
exports.handler = (event, context, callback) => {
    // Log the event argument for debugging and for use in local development.
    console.log(JSON.stringify(event, undefined, 2));

    var requestBody = JSON.parse(event.body);

    // We need the table name
    const tableName = process.env.TABLE_NAME;
    //console.log("This is the event body " + event.body.itemName);

    var orderSubTotalInput = requestBody;
    var orderSubTotal = orderSubTotalInput.reduce(function(sum, d) {
        return sum + (d.itemPrice * d.quantity);
    }, 0);

    var salesTax = (orderSubTotal * 0.07).toFixed(2); // 7% sales tax
    var total = (+orderSubTotal + +salesTax).toFixed(2);

    console.log("Order Subtotal is " + orderSubTotal + " tax is " + salesTax + " total is " + total);
    
    var orderObject = {
        orderId : event.requestContext.requestId,
        lineItems : JSON.parse(event.body),
        orderSubTotal: orderSubTotal,
        salesTax : salesTax,
        total : total
    };
    
      var params = {
        TableName : tableName,
        Item: orderObject
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
          "orderId" : event.requestContext.requestId,
          "lineItems" : JSON.parse(event.body),
          "orderSubTotal": orderSubTotal,
          "salesTax" : salesTax,
          "total" : total
        })
      }
    
    return callback(null, responseMessage);
};