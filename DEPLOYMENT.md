# 🚀 Deploy to AWS Amplify

This guide will help you deploy your Valentine's Day website to AWS Amplify.

## Prerequisites

- AWS Account ([Sign up here](https://aws.amazon.com/))
- GitHub repository with your code
- EmailJS credentials configured (see [EMAILJS_SETUP.md](EMAILJS_SETUP.md))

## Deployment Steps

### 1. Push Your Code to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Set Up AWS Amplify

1. **Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)**

2. **Click "New app" → "Host web app"**

3. **Connect GitHub:**
   - Select "GitHub" as your repository service
   - Authorize AWS Amplify to access your GitHub
   - Select your repository: `ValantinesDay`
   - Select branch: `main`
   - Click "Next"

### 3. Configure Build Settings

AWS Amplify will auto-detect the `amplify.yml` file. Verify it shows:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
```

**Click "Next"**

### 4. Add Environment Variables (IMPORTANT!)

Before deploying, add your EmailJS credentials:

1. **Scroll down to "Advanced settings"**
2. **Click "Add environment variable"** and add:

```
VITE_EMAILJS_SERVICE_ID = your_service_id
VITE_EMAILJS_TEMPLATE_ID = your_template_id
VITE_EMAILJS_PUBLIC_KEY = your_public_key
```

**Optional:** If you want to use these environment variables (more secure):

Update `src/App.jsx` line 58:
```javascript
await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  {
    to_name: 'Akhil',
    from_name: 'Your Valentine',
    message: formattedAnswers,
    date: new Date().toLocaleString()
  },
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
)
```

### 5. Deploy

1. **Click "Save and deploy"**
2. Wait 2-3 minutes for the build to complete
3. You'll get a URL like: `https://main.xxxxx.amplifyapp.com`

### 6. Custom Domain (Optional)

1. Go to "Domain management" in your Amplify app
2. Click "Add domain"
3. Follow instructions to connect your custom domain
4. Example: `valentine.yourdomain.com`

## Post-Deployment Checklist

- ✅ Website loads correctly
- ✅ "Yes" button works and shows questionnaire
- ✅ "No" button moves around
- ✅ Submit button sends email (test it!)
- ✅ Mobile responsive (test on phone)

## Automatic Updates

Every time you push to GitHub, AWS Amplify will automatically:
1. Pull the latest code
2. Run `npm ci` and `npm run build`
3. Deploy the new version

## Troubleshooting

### Build Fails
- Check build logs in Amplify console
- Verify `amplify.yml` is in root directory
- Ensure all dependencies are in `package.json`

### Email Not Sending
- Verify EmailJS credentials are correct
- Check browser console for errors
- Ensure EmailJS service is not rate-limited

### Site Shows 404
- Verify `public/_redirects` file exists
- Check build artifacts in Amplify console

## Useful Commands

```bash
# Test build locally before deployment
npm run build
npm run preview

# Check build output
ls -la dist/
```

## Cost

AWS Amplify Free Tier:
- ✅ 1,000 build minutes/month
- ✅ 15 GB served/month
- ✅ Free SSL certificate
- ✅ Free custom domain

Perfect for a Valentine's Day site! 💝

## Support

- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [EmailJS FAQ](https://www.emailjs.com/docs/faq/)

---

## Alternative: Quick Deploy Button

Add this to your README.md for one-click deployment:

```markdown
[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/ajiajith5656/ValantinesDay)
```

---

**🎉 Your Valentine's Day website is now live and ready to capture hearts!**
