const mailTemplates = {
  withoutButton: `
    <!DOCTYPE html>
<html>
<head>
  <title>Formal Email</title>
</head>
<body>
  <table width="600" align="center" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #333; font-family: Arial, sans-serif;">Dear {{recipientName}},</h2>
        <p style="color: #666; font-family: Arial, sans-serif;">This is a formal email to inform you about {{topic}}.</p>
        <p style="color: #666; font-family: Arial, sans-serif;">Please note that {{importantInformation}}.</p>
        <p style="color: #666; font-family: Arial, sans-serif;">Best regards,</p>
        <p style="color: #666; font-family: Arial, sans-serif;">{{yourName}}</p>
      </td>
    </tr>
  </table>
</body>
</html>

  `,
  withButton: `
  <!DOCTYPE html>
<html>
<head>
<title>Formal Email</title>
</head>
<body>
<table width="600" align="center" cellpadding="0" cellspacing="0">
<tr>
<td style="padding: 20px; background-color: #f9f9f9;">
<h2 style="color: #333; font-family: Arial, sans-serif;">Dear {{recipientName}},</h2>
<p style="color: #666; font-family: Arial, sans-serif;">This is a formal email to inform you about {{topic}}.</p>
<p style="color: #666; font-family: Arial, sans-serif;">Please click on the link below to {{action}}.</p>
<a href="{{linkUrl}}" style="background-color: #4CAF50; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Click Here</a>
<p style="color: #666; font-family: Arial, sans-serif;">Best regards,</p>
<p style="color: #666; font-family: Arial, sans-serif;">{{yourName}}</p>
</td>
</tr>
</table>
</body>
</html>
  `
}

module.exports = mailTemplates