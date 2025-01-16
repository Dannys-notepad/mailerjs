require('dotenv').config()
const mailer = require('./pixmail')

const sendMail = async () => {
  let smptConfig = {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    subject: 'Testing Pixmail',
    recipientEmail: 'sample@gmail.com',
    body: 'A test mail from pixmail'
    //bodyType: 'html'
  }
  
  try{
    const sendMail = await mailer(smptConfig)
    if(sendMail){
      console.log('Mail sent')
      process.exit(0)
    }
  }catch(error){
    return error 
  }
}

sendMail()
