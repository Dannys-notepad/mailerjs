# `MailerJs`
> A lightweight Script for sending mails

`MailerJs` is a simple lightweight script, for sending mails with nodejs, it makes sending mails fast and easy and can fit into your project due to its easy customizable nature.

With `MailerJs` you don't need to worry about errors, because it handles any potential error. 

## Requirement
To use `MailerJs` with your gmail account you'll need to create an app password in your goggle account.

To do that copy this link https://myaccount.google.com/apppasswords?rapt=AEjHL4O09_dsFEiMJQkZ53AtjhHYCFdPIQnCuq5Pdy0GURsLoIDtvswcm3q2N0jvnitc802fiViGNOah8hPwytVMRDgG7t3s5aReZCFBHOsJmbDzow2iW3E, and follow the procedures.

## Usage
To use `MailerJs` first of all create a .env file with the following structures. 


SMPT_USER = your email 

SMPT_PASS = your created app password


Once you're done, copy the code either the promises or asynchronous version, and paste in a mailer.js file in your project and you're good to go.

Note: the modules behind `MailerJs` are `nodemailer` and `mailgen`, so when you copy the code make sure to install the modules.
```sh 
npm i nodemailer mailgen
```

And also don't forget to edit template mail to fit your mail

## How to use in your project 
This is an example code on how to use `MailerJs` in your project


```js
  const mailer = require('mailerjs')
  try{
    const sendMail = await mailer('example@gmail.com')
  }catch(error){
    if (error.code === 'EAUTH') {
      console.error('Authentication error:', error);
      return 'Authentication failed. Please check your email credentials.';
    } else if (error.code === 'ENOTFOUND') {
      console.error('DNS lookup error:', error);
      return 'Error resolving SMTP server address. Please try again later.';
    } else if (error.code === 'ECONNRESET') {
      console.error('Connection reset error:', error);
      return 'Error establishing a secure connection to the SMTP server. Please try again later.';
    } else {
      console.error('Unknown error:', error);
      return 'An unknown error occurred. Please try again later.';
    }
  }
```

All thanks to Habib for giving me this idea, indirectly 😊.

Leave a star 🌟 if you find this project interesting.