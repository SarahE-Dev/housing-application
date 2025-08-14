const emailjs = require('@emailjs/nodejs');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const formData = JSON.parse(event.body);
    console.log('Sending email for:', formData.emailAddress);
    
    // Send confirmation email to applicant only
    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      {
        to_email: formData.emailAddress,
        to_name: `${formData.firstName} ${formData.lastName}`,
        confirmation_code: formData.ConfirmationCode,
        application_id: formData.ApplicationID
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    console.log('Email sent successfully:', result.status);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};