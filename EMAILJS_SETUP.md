# 📧 EmailJS Setup Guide

Follow these steps to configure EmailJS and receive Valentine's answers directly in your email!

## Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account (100 emails/month free)
3. Verify your email address

## Step 2: Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Connect and verify your email
5. Copy the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Set up your template with these variables:

```
Subject: 💕 Valentine's Day Answers from {{from_name}}

Hi {{to_name}},

You received new Valentine's Day questionnaire answers on {{date}}!

=== ANSWERS ===

{{message}}

===================

Sent with love 💖
```

4. Save and copy the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to **Account** → **General** in the dashboard
2. Find your **Public Key** (e.g., `abcDEF123xyz`)

## Step 5: Update Your Code

Open `src/App.jsx` and replace these placeholders (around line 58):

```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',     // Replace with your Service ID
  'YOUR_TEMPLATE_ID',    // Replace with your Template ID
  {
    to_name: 'Akhil',
    from_name: 'Your Valentine',
    message: formattedAnswers,
    date: new Date().toLocaleString()
  },
  'YOUR_PUBLIC_KEY'      // Replace with your Public Key
)
```

### Example:
```javascript
await emailjs.send(
  'service_abc123',
  'template_xyz789',
  {
    to_name: 'Akhil',
    from_name: 'Your Valentine',
    message: formattedAnswers,
    date: new Date().toLocaleString()
  },
  'abcDEF123xyz'
)
```

## Step 6: Test It!

1. Save your changes
2. Run `npm run dev`
3. Fill out the questionnaire
4. Check your email inbox!

## Backup Storage

If email sending fails, answers are automatically saved to browser's localStorage as backup.

To view saved answers, open browser console and type:
```javascript
console.log(JSON.parse(localStorage.getItem('valentineAnswers')))
```

---

## 🎯 Quick Links

- [EmailJS Dashboard](https://dashboard.emailjs.com/)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Free Tier Limits](https://www.emailjs.com/pricing/)

---

**Note:** Keep your EmailJS keys secure. For production, consider using environment variables!
