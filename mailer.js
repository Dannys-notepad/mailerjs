const nodemailer = require('nodemailer')
const mailgen = require('mailgen')

/*

{
  smtpConfig{
    user: ''
    appPassword: '',
    subject: '',
    recipientsEmail: ''
  },
  mailgenConfig{
    theme: 'default',
    projectName: '',
    indexLink: '',
  },
  mailTemplate: {
    heading: '',
    introText: '',
    action: {
      instruction: '',
      button:{
        color: '',
        text: '',
        link: ''
      }
    },
    outroText: ''
  },
}

 */
 
const mailerjs = async (smtpConfig, mailgenConfig, mailTemplate) => {
  
  if(!smtpConfig || !mailgenConfig|| !mailTemplate){
    throw new Error('A parameter was left blank');
  }
  
  if(typeof smtpConfig !== 'object' || typeof mailgenConfig !== 'object' || typeof mailTemplate !== 'object'){
    throw new Error('All parameter values must be an object');
  }
  
  if(!smtpConfig.user || !smtpConfig.appPassword || !smtpConfig.object || !smtpConfig.recipientsEmail){
    throw new Error('an smtpConfig object was omitted, check and try again')
  }
  
  // Creates an instance of Mailgen
  const mailGenerator = new mailgen({
    theme: mailgenConfig.theme ?? 'default',
    product: {
      name: mailgenConfig.projectName ?? 'null',
      link: mailgenConfig.indexLink ?? 'null'
    }
  });
  
  // Creates a transport instance
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.appPassword,
      authMethod: "PLAIN"
    },
    pool: true,
    maxConnections: 5
  });
  
  // Generates email body
    const email = {
      body: {
        name: mailTemplate.heading ?? 'null',
        intro: mailTemplate.introText ?? 'null',
        action: {
          instructions: mailTemplate.action.instruction ?? 'null',
          button: {
            color: mailTemplate.action.button.color ??  '#22BC66',
            text: mailTemplate.action.button.text ?? 'null',
            link: mailTemplate.action.button.link ?? 'null'
          }
        },
        outro: mailTemplate.outroText ?? 'null'
      }
    };
    const emailBody = mailGenerator.generate(email);
    
    // Sends email
    try {
      const info = await transporter.sendMail({
      from: smtpConfig.user,
      to: smtpConfig.recipientsEmail,
      subject: smtpConfig.subject,
      html: emailBody
    });
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