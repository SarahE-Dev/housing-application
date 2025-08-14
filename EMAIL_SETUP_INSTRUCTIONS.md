# 📧 EmailJS Setup Instructions

## Step 1: Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service
1. In EmailJS dashboard → **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow setup instructions
5. **Copy the Service ID** (you'll need this later)

## Step 3: Create Email Templates

### Template 1: Applicant Confirmation
1. Go to **Email Templates** → **Create New Template**
2. **Template Name**: `Housing Application Confirmation`
3. **Subject**: `Your Housing Application Confirmation - {{confirmation_code}}`
4. **Content**: Copy and paste from `email-template-applicant.html`
5. **Save** and **copy the Template ID**

### Template 2: Admin Notification  
1. Create another template
2. **Template Name**: `New Housing Application Alert`
3. **Subject**: `New Application: {{confirmation_code}} - {{applicant_name}}`
4. **Content**: Copy and paste from `email-template-admin.html`
5. **Save** and **copy the Template ID**

## Step 4: Get Your Public Key
1. Go to **Account** → **General**
2. **Copy your Public Key**

## Step 5: Update Your Application Code

Replace these values in your `index.html` file:

### Line 655 (approximately):
```javascript
// Replace this:
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');

// With your actual public key:
emailjs.init('your_actual_public_key_here');
```

### Lines 972-973 (approximately):
```javascript
// Replace this:
'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
'YOUR_TEMPLATE_ID', // Replace with your template ID

// With your actual IDs:
'your_service_id_here', // Your EmailJS service ID
'your_applicant_template_id_here', // Template 1 ID
```

### Lines 986-987 (approximately):
```javascript
// Replace this:
'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
'YOUR_ADMIN_TEMPLATE_ID', // Replace with your admin template ID

// With your actual IDs:
'your_service_id_here', // Your EmailJS service ID (same as above)
'your_admin_template_id_here', // Template 2 ID
```

## Step 6: Enable Emails
Find line 951 (approximately) and uncomment the email function:

```javascript
// Change from:
// await sendConfirmationEmails(formData); // Temporarily disabled until EmailJS is configured

// To:
await sendConfirmationEmails(formData);
```

## Step 7: Test Your Setup
1. Submit a test application
2. Check if both emails are received:
   - Applicant gets confirmation with styled template
   - You get admin notification
3. Check EmailJS dashboard for usage stats

## 🎨 Template Features

### Applicant Email:
- ✅ Matches your application's orange/black design
- ✅ Prominent confirmation code display
- ✅ Clear next steps
- ✅ Professional layout
- ✅ Mobile-responsive

### Admin Email:
- ✅ Alert-style header for attention
- ✅ All key applicant details
- ✅ Quick action items
- ✅ Searchable confirmation code
- ✅ Professional admin format

## 💰 EmailJS Pricing
- **Free Plan**: 200 emails/month
- **Personal Plan**: $15/month for 1,000 emails
- Perfect for housing applications!

## 🔧 Troubleshooting
- Emails not sending? Check your EmailJS service connection
- Wrong data in emails? Verify template variable names match exactly
- Emails going to spam? Add your domain to EmailJS whitelist

---

**Need Help?** Check the EmailJS documentation or contact support through their dashboard.