const codeUtil = require("./lambda-util.js");

exports.handler = async event => {
  try {
    let timestamp = parseInt(event.parthParameters.timestamp);
    let params = {
      TableName: codeUtil.dynamoDbTableName,
      Key: {
        user_id: codeUtil.getUserId(event.headers),
        timestamp: timestamp
      }
    };
    codeUtil.dynamoDbClient.delete(params).promise();
    return codeUtil.getSuccessResponse({});
  } catch (err) {
    console.log("Error", err);
    return codeUtil.getErrorResponse(err);
  }
};
