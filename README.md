# `MailerJs`
> A lightweight npm package for sending mails

`MailerJs` is a very lightweight npm package, for sending mails with nodejs, it makes sending mails fast and easy without you having to always type out the required codes or going through the hassle of catching errors manually.

With `MailerJs` you don't need to worry about errors, because it handles any potential error. 

## Requirement
To use `MailerJs` with your gmail account you'll need to create an app password for your goggle account.

To do that copy or click this link https://myaccount.google.com/apppasswords?rapt=AEjHL4O09_dsFEiMJQkZ53AtjhHYCFdPIQnCuq5Pdy0GURsLoIDtvswcm3q2N0jvnitc802fiViGNOah8hPwytVMRDgG7t3s5aReZCFBHOsJmbDzow2iW3E, and follow the procedures.


## Usage

```sh
npm i mailerjs
```

After running the above command create a .env file with the following structures. 


SMPT_USER = your email 

SMPT_PASS = your created app password

## Code Sample 
This is an example code on how to use `MailerJs` in your project


```js
  require('dotenv').config()
  const mailer = require('mailerjs')
  
  let smptConfig = {
    user: process.env.SMTP_USER,
    appPassword: process.env.SMTP_PASS,
    subject: 'Testing Mailer',
    recipientsEmail: 'sample@gmail.com',
    body: 'Test mail from mailerjs'
  }
  
  try{
    const mailSent = await mailer(smptConfig)
    if(mailSent){
      console.log('Mail sent')
      process.exit(0)
    }
  }catch(error){
    return error 
  }
```

git repo: https://github.com/Dannys-notepad/mailer.js

Do well to send your pull requests i promise to accept them

Leave a star 🌟 if you find this project interesting.