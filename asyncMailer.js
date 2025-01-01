const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

// Create a single instance of Mailgen
const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'title',
    link: 'homepage link'
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

const sendMail = async (recipientsEmail) => {
  try {
    // Generate email body
    const email = {
      body: {
        name: 'Hello there! 🙂',
        intro: 'This is a sample mail',
        action: {
          instructions: 'Click to confirm',
          button: {
            color: '#22BC66',
            text: 'Confirm your email',
            link: `your desired link`
          }
        },
        outro: 'this is the outro'
      }
    };
    const emailBody = mailGenerator.generate(email);

    // Send email
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: recipientsEmail,
      subject: 'sample email',
      html: emailBody
    });
    return info.response
  } catch (error) {
    console.error(error);
    return error.toString();
  }
};

module.exports = sendMail;