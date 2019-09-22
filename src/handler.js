'use strict';

require('dotenv').config();

/**
 * Hello world lambda response
 * @param  {object}  event information from the invoker
 * @return {Promise}
 */
const hello = async (event) => ({
  statusCode: 200,
  body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
  ),
});

import { sendMail } from './sendMail';
import { list } from './list';

export {
  sendMail,
  list,
  hello,
};
