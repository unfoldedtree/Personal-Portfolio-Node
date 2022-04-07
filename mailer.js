const SES_SECRET_ACCESS_KEY = process.env['SES_SECRET_ACCESS_KEY']
const SES_ACCESS_KEY = process.env['SES_ACCESS_KEY']
const SES_REGION = process.env['SES_REGION']

const AWS = require('aws-sdk');

AWS.config.update({ 
    accessKeyId: SES_ACCESS_KEY,
    secretAccessKey: SES_SECRET_ACCESS_KEY,
    region: SES_REGION
});

const SES = new AWS.SES({apiVersion: '2010-12-01'});

async function sendEmail(subject, message) {
    const params = {
      Destination: {
        CcAddresses: [ 'wmcmahan14@gmail.com' ],
        ToAddresses: [ 'wmcmahan14@gmail.com' ]
      },
      Message: {
        Body: {
          Text: {
           Charset: "UTF-8",
           Data: message
          }
         },
         Subject: {
          Charset: 'UTF-8',
          Data: subject
         }
        },
      Source: 'mailer@will-mcmahan.com'
    };

    try {
        const resp = await SES.sendEmail(params).promise();
        console.log(`Email Message ID: ${resp.MessageId}`)
        return { status: 200, message: "Thanks for reaching out to me! I look forward to discussing this opportunity further."}
    } catch(err) {
        console.log(err)
        return { status: 500, message: "Unfortunately, there was an issue on the backend and the email did not send. Please try again, I would like to discuss this opportunity further."}
    }
}

exports.sendEmail = sendEmail