// Object containing email templates for use in the application
const mailTemplates = {
  // Template for an email without a button
  withoutButton: `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Formal Email</title> <!-- Email subject or title -->
    </head>
    <body>
      <!-- Table used for layout (compatible with email clients) -->
      <table width="600" align="center" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding: 20px; background-color: #f9f9f9;">
            <!-- Greeting with dynamic recipient name -->
            <h2 style="color: #333; font-family: Arial, sans-serif;">Dear {{recipientName}},</h2>
            <!-- Dynamic topic/content of the email -->
            <p style="color: #666; font-family: Arial, sans-serif;">{{topic}}.</p>
            <!-- Dynamic important information -->
            <p style="color: #666; font-family: Arial, sans-serif;">{{importantInformation}}.</p>
            <!-- Closing message -->
            <p style="color: #666; font-family: Arial, sans-serif;">Best regards,</p>
            <!-- Dynamic sender's name -->
            <p style="color: #666; font-family: Arial, sans-serif;">{{yourName}}</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,

  // Template for an email with a button
  withButton: `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Formal Email</title> <!-- Email subject or title -->
    </head>
    <body>
      <!-- Table used for layout (compatible with email clients) -->
      <table width="600" align="center" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding: 20px; background-color: #f9f9f9;">
            <!-- Greeting with dynamic recipient name -->
            <h2 style="color: #333; font-family: Arial, sans-serif;">Dear {{recipientName}},</h2>
            <!-- Dynamic topic/content of the email -->
            <p style="color: #666; font-family: Arial, sans-serif;">{{topic}}.</p>
            <!-- Dynamic call-to-action message -->
            <p style="color: #666; font-family: Arial, sans-serif;">{{action}}.</p>
            <!-- Button with a dynamic link -->
            <a href="{{linkUrl}}" style="background-color: #4CAF50; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Click Here</a>
            <!-- Closing message -->
            <p style="color: #666; font-family: Arial, sans-serif;">Best regards,</p>
            <!-- Dynamic sender's name -->
            <p style="color: #666; font-family: Arial, sans-serif;">{{yourName}}</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
};

// Export the mailTemplates object for use in other modules
module.exports = mailTemplates;