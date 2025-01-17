const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const { validateEmailAddress } = require('./utils');
const templates = require('./templates');

let transporter;

const pixmail = {
  setup: (config) => {
    if (typeof config !== 'object' || config === null) {
      throw new Error('Parameter value must be a non-null object');
    }

    const requiredProperties = ['user', 'pass'];
    for (const property of requiredProperties) {
      if (!config[property]) {
        throw new Error(`Missing required property: ${property}`);
      }
    }

    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.user,
        pass: config.pass,
        authMethod: 'PLAIN',
      },
      pool: true,
      maxConnections: 5,
    });
  },

  generateTemplate: (templateName, data) => {
    let templateString;
    if (templateName === 'withButton') {
      templateString = templates.withButton;
    } else {
      templateString = templates.withoutButton;
    }

    const compiledTemplate = handlebars.compile(templateString);
    return compiledTemplate(data);
  },

  sendMail: async (mailOptions) => {
    try {
      if (typeof mailOptions !== 'object' || mailOptions === null) {
        throw new Error('Parameter value must be a non-null object');
      }

      const requiredProperties = ['subject', 'to', 'body']; // changed body to html
      for (const property of requiredProperties) {
        if (!mailOptions[property]) {
          throw new Error(`Missing required property: ${property}`);
        }
      }

      if (typeof mailOptions.to !== 'string') {
        throw new Error('Receiver\'s email address must be a string');
      }

      const valid = await validateEmailAddress(mailOptions.to);
      if (!valid) {
        throw new Error('The entered email address is not valid');
      }
      if(mailOptions.bodyType && mailOptions.bodyType !== 'html'){
        throw new Error('wrong body type value, the only accepted value is "html"')
      }

      const info = await transporter.sendMail({
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        [mailOptions.bodyType ?? 'text']: mailOptions.body, // changed body to html
      });

      return info;
    } catch (error) {
      // Handle errors
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
        throw new Error('Authentication failed. Please check your email credentials, and please make sure they\'re well linked if you\'re referencing them from a .env file');
      } else if (error.code === 'EDNS') {
        console.error('DNS lookup error:', error);
        throw new Error('Error resolving SMTP server address. Please check your internet connection');
      } else {
        console.error('Unknown error:', error);
        throw new Error('An unknown error occurred. Please try again later.');
      }
    }
  },
};

module.exports = pixmail;
