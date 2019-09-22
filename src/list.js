import { DynamoDB } from 'aws-sdk';

const dynamodb = new DynamoDB.DocumentClient();

/**
 * fetch all records from database
 * @param  {object}  event information from the invoker
 * @param  {object}  context contains information about the invocation,
 *     function, and execution environment
 * @return {object}
 */
export const list = async (event, context) => {
  const TableName = process.env['DYNAMODB_TABLE'];

  // fetch all records from database
  try {
    const result = await dynamodb.scan({
      TableName,
    }).promise();

    return {
      statusCode: 200,
      body: result['Items'],
    };
  } catch (e) {
    console.error(e);
    throw new Error('List operation failed.');
  }
};
