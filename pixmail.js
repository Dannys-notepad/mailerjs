// Import required modules
const nodemailer = require('nodemailer'); // For sending emails
const handlebars = require('handlebars'); // For compiling email templates
const { validateEmailAddress } = require('./utils'); // Utility function to validate email addresses
const templates = require('./templates'); // Predefined email templates

// Declare global variables
let transporter, emptyAttachment = null; // `transporter` will hold the nodemailer transport object, `emptyAttachment` is a placeholder

// Define the `pixmail` object, which contains methods for setting up and sending emails
const pixmail = {
  // Method to set up the email transporter with configuration
  setup: (config) => {
    // Validate that the config parameter is a non-null object
    if (typeof config !== 'object' || config === null) {
      throw new Error('Parameter value must be a non-null object');
    }

    // Check for required properties in the config object
    const requiredProperties = ['user', 'pass']; // 'user' and 'pass' are required for authentication
    for (const property of requiredProperties) {
      if (!config[property]) {
        throw new Error(`Missing required property: ${property}`);
      }
    }

    // Create a nodemailer transporter using Gmail as the service
    transporter = nodemailer.createTransport({
      service: 'gmail', // Use Gmail's SMTP service
      auth: {
        user: config.user, // Email address
        pass: config.pass, // Password or app-specific password
        authMethod: 'PLAIN', // Authentication method
      },
      pool: true, // Enable connection pooling
      maxConnections: 5, // Maximum number of connections in the pool
    });
  },

  // Method to generate an email template using Handlebars
  generateTemplate: (templateName, data) => {
    let templateString;
    // Choose the appropriate template based on the templateName
    if (templateName === 'withButton') {
      templateString = templates.withButton; // Template with a button
    } else {
      templateString = templates.withoutButton; // Template without a button
    }

    // Compile the template with the provided data
    const compiledTemplate = handlebars.compile(templateString);
    return compiledTemplate(data); // Return the compiled HTML
  },

  // Method to send an email
  sendMail: async (mailOptions) => {
    try {
      // Validate that mailOptions is a non-null object
      if (typeof mailOptions !== 'object' || mailOptions === null) {
        throw new Error('Parameter value must be a non-null object');
      }

      // Check for required properties in mailOptions
      const requiredProperties = ['subject', 'to', 'body']; // 'subject', 'to', and 'body' are required
      for (const property of requiredProperties) {
        if (!mailOptions[property]) {
          throw new Error(`Missing required property: ${property}`);
        }
      }

      // Validate that the recipient's email address is a string
      if (typeof mailOptions.to !== 'string') {
        throw new Error('Receiver\'s email address must be a string');
      }

      // Validate the recipient's email address format
      const valid = await validateEmailAddress(mailOptions.to);
      if (!valid) {
        throw new Error('The entered email address is not valid');
      }

      // Validate the body type (only 'html' is accepted)
      if (mailOptions.bodyType && mailOptions.bodyType !== 'html') {
        throw new Error('wrong body type value, the only accepted value is "html"');
      }

      // Set a placeholder for attachments if none are provided
      if (!mailOptions.attachments) {
        emptyAttachment = 'text';
      }

      // Send the email using the nodemailer transporter
      const info = await transporter.sendMail({
        from: mailOptions.from, // Sender's email address
        to: mailOptions.to, // Recipient's email address
        subject: mailOptions.subject, // Email subject
        [mailOptions.bodyType ?? 'text']: mailOptions.body, // Email body (defaults to plain text if bodyType is not specified)
        [emptyAttachment ?? 'attachments']: mailOptions.attachments ?? '.', // Attachments (defaults to '.' if none are provided)
      });

      return info; // Return the result of the email sending operation
    } catch (error) {
      // Handle specific errors and provide meaningful error messages
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

// Export the `pixmail` object for use in other modules
module.exports = pixmail;