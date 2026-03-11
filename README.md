# 🩺 Health Guardian - Smart Medication Management System

A comprehensive web-based medication management application designed to improve medication adherence through visual identification, voice-assisted reminders, flexible scheduling, and progress tracking.

## 📋 Features

### 1. **User Onboarding**
- Personalized setup on first launch
- Collects: Name, Age, Preferred Language, Voice Preference
- Multi-step registration form with validation
- Data persists across sessions

### 2. **Medicine Management**
- Add medicines with:
  - Photo/image upload
  - Dosage information
  - Intake instructions (before/after meals, etc.)
  - Flexible scheduling options
  - Additional notes
- Edit and delete medicines
- Full medicine inventory management

### 3. **Flexible Scheduling**
- **Daily**: Every day at specified time
- **Weekly**: Select specific days of the week
- **Monthly**: Same date each month
- **Custom Cycles**: Intake days followed by pause days (e.g., take 1 day, pause 2 days)

### 4. **Home Screen Dashboard**
- Shows all medicines scheduled for today
- Quick status indicators for each medicine
- Visual progress indicators
- One-tap FAB button to add new medicines

### 5. **Voice-Assisted Reminders**
- Automatic reminders at scheduled times
- Full-screen reminder alerts
- Voice notifications in preferred language:
  - English, Spanish, French, German
  - Hindi, Gujarati, Marathi
  - Tamil, Telugu, Chinese, Japanese
- Customizable voice (Male/Female/Neutral)
- Adjustable volume levels
- Vibration alerts
- Reminders repeat until acknowledged

### 6. **Reminder Actions**
Users can respond to reminders with:
- ✓ **Done**: Mark medicine as taken
- ⏰ **Remind Later**: Snooze for 15 minutes
- ✕ **Skip**: Mark medicine as skipped

### 7. **Daily Progress Tracking**
- Calendar view for each medicine
- Color-coded status:
  - 🟢 Green: Medicine taken
  - 🔴 Red: Medicine missed
  - 🟡 Yellow: Medicine skipped
  - ⚪ Gray: Not due
- Monthly view navigation
- Track adherence history

### 8. **Settings & Customization**
- Update language preferences
- Change voice settings
- Adjust reminder volume
- **Accessibility Options**:
  - Larger text size
  - High contrast mode
  - Vibration alerts toggle

### 9. **Data Management**
- Export data as JSON backup
- Clear all data option
- Data stored locally in browser
- Offline functionality

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No backend server required (works completely offline)

### Installation

1. **Extract files** to a local directory or web server
2. **Open** `index.html` in your browser
3. **Complete** the registration form
4. **Start** managing your medications!

### File Structure
```
medisreminder/
├── index.html              # Landing page
├── registration.html       # User onboarding
├── app.html               # Main application
├── app.js                 # Registration logic
├── app-main.js            # Main app controller
├── styles/
│   └── main.css          # All styling
├── js/
│   ├── data-manager.js   # Data & localStorage management
│   └── reminder-system.js # Reminder & notification system
├── assets/
│   └── placeholder.svg   # Default medicine image
└── README.md             # This file
```

## 💾 Data Storage

All data is stored locally in the browser using **localStorage**:
- User profile information
- Medicines and their details
- Progress tracking history
- Settings and preferences
- Backup/Export data

**Note**: Data is specific to each browser/device. Clearing browser data will remove all stored information.

## 🎯 Usage Guide

### Adding Your First Medicine

1. Click the **"+"** button or navigate to **Medicines** screen
2. Upload a medicine photo (optional)
3. Enter medicine name and dosage
4. Select intake instruction and time
5. Choose start and end dates
6. Select frequency:
   - For **weekly**: Select specific days
   - For **custom cycle**: Enter intake and pause days
7. Add notes if needed
8. Click **"Add Medicine"**

### Setting Up Reminders

1. Reminders are automatic based on medicine schedule
2. At scheduled time, you'll receive:
   - Full-screen alert with medicine image
   - Voice reminder in your language
   - Vibration notification
3. Choose to **mark as done**, **remind later**, or **skip**

### Tracking Progress

1. Go to **Progress** screen
2. Select a medicine from dropdown
3. View calendar for current month
4. Check which doses were taken/missed/skipped
5. Navigate months to review history

### Accessibility Features

1. Go to **Settings**
2. Enable **Large Text** for bigger fonts
3. Enable **High Contrast** for better visibility
4. Toggle **Vibration** alerts on/off
5. Adjust voice and volume preferences

## 🗣️ Supported Languages

- English (en-US)
- Spanish (es-ES)
- French (fr-FR)
- German (de-DE)
- Hindi (hi-IN)
- Gujarati (gu-IN)
- Marathi (mr-IN)
- Tamil (ta-IN)
- Telugu (te-IN)
- Chinese Simplified (zh-CN)
- Japanese (ja-JP)

## 🎨 Customization

### Colors
Edit CSS variables in `styles/main.css`:
```css
:root {
    --primary: #667eea;        /* Primary color */
    --success: #27ae60;        /* Success/taken */
    --danger: #e74c3c;         /* Danger/missed */
    --warning: #f39c12;        /* Warning/skipped */
    /* ... more colors ... */
}
```

### Medicine Dosage Units
Predefined units in add medicine form:
- mg (Milligrams)
- ml (Milliliters)
- Tablet(s)
- Capsule(s)
- Drop(s)
- Spray

Add more in `app.html` dosageUnit select.

## 🔐 Privacy & Security

- **No backend**: All data stays on your device
- **No tracking**: No analytics or user monitoring
- **No internet required**: Works completely offline
- **Local storage**: Browser's localStorage (same as websites)
- **Data export**: You can export your data anytime

## ⚙️ Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Mobile Safari | 14+ | ✅ Fully Supported |

## 🔊 Voice Reminders

Voice reminders use the browser's **Web Speech API**:
- Available on most modern browsers
- May require internet for text-to-speech synthesis
- Voice quality depends on browser implementation
- Falls back gracefully if not supported

## 📱 Mobile Optimization

The app is fully responsive and optimized for:
- Desktop browsers
- Tablets
- Mobile phones
- Various screen sizes (320px to 4K)

## 🐛 Troubleshooting

### Reminders not working
1. Check browser notification permissions
2. Ensure system time is correct
3. Check browser console for errors (F12)
4. Try a different browser

### Voice not playing
1. Check volume is not muted
2. Verify language setting matches available voice
3. Enable notifications in browser settings
4. Check browser's text-to-speech support

### Data not saving
1. Check browser's localStorage is enabled
2. Clear cache and try again
3. Check if private/incognito mode is enabled
4. Verify sufficient storage space

### Custom medicine photo not showing
1. Image format must be: JPEG, PNG, or WebP
2. File size should be reasonable (< 5MB)
3. Try uploading a different image
4. Placeholder will be used if upload fails

## 📊 Example Schedules

### Daily with one dose
- Frequency: Daily
- Time: 08:00 AM
- Instructions: After meal

### Weekly - Vitamin on specific days
- Frequency: Weekly
- Days: Monday, Wednesday, Friday
- Time: 09:00 AM
- Instructions: With meal

### Custom cycle - Antibiotic
- Frequency: Custom
- Intake Days: 1
- Pause Days: 2
- Pattern: Take 1 day, skip 2 days
- Time: 12:00 PM
- Instructions: Before meal

### Monthly - Regular check-up medicine
- Frequency: Monthly
- Time: 10:00 AM
- Date: 1st of every month
- Instructions: Empty stomach

## 🤝 Contributing

This is an open-source project. To contribute:
1. Test the app thoroughly
2. Report bugs with screenshots
3. Suggest new features
4. Improve documentation

## 📄 License

This project is provided as-is for personal and educational use.

## 🙏 Acknowledgments

Built with modern web technologies:
- HTML5
- CSS3
- Vanilla JavaScript
- Web Speech API
- localStorage API
- Web Notifications API

## 📞 Support

For issues or questions:
1. Check this README
2. Review browser console (F12)
3. Verify all required fields are filled
4. Test in a different browser
5. Clear browser cache and try again

## 🎯 Future Enhancements

Potential features for future versions:
- Multiple reminders per medicine
- Drug interaction checker
- Medicine cost tracking
- Family/caregiver notifications
- Cloud sync across devices
- Medication history export as PDF
- Integration with health records
- Pill reminder with camera verification
- Advanced analytics and trends

---

**Version**: 1.0  
**Last Updated**: January 2026  
**Health Guardian - Making Medication Management Smart & Accessible** 🩺
