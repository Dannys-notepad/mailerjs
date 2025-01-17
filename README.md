# `Pixmail v2.0.1`
> A simple and efficient email sending module for Node.js applications.

`Pixmail` is a lightweight wrapper around the Nodemailer module, for sending mails with nodejs, it makes sending mails fast and easy without you having to always type out the required codes or going through the hassle of catching errors manually, also comes with premade mail templates.


## Table of Contents
1. #installation
2. #requirements
3. #usage
4. #examples
5. #api-documentation
6. #error-handling
7. #license

## Installation
To install pixmail, run the following command in your terminal:

```bash
npm install pixmail
```

## Requirement
To use `Pixmail` with your gmail account you'll need to create an app password for your goggle account.

To do that copy or click this link https://myaccount.google.com/apppasswords?rapt=AEjHL4O09_dsFEiMJQkZ53AtjhHYCFdPIQnCuq5Pdy0GURsLoIDtvswcm3q2N0jvnitc802fiViGNOah8hPwytVMRDgG7t3s5aReZCFBHOsJmbDzow2iW3E, and follow the procedures.

## Usage
Here's an example of how to use pixmail:

```javascript
const pixmail = require('pixmail');

// Set up email credentials
pixmail.setup({
  user: 'your-email@gmail.com',
  pass: 'your-email-app-password',
});

// Send email
pixmail.sendMail({
  from: 'your-email@gmail.com',
  to: 'recipient-email@example.com',
  subject: 'Meeting Invitation',
  text: 'Please join us for a meeting on Friday.',
});
```

## Other Examples
*Sending a Pure Text Email*
```javascript
const pixmail = require('pixmail');

// Set up email credentials
pixmail.setup({
  user: 'your-email@gmail.com',
  pass: 'your-email-app-password',
});

// Send email
pixmail.sendMail({
  from: 'your-email@gmail.com',
  to: 'recipient-email@example.com',
  subject: 'Meeting Invitation',
  text: 'Please join us for a meeting on Friday.',
});
```

*Sending an HTML Email template without a Button*
```javascript
const pixmail = require('pixmail');

// Set up email credentials
pixmail.setup({
  user: 'your-email@gmail.com',
  pass: 'your-email-app-password',
});

// Generate email template 
const emailHtml = pixmail.generateTemplate('withoutButton', {
  recipientName: 'John Doe',
  topic: 'Meeting Invitation',
  importantInformation: 'Please RSVP by Friday',
  yourName: 'Jane Smith',
});

// Send email
pixmail.sendMail({
  from: 'your-email@gmail.com',
  to: 'recipient-email@example.com',
  subject: 'Meeting Invitation',
  bodyType: 'html'
  body: emailHtml,
});
```

*Sending an HTML Email template with a Button*
```javascript
const pixmail = require('pixmail');

// Set up email credentials
pixmail.setup({
  user: 'your-email@gmail.com',
  pass: 'your-email-app-password',
});

// Generate email template 
const emailHtml = pixmail.generateTemplate('withButton', {
  recipientName: 'John Doe',
  topic: 'Meeting Invitation',
  action: 'Please RSVP by Friday',
  linkUrl: 'https://example.com',
  yourName: 'Jane Smith',
});

// Send email
pixmail.sendMail({
  from: 'your-email@gmail.com',
  to: 'recipient-email@example.com',
  subject: 'Meeting Invitation',
  bodyType: 'html',
  body: emailHtml,
});
```


## API Documentation
*setup(config)*
Sets up email credentials.

- `config`: An object containing email credentials.
    - `user`: The email address.
    - `pass`: The email password.

*generateEmailHtml(templateName, data)*
Generates email HTML using a template.

- `templateName`: The name of the template to use.
- `data`: An object containing data to replace placeholders in the template.

*sendMail(mailOptions)*
Sends an email.

- `mailOptions`: An object containing email options.
    - `from`: The sender's email address.
    - `to`: The recipient's email address.
    - `subject`: The email subject.
    - `text`: The email text body.
    - `bodyType`: The body type(this is only required when sending html templates).
    - `body`: The email HTML body.

Error Handling
pixmail uses error codes to handle errors. Here are some common error codes:

- `EAUTH`: Authentication error.
- `ENOTFOUND`: DNS lookup error.
- `ECONNRESET`: Connection reset error.
- `EENVELOP`: Authentication error.
- `EDNS`: DNS lookup error.

License
pixmail is licensed under the MIT License. See LICENSE for details.

Leave a star 🌟 on GitHub.