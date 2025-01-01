const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

// Create a single instance of Mailgen
const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'title',
    link: 'home page link'
  }
});

// Create a transport instance with pool enabled
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    authMethod: "PLAIN"
  },
  pool: true,
  maxConnections: 5
});

const sendMail = (recipientsEmail) => {
  return new Promise((resolve, reject) => {
    // Generate email body
    const email = {
      body: {
        name: 'Hello there! 🙂',
        intro: 'this is an intro',
        action: {
          instructions: 'Click to confirm',
          button: {
            color: '#22BC66',
            text: 'Confirm',
            link: `desired web address`
          }
        },
        outro: 'This is sample mail'
      }
    };

    const emailBody = mailGenerator.generate(email);

    // Send email
    transporter.sendMail({
      from: process.env.SMTP_USER,
      to: recipientsEmail,
      subject: 'sample message',
      html: emailBody
    }, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
};

module.exports = sendMail;