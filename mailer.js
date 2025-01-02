const nodemailer = require('nodemailer')
const mailgen = require('mailgen')

/*

{
  smptConfig{
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
 
const mailerjs = async (smptConfig, mailgenConfig, mailTemplate) => {
  
  if(typeof smptConfig === 'undefined' || typeof mailgenConfig === 'undefined' || typeof mailTemplate === 'undefined'){
    throw new Error('A parameter was left blank');
  }
  
  if(typeof smptConfig === 'object' || typeof mailgenConfig === 'object' || typeof mailTemplate === 'object'){
    throw new Error('All parameter values must be an object');
  }
  
  // Creates an instance of Mailgen
  const mailGenerator = new Mailgen({
    theme: mailgenConfig.theme ?? 'default',
    product: {
      name: mailgenConfig,projectName
      link: mailgenConfig.indexLink
    }
  });
  
  // Creates a transport instance
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smptConfig.user,
      pass: smptConfig.pass,
      authMethod: "PLAIN"
    },
    pool: true,
    maxConnections: 5
  });
  
  // Generates email body
    const email = {
      body: {
        name: mailTemplate.heading,
        intro: mailTemplate.introText,
        action: {
          instructions: mailTemplate.action.instructions,
          button: {
            color: mailTemplate.action.button.color ??  '#22BC66',
            text: mailTemplate.action.button.text,
            link: mailTemplate.action.button.link
          }
        },
        outro: mailTemplate.outroText
      }
    };
    const emailBody = mailGenerator.generate(email);
    
    // Sends email
    try {
      const info = await transporter.sendMail({
      from: smptConfig.user,
      to: smptConfig.recipientsEmail,
      subject: smptConfig.subject,
      html: emailBody
    });
    return info.response
    } catch (error) {
      return error
    }
}

module.exports = mailerjs