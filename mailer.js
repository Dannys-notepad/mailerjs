const nodemailer = require('nodemailer')
const { validateEmailAddress } = require('./utils')

const mailerjs = async (smtpConfig) => {
  
  if(!smtpConfig){
    throw new Error('parameter cannot be left blank')
  }
  
  if(typeof smtpConfig !== 'object'){
    throw new Error('parameter value must be an object')
  }
  
  if(!smtpConfig.user || !smtpConfig.pass || !smtpConfig.subject || !smtpConfig.recipientEmail || !smtpConfig.body){
    throw new Error('an smtpConfig object was omitted, check and try again')
  }
  
  const valid = await validateEmailAddress(smtpConfig.recipientEmail)
  
  if(!valid){
    throw new Error('The entered email address is not valid')
  }
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
      authMethod: 'PLAIN'
    },
    pool: true,
    maxConnections: 5
  })
  
  try {
    const info = await transporter.sendMail({
    from: smtpConfig.user,
    to: smtpConfig.recipientEmail,
    subject: smtpConfig.subject,
    text: smtpConfig.body
    })
    return true 
    
  } catch (error) {
    if (error.code === 'EAUTH') {
      console.error('Authentication error:', error);
      throw new Error('Authentication failed. Please check your email credentials.');
    } else if (error.code === 'ENOTFOUND') {
      console.error('DNS lookup error:', error);
      throw new Error('Error resolving SMTP server address. Please try again later.');
    } else if (error.code === 'ECONNRESET') {
      console.error('Connection reset error:', error);
      throw new Error('Error establishing a secure connection to the SMTP server. Please try again later.');
    } else if (error.code === 'EENVELOP') {
      console.error('Authentication error:', error);
      throw new Error('Authentication failed. Please check your email credentials, and please make sure they\' well linked the imoport is included if you\'re referencing them from a .env file');
    } else if (error.code === 'EDNS') {
      console.error('DNS lookup error:', error);
      throw new Error('Error resolving SMTP server address. please check your internet connection');
    } else {
      console.error('Unknown error:', error);
      throw new Error('An unknown error occurred. Please try again later.');
    }
  }
}


module.exports = mailerjs