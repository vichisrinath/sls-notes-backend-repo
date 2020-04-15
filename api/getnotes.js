/**
 * Route GET /notes
 */
const codeUtil = require("./lambda-util.js");

exports.handler = async event => {
  try {
    let query = event.queryStringParameters;
    let limit = query && query.limit ? query.limit : 5;
    user_id = codeUtil.getUserId(event.headers);
    let startTimeStamp = query && query.start ? query.start : 0;

    let params = {
      TableName: codeUtil.dynamoDbTableName,
      KeyConditionExpression: "user_id = :uid",
      ExpressionAttributeValues: {
        ":uid": user_id
      },
      Limit: limit,
      scanIndexForward: false
    };

    if (startTimeStamp > 0) {
      params.ExclusiveStartKey = {
        user_id: user_id,
        timestamp: startTimeStamp
      };
    }

    let data = await codeUtil.dynamoDbClient.query(params).promise();

    return codeUtil.getSuccessResponse(data);
  } catch (err) {
    console.log("Error", err);
    return codeUtil.getErrorResponse(err);
  }
};
