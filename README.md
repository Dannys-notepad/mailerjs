# `MailerJs`
> A lightweight npm package for sending mails

`MailerJs` is a simple lightweight npm, for sending mails with nodejs, it makes sending mails fast and easy and can fit into your project due to its easy customizable nature.

With `MailerJs` you don't need to worry about errors, because it handles any potential error. 

## Requirement
To use `MailerJs` with your gmail account you'll need to create an app password for your goggle account.

To do that copy or click this link https://myaccount.google.com/apppasswords?rapt=AEjHL4O09_dsFEiMJQkZ53AtjhHYCFdPIQnCuq5Pdy0GURsLoIDtvswcm3q2N0jvnitc802fiViGNOah8hPwytVMRDgG7t3s5aReZCFBHOsJmbDzow2iW3E, and follow the procedures.

## Usage
To use `MailerJs` first of all create a .env file with the following structures. 


SMPT_USER = your email 

SMPT_PASS = your created app password

And also don't forget to edit template mail to fit your mail

## How to use in your project 
This is an example code on how to use `MailerJs` in your project


```js
  const mailer = require('mailerjs')
  
  let smptConfig = {
    user: process.env.SMTP_USER,
    appPassword: process.env.SMTP_PASS,
    subject: 'Testing Mailer',
    recipientsEmail: 'sample@gmail.com'
  }
  let mailgenConfig = {
    projectName: 'mailerjs',
    indexLink: 'no link yet'
  }
  let mailTemplate = {
    heading: 'Testing mailerjs',
    introText: 'What do you think',
    action: {
      instruction: 'try it out',
      button:{
        color: '',
        text: 'now',
        link: 'yea'
      }
    },
    outroText: 'bye'
  }
  try{
    const mailSent = await mailer(smptConfig, mailgenConfig, mailTemplate)
    if(mailSent){
      console.log('Mail sent')
      process.exit(0)
    }
  }catch(error){
    return error 
  }
```

All thanks to Habib for giving me this idea 😊.

Leave a star 🌟 if you find this project interesting.