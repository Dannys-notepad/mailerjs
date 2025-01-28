# Pixmail v2.1.2

> A simple and efficient email-sending module for Node.js applications.

**Pixmail** is a lightweight, asynchronous wrapper around the Nodemailer module, designed to simplify sending emails in Node.js applications. It eliminates the need for repetitive code and manual error handling, while also providing pre-made email templates for quick use.

---

## Table of Contents
1. [Installation](#installation)
2. [Requirements](#requirements)
3. [Usage](#usage)
4. [Examples](#examples)
5. [API Documentation](#api-documentation)
6. [Error Handling](#error-handling)
7. [License](#license)

---

## Installation

To install Pixmail, run the following command in your terminal:

```bash
npm install pixmail
```

---

## Requirements

To use Pixmail with your Gmail account, you'll need to create an **app password** for your Google account. Follow these steps:

1. Visit the [Google App Passwords](https://myaccount.google.com/apppasswords?rapt=AEjHL4O09_dsFEiMJQkZ53AtjhHYCFdPIQnCuq5Pdy0GURsLoIDtvswcm3q2N0jvnitc802fiViGNOah8hPwytVMRDgG7t3s5aReZCFBHOsJmbDzow2iW3E) page.
2. Follow the instructions to generate an app password.

**Note:** Your app password is essential for authentication. Your regular Gmail password will not work.

---

## Usage

Here’s a quick example of how to use Pixmail:

```javascript
const pixmail = require('pixmail');

// Set up email credentials
pixmail.setup({
  user: 'your-email@gmail.com',
  pass: 'your-email-app-password'
});

// Send email
const send = await pixmail.sendMail({
  from: 'your-email@gmail.com',
  to: 'recipient-email@example.com',
  subject: 'Meeting Invitation',
  text: 'Please join us for a meeting on Friday.'
});
```

---

## Examples

### Sending a Plain Text Email
```javascript
const pixmail = require('pixmail');

pixmail.setup({
  user: 'your-email@gmail.com',
  pass: 'your-email-app-password'
});

const send = await pixmail.sendMail({
  from: 'your-email@gmail.com',
  to: 'recipient-email@example.com',
  subject: 'Meeting Invitation',
  text: 'Please join us for a meeting on Friday.'
});
```

### Sending an HTML Email Template (Without a Button)
```javascript
const pixmail = require('pixmail');

pixmail.setup({
  user: 'your-email@gmail.com',
  pass: 'your-email-app-password'
});

const emailHtml = pixmail.generateTemplate('withoutButton', {
  recipientName: 'John Doe',
  topic: 'Meeting Invitation',
  importantInformation: 'Please RSVP by Friday',
  yourName: 'Jane Smith'
});

const send = await pixmail.sendMail({
  from: 'your-email@gmail.com',
  to: 'recipient-email@example.com',
  subject: 'Meeting Invitation',
  bodyType: 'html',
  body: emailHtml
});
```

### Sending an HTML Email Template (With a Button)
```javascript
const pixmail = require('pixmail');

pixmail.setup({
  user: 'your-email@gmail.com',
  pass: 'your-email-app-password'
});

const emailHtml = pixmail.generateTemplate('withButton', {
  recipientName: 'John Doe',
  topic: 'Meeting Invitation',
  action: 'Please RSVP by Friday',
  linkUrl: 'https://example.com',
  yourName: 'Jane Smith'
});

const send = await pixmail.sendMail({
  from: 'your-email@gmail.com',
  to: 'recipient-email@example.com',
  subject: 'Meeting Invitation',
  bodyType: 'html',
  body: emailHtml
});
```

### Sending an Email with a Custom Template
```javascript
const pixmail = require('pixmail');

pixmail.setup({
  user: 'your-email@gmail.com',
  pass: 'your-email-app-password'
});

const customTemplate = `
<h1 style="background-color: gray">Heading/Title</h1>
<p>Mail body</p>
`;

const send = await pixmail.sendMail({
  from: 'your-email@gmail.com',
  to: 'recipient-email@example.com',
  subject: 'Meeting Invitation',
  html: customTemplate
});
```

### Sending an Email with Attachments
```javascript
const pixmail = require('pixmail');

pixmail.setup({
  user: 'your-email@gmail.com',
  pass: 'your-email-app-password'
});

const emailHtml = pixmail.generateTemplate('withoutButton', {
  recipientName: 'John Doe',
  topic: 'My CV',
  importantInformation: 'The attached file is my CV',
  yourName: 'Jane Smith'
});

const send = await pixmail.sendMail({
  from: 'your-email@gmail.com',
  to: 'recipient-email@example.com',
  subject: 'My CV',
  bodyType: 'html',
  body: emailHtml,
  attachments: [
    {
      filename: 'mycv.pdf',
      path: './documents/mycv.pdf',
      contentType: 'application/pdf'
    }
  ]
});
```

#### Attachment Options
- `filename`: The name of the attachment file.
- `path`: The path to the attachment file.
- `contentType`: The MIME type of the attachment file (optional).
- `content`: The attachment file contents as a Buffer or a string (optional).
- `cid`: The content ID of the attachment file (optional).

You can also attach files from a URL or a buffer:

```javascript
attachments: [
  {
    filename: 'example.pdf',
    content: fs.createReadStream('./example.pdf')
  },
  {
    filename: 'example2.pdf',
    content: 'https://example.com/example2.pdf'
  }
]
```

---

## API Documentation

### `setup(config)`
Sets up email credentials.

- `config`: An object containing email credentials.
  - `user`: The email address.
  - `pass`: The email password.

### `generateTemplate(templateName, data)`
Generates email HTML using a template.

- `templateName`: The name of the template to use.
- `data`: An object containing data to replace placeholders in the template.

### `sendMail(mailOptions)`
Sends an email.

- `mailOptions`: An object containing email options.
  - `from`: The sender's email address.
  - `to`: The recipient's email address.
  - `subject`: The email subject.
  - `text`: The email text body.
  - `bodyType`: The body type (required when sending HTML templates).
  - `body`: The email HTML template body.
  - `attachments`: The document(s) to attach.

---

## Error Handling

Pixmail uses error codes to handle errors. Here are some common error codes:

- `EAUTH`: Authentication error.
- `ENOTFOUND`: DNS lookup error.
- `ECONNRESET`: Connection reset error.
- `EENVELOP`: Authentication error.
- `EDNS`: DNS lookup error.

---

## License

Pixmail is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

Leave a star ⭐ if you find this project useful!