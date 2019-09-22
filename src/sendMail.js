import { SES } from 'aws-sdk';
import { saveToDynamoDB } from './saveToDynamoDb';

const client = new SES();

const sender = process.env.SENDER_EMAIL;
const subject = process.env.EMAIL_SUBJECT;
const charset = 'UTF-8';

/**
 * Send Email using SES
 * @param  {object}  data
 * @param  {object}  content
 * @return {Promise}
 */
const sendMailToUser = async (data, content) => {
  console.log('sendMailToUser()');
  const params = {
    Source: sender,
    Destination: {
      ToAddresses: [data.email],
    },
    Message: {
      Subject: {
        Charset: charset,
        Data: subject,
      },
      Body: {
        Html: {
          Charset: charset,
          Data: content,
        },
        Text: {
          Charset: charset,
          Data: content,
        },
      },
    },
  };

  try {
    const result = await client.sendEmail(params).promise();
    return result;
  } catch (e) {
    console.error(e);
  }
};

/**
 * send an email
 * @param  {object}  event information from the invoker
 * @param  {object}  context contains information about the invocation,
 *     function, and execution environment
 * @return {string}  completion string
 */
export const sendMail = async (event, context) => {
  console.log(event);

  try {
    const data = event.body;
    const content =
      `Message from ${ data.firstname } ${ data.lastname },\nMessage Contents: ${ data.message }`;
    await saveToDynamoDB(data);
    const response = sendMailToUser(data, content);

    console.log(`Email sent! Message Id: ${ response.MessageId }`);
    return 'Email sent!';
  } catch (e) {
    console.error(e);
    throw new Error('Email send operation failed.');
  }
};
