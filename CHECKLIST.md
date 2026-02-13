# ✅ Pre-Deployment Checklist

Complete this checklist before deploying to AWS Amplify:

## 📝 Configuration

- [ ] **EmailJS Setup Complete**
  - [ ] Created EmailJS account
  - [ ] Got Service ID
  - [ ] Got Template ID
  - [ ] Got Public Key
  - [ ] Updated credentials in `src/App.jsx` (line 58-70)
  - [ ] Tested email sending locally

- [ ] **Code Customization**
  - [ ] Changed name from "Akhil" to yours (line 13 in App.jsx)
  - [ ] Reviewed and customized questions if needed
  - [ ] Tested all functionalities locally

## 🔨 Build Ready

- [x] **Build Test Passed** ✅
  - [x] `npm run build` completes successfully
  - [x] `dist/` folder created
  - [x] `_redirects` file included
  - [x] No build errors

## 📤 GitHub

- [ ] **Code in Repository**
  - [ ] All files committed to Git
  - [ ] Pushed to GitHub main branch
  - [ ] Repository is accessible

## 🚀 AWS Amplify

- [ ] **Account Setup**
  - [ ] AWS account created
  - [ ] EmailJS environment variables ready

- [ ] **Deployment**
  - [ ] Connected GitHub to Amplify
  - [ ] Selected correct repository
  - [ ] Added environment variables (optional but recommended):
    - `VITE_EMAILJS_SERVICE_ID`
    - `VITE_EMAILJS_TEMPLATE_ID`
    - `VITE_EMAILJS_PUBLIC_KEY`
  - [ ] Initiated deployment
  - [ ] Build completed successfully

## 🧪 Post-Deployment Testing

- [ ] **Functionality Tests**
  - [ ] Website loads correctly
  - [ ] "No" button moves when hovering/clicking
  - [ ] "Yes" button opens questionnaire
  - [ ] Progress bar works
  - [ ] All questions display correctly
  - [ ] Text areas accept input
  - [ ] Navigation buttons (Back/Next) work
  - [ ] Submit button sends email
  - [ ] Success page displays after submission
  - [ ] Email received in inbox

- [ ] **Responsive Testing**
  - [ ] Test on desktop browser
  - [ ] Test on mobile phone
  - [ ] Test on tablet
  - [ ] All elements visible and clickable
  - [ ] Text is readable

- [ ] **Error Handling**
  - [ ] Test with disconnected internet (should save to localStorage)
  - [ ] Check browser console for errors
  - [ ] Verify localStorage backup works

## 🌐 Optional Enhancements

- [ ] **Custom Domain** (optional)
  - [ ] Domain purchased
  - [ ] Domain connected to Amplify
  - [ ] SSL certificate active

- [ ] **Analytics** (optional)
  - [ ] Google Analytics added
  - [ ] Tracking code installed

## 📋 Final Steps

- [ ] Share the URL with your Valentine! 💕
- [ ] Keep your EmailJS credentials secure
- [ ] Monitor email inbox for responses
- [ ] Celebrate when you get a "Yes"! 🎉

---

## 🆘 Need Help?

- **Build Issues**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Email Issues**: See [EMAILJS_SETUP.md](EMAILJS_SETUP.md)
- **General Questions**: Check [README.md](README.md)

---

**Current Status**: ✅ Build successful! Ready for deployment.

**Next Step**: Follow [DEPLOYMENT.md](DEPLOYMENT.md) to deploy to AWS Amplify.
