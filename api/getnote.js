/**
 * Route GET /note/n/{note_id}
 */
const codeUtil = require("./lambda-util.js");
const _ = require("underscore");

exports.handler = async event => {
  try {
    let note_id = decodeURIComponent(event.pathParameters.note_id);

    let params = {
      TableName: codeUtil.dynamoDbTableName,
      IndexName: "note_id_idx",
      KeyConditionExpression: "note_id = : note_id",
      ExpressionAttributeValues: {
        ":note_id": note_id
      },
      Limit: 1
    };
    let data = await codeUtil.dynamoDbClient.query(params).promise();
    if (!_.isEmpty(data.Items)) {
      return codeUtil.getSuccessResponse(data.Items[0]);
    } else {
      return codeUtil.getSuccessResponse(404, {});
    }
  } catch (err) {
    console.log("Error", err);
    return codeUtil.getErrorResponse(err);
  }
};
