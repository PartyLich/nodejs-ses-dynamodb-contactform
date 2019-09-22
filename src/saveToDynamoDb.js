import uuid from 'uuid';
import { DynamoDB } from 'aws-sdk';

const dynamodb = new DynamoDB.DocumentClient();

/**
 * Insert details into DynamoDB Table
 * @param  {object} data
 */
export const saveToDynamoDB = async (data) => {
  const timestamp = new Date().getTime();
  const item = {
    id: uuid.v1(),
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    message: data.message,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  // Insert details into DynamoDB Table
  const tableName = process.env.DYNAMODB_TABLE;
  console.log(`Saving to ${ tableName }`);
  const result = await dynamodb
      .put({
        TableName: tableName,
        Item: item,
      })
      .promise();
  console.log(`save result: ${ JSON.stringify(result) }`);
  return result;
};
