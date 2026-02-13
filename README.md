# 💝 Valentine's Day Proposal Website

An interactive Valentine's Day proposal website built with React + Vite. Features an un-clickable "No" button that runs away and a multi-step questionnaire that sends answers via email.

## ✨ Features

- 💘 **Interactive Landing Page** - Romantic Valentine's Day themed design
- 🏃 **Elusive "No" Button** - Moves away when you try to click it
- 📝 **6-Question Survey** - Captures heartfelt answers
- 📧 **Email Integration** - Sends responses directly via EmailJS
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 🎨 **Beautiful Animations** - Smooth transitions and effects
- 💾 **Backup Storage** - Saves to localStorage if email fails

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173` to see your site!

## 📧 EmailJS Setup

To receive questionnaire answers via email:

1. **Sign up at [EmailJS.com](https://www.emailjs.com/)**
2. **Get your credentials** (Service ID, Template ID, Public Key)
3. **Update `src/App.jsx`** with your credentials

See detailed instructions in [EMAILJS_SETUP.md](EMAILJS_SETUP.md)

## 🌐 Deploy to AWS Amplify

### One-Click Deploy

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/ajiajith5656/ValantinesDay)

### Manual Deploy

Full deployment guide: [DEPLOYMENT.md](DEPLOYMENT.md)

**Quick Steps:**
1. Push code to GitHub
2. Connect repo to AWS Amplify
3. Add EmailJS environment variables
4. Deploy!

## 📁 Project Structure

```
ValantinesDay/
├── src/
│   ├── App.jsx          # Main component with questionnaire logic
│   ├── App.css          # Styling and animations
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── public/
│   └── _redirects       # SPA routing for Amplify
├── amplify.yml          # AWS Amplify build config
├── EMAILJS_SETUP.md     # Email configuration guide
├── DEPLOYMENT.md        # Deployment instructions
└── package.json         # Dependencies
```

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **Vite 7** - Build tool
- **EmailJS** - Email service
- **CSS3** - Animations & styling
- **AWS Amplify** - Hosting

## 🎨 Customization

### Change Name
Edit line 13 in `src/App.jsx`:
```javascript
<p className="name">Akhil</p>  // Change to your name
```

### Modify Questions
Edit the `questions` array in `src/App.jsx` (lines 12-19)

### Customize Colors
Adjust CSS variables in `src/App.css`

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 📄 License

MIT License - feel free to use this for your own Valentine's proposal!

## 💖 Made With Love

Created for a special Valentine's Day 2026 💕

---

**Questions?** Open an issue or check the documentation files.

