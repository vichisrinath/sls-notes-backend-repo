/**
 *  PUT  /note
 */
const codeUtil = require("./lambda-util.js");
const uuidv4 = require("uuid/v4");
const moment = require("moment");

exports.handler = async event => {
  try {
    let item = JSON.parse(event.body).Item;
    item.user_id = codeUtil.getUserId(event.headers);
    item.user_name = codeUtil.getUserName(event.headers);
    item.expires = moment()
      .add(90, "days")
      .unix();

    const data = await codeUtil.dynamoDbClient
      .put({
        TableName: codeUtil.dynamoDbTableName,
        Item: item,
        ConditionExpression: "#t = :t",
        ExpressionAttributeNames: {
          "#t": "timestamp"
        },
        ExpressionAttributeValues: {
          ":t": item.timestamp
        }
      })
      .promise();
    return codeUtil.getSuccessResponse({});
  } catch (err) {
    console.log("Error", err);
    return codeUtil.getErrorResponse(err);
  }
};
