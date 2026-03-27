const getContactEmailTemplate = (name, email, phone, message) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <div style="max-width: 600px; margin: 20px auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
      <h1 style="margin: 0; color: white; font-size: 24px;">New Contact Form Submission</h1>
    </div>
    
    <!-- Content -->
    <div style="padding: 30px;">
      
      <!-- Contact Info -->
      <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; font-weight: bold;">Name:</td>
            <td style="padding: 8px 0; color: #333;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666; font-weight: bold;">Phone:</td>
            <td style="padding: 8px 0; color: #333;">${phone || 'Not provided'}</td>
          </tr>
        </table>
      </div>
      
      <!-- Message -->
      <div style="background-color: #fff; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px;">Message:</h3>
        <p style="margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
      </div>
      
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
      <p style="margin: 0; color: #999; font-size: 12px;">
        Received on ${new Date().toLocaleString('en-US', { 
          dateStyle: 'full', 
          timeStyle: 'short' 
        })}
      </p>
    </div>
    
  </div>
</body>
</html>
`;

const getNewsletterNotificationTemplate = (email) => `
<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <div style="max-width: 500px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px;">
    <h2 style="color: #AA367C; margin-top: 0;">📧 New Newsletter Subscriber!</h2>
    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <p style="margin: 0; font-size: 18px;"><strong>${email}</strong></p>
    </div>
    <p style="color: #666; font-size: 14px;">Subscribed on: ${new Date().toLocaleString()}</p>
  </div>
</body>
</html>
`;

const getNewsletterWelcomeTemplate = () => `
<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px;">
    <h2 style="color: #AA367C;">Welcome! 🎉</h2>
    <p style="font-size: 16px; line-height: 1.6;">Thank you for subscribing to my newsletter!</p>
    <p style="font-size: 16px;">You'll receive updates about:</p>
    <ul style="line-height: 1.8; color: #555;">
      <li>New projects and portfolio updates</li>
      <li>Tech insights and tutorials</li>
      <li>Industry news and trends</li>
      <li>Exclusive content and resources</li>
    </ul>
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
      <p style="color: #666;">Best regards,<br><strong>Surya Pratap Singh</strong></p>
    </div>
  </div>
</body>
</html>
`;

module.exports = {
  getContactEmailTemplate,
  getNewsletterNotificationTemplate,
  getNewsletterWelcomeTemplate
};
