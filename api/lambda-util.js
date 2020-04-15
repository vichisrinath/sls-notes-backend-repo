const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2"
});
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const dynamoDbTableName = process.env.NOTES_TABLE;

const getSuccessResponse = (statusCode= 200, payload => {
  return getResponse(statusCode, payload);
};

const getErrorResponse = err => {
  let payload = JSON.stringify({
    error: err.name ? err.name : "Exception",
    message: err.message ? err.message : "Unknown error"
  });

  let errCode = err.statusCode ? err.statusCode : 500;

  return getResponse(errCode, payload);
};

const getResponse = (statusCode, payload) => {
  return {
    statusCode: statusCode,
    "Access-Control-Allow-Origin": "*",
    body: JSON.stringify(payload)
  };
};

const getUserId = headers => {
  return headers.app_user_id;
};

const getUserName = headers => {
  return headers.app_user_name;
};
module.exports = {
  getSuccessResponse,
  getErrorResponse,
  dynamoDbClient,
  dynamoDbTableName,
  getUserId,
  getUserName
};
