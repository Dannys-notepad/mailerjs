require('dotenv').config()
const mailer = require('./mailer')

const sendMail = async () => {
  let smptConfig = {
    user: process.env.SMTP_USER,
    appPassword: process.env.SMTP_PASS,
    subject: 'Testing Mailer',
    recipientsEmail: 'etimdnl@gmail.com'
  }
  let mailgenConfig = {
    //theme: 'default',
    projectName: 'mailerjs',
    indexLink: 'no link yet'
  }
  let mailTemplate = {
    heading: 'Testing mailerjs',
    introText: 'What do you think',
    action: {
      instruction: 'try it out',
      button:{
        //color: '',
        text: 'now',
        link: 'yea'
      }
    },
    outroText: 'bye'
  }
  try{
    const sendMail = await mailer(smptConfig, mailgenConfig, mailTemplate)
    if(sendMail){
      console.log('Mail sent')
      process.exit(0)
    }
  }catch(error){
    return error 
  }
}

sendMail()