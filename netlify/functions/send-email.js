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
    
    // Send confirmation email to applicant
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      {
        to_email: formData.emailAddress,
        to_name: `${formData.firstName} ${formData.lastName}`,
        application_id: formData.ApplicationID,
        preferred_location: formData.preferredLocation,
        move_in_date: formData.desiredMoveInDate,
        from_name: 'Just Rooms Housing'
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    // Send notification email to admin
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_ADMIN_TEMPLATE_ID,
      {
        to_email: 'seatherly.prsvr@gmail.com',
        applicant_name: `${formData.firstName} ${formData.lastName}`,
        application_id: formData.ApplicationID,
        applicant_email: formData.emailAddress,
        phone_number: formData.phoneNumber,
        preferred_location: formData.preferredLocation,
        from_name: 'Housing Application System'
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

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