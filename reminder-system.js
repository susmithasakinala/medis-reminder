// Reminder System - Handles notifications, voice reminders, and alerts
class ReminderSystem {
    constructor() {
        this.activeReminder = null;
        this.reminderInterval = null;
        this.voices = [];
        this.lastCheckedTime = null;
        this.initializeSpeechSynthesis();
        this.startReminderCheckInterval();
    }

    initializeSpeechSynthesis() {
        if ('speechSynthesis' in window) {
            this.voices = speechSynthesis.getVoices();
            if (this.voices.length === 0) {
                window.speechSynthesis.onvoiceschanged = () => {
                    this.voices = speechSynthesis.getVoices();
                };
            }
        }
    }

    startReminderCheckInterval() {
        // Check every 10 seconds for due medicines
        this.reminderInterval = setInterval(() => {
            this.checkForDueMedicines();
        }, 10000); // Check every 10 seconds instead of 60
        
        // Also do an initial check
        this.checkForDueMedicines();
    }

    checkForDueMedicines() {
        try {
            const now = new Date();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            // Skip if we already checked this minute
            if (this.lastCheckedTime === currentTime) {
                return;
            }
            
            const medicines = dataManager.getMedicinesToday();
            console.log(`[Reminder Check] Time: ${currentTime}, Medicines today: ${medicines.length}`);
            
            medicines.forEach(medicine => {
                console.log(`[Medicine] ${medicine.name} - Time: ${medicine.intakeTime}`);
                
                if (medicine.intakeTime === currentTime) {
                    const today = dataManager.getDateString(new Date());
                    const status = dataManager.getMedicineProgressForDate(medicine.id, today);
                    
                    console.log(`[Match Found] ${medicine.name} at ${currentTime}, Status: ${status}`);
                    
                    // Only show reminder if not already marked as taken or skipped
                    if (!status || status === null) {
                        this.lastCheckedTime = currentTime; // Update to prevent duplicate reminders
                        console.log(`[Reminder Triggered] ${medicine.name}`);
                        this.showReminder(medicine);
                    }
                }
            });
        } catch (error) {
            console.error('Error checking for due medicines:', error);
        }
    }

    showReminder(medicine) {
        this.activeReminder = medicine;
        const reminderModal = document.getElementById('reminderModal');
        
        // Update modal content
        document.getElementById('reminderImage').src = medicine.photoData || 'assets/placeholder.svg';
        document.getElementById('reminderName').textContent = medicine.name;
        document.getElementById('reminderDosage').textContent = 
            `${medicine.dosageAmount} ${medicine.dosageUnit}`;
        document.getElementById('reminderInstruction').textContent = 
            this.getInstructionText(medicine.intakeInstruction);
        
        // Show modal
        reminderModal.classList.add('active');
        
        // Play voice reminder
        this.playVoiceReminder(medicine);
        
        // Vibrate if enabled
        if (dataManager.getSettings().vibration) {
            this.vibrate();
        }
    }

    getInstructionText(instruction) {
        const instructions = {
            'before-meal': 'Take before meal',
            'after-meal': 'Take after meal',
            'with-meal': 'Take with meal',
            'empty-stomach': 'Take on empty stomach',
            'anytime': 'Can be taken anytime'
        };
        return instructions[instruction] || instruction;
    }

    playVoiceReminder(medicine) {
        if (!('speechSynthesis' in window)) {
            console.log('Speech synthesis not supported');
            return;
        }

        const settings = dataManager.getSettings();
        const userName = JSON.parse(localStorage.getItem('healthGuardianUser')).fullName;
        
        const text = `Hi ${userName}, it's time to take your medicine. 
            Please take ${medicine.dosageAmount} ${medicine.dosageUnit} of ${medicine.name}. 
            ${this.getInstructionText(medicine.intakeInstruction)}.`;
        
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Use voice language if set, otherwise use app language
        const voiceLanguage = settings.voiceLanguage || settings.language;
        utterance.language = this.getLanguageCode(voiceLanguage);
        utterance.rate = 0.9;
        utterance.pitch = settings.voiceGender === 'female' ? 1.2 : 0.8;
        
        // Set volume
        const volumeMap = { 'low': 0.3, 'normal': 0.7, 'high': 1 };
        utterance.volume = volumeMap[settings.volumeLevel] || 0.7;
        
        // Get available voices
        let voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
            window.speechSynthesis.onvoiceschanged = () => {
                voices = window.speechSynthesis.getVoices();
                this.selectAndSetVoice(voices, utterance, settings.voiceGender, medicine);
            };
        } else {
            this.selectAndSetVoice(voices, utterance, settings.voiceGender, medicine);
        }
    }

    selectAndSetVoice(voices, utterance, voiceGender, medicine) {
        if (voices.length > 0) {
            const voice = this.selectVoiceByGenderAndLanguage(voiceGender, utterance.language, voices);
            if (voice) {
                utterance.voice = voice;
            }
        }
        
        // Repeat reminder
        utterance.onend = () => {
            setTimeout(() => {
                if (this.activeReminder && this.activeReminder.id === medicine.id) {
                    window.speechSynthesis.speak(utterance);
                }
            }, 3000);
        };
        
        window.speechSynthesis.speak(utterance);
    }

    getLanguageCode(language) {
        const languageCodes = {
            'english': 'en-US',
            'spanish': 'es-ES',
            'french': 'fr-FR',
            'german': 'de-DE',
            'hindi': 'hi-IN',
            'gujarati': 'gu-IN',
            'marathi': 'mr-IN',
            'tamil': 'ta-IN',
            'telugu': 'te-IN',
            'chinese': 'zh-CN',
            'japanese': 'ja-JP'
        };
        return languageCodes[language] || 'en-US';
    }

    selectVoiceByGender(gender, languageCode) {
        if (!this.voices || this.voices.length === 0) return null;
        
        const voicesForLanguage = this.voices.filter(v => v.lang.startsWith(languageCode.split('-')[0]));
        
        if (voicesForLanguage.length === 0) return null;
        
        if (gender === 'male') {
            return voicesForLanguage.find(v => v.name.toLowerCase().includes('male')) || voicesForLanguage[0];
        } else if (gender === 'female') {
            return voicesForLanguage.find(v => v.name.toLowerCase().includes('female')) || voicesForLanguage[0];
        }
        
        return voicesForLanguage[0];
    }

    selectVoiceByGenderAndLanguage(gender, languageCode, voices = null) {
        const voicesToUse = voices || this.voices || window.speechSynthesis.getVoices();
        
        if (!voicesToUse || voicesToUse.length === 0) return null;
        
        // Get language code prefix (e.g., 'en' from 'en-US')
        const langPrefix = languageCode.split('-')[0];
        
        // First, try to find voices for the specific language
        let voicesForLanguage = voicesToUse.filter(v => v.lang.startsWith(langPrefix));
        
        // If no voices found for that language, use all voices
        if (voicesForLanguage.length === 0) {
            voicesForLanguage = voicesToUse;
        }
        
        // Filter by gender if specified
        if (gender === 'male') {
            let maleVoices = voicesForLanguage.filter(v => 
                v.name.toLowerCase().includes('male') || 
                v.name.toLowerCase().includes('man') ||
                v.name.toLowerCase().includes('boy')
            );
            if (maleVoices.length > 0) return maleVoices[0];
        } else if (gender === 'female') {
            let femaleVoices = voicesForLanguage.filter(v => 
                v.name.toLowerCase().includes('female') || 
                v.name.toLowerCase().includes('woman') ||
                v.name.toLowerCase().includes('girl')
            );
            if (femaleVoices.length > 0) return femaleVoices[0];
        }
        
        // Fallback to any voice for that language
        return voicesForLanguage[0] || voicesToUse[0];
    }

    vibrate() {
        if ('vibrate' in navigator) {
            // Vibrate: 200ms on, 100ms off, 200ms on
            navigator.vibrate([200, 100, 200]);
        }
    }

    markAsDone() {
        if (!this.activeReminder) return;
        
        const today = dataManager.getDateString(new Date());
        dataManager.setMedicineProgress(this.activeReminder.id, today, 'taken');
        
        this.closeReminder();
        this.showNotification('✓ Medicine marked as taken', 'success');
    }

    markAsSkipped() {
        if (!this.activeReminder) return;
        
        const today = dataManager.getDateString(new Date());
        dataManager.setMedicineProgress(this.activeReminder.id, today, 'skipped');
        
        this.closeReminder();
        this.showNotification('⊘ Medicine skipped', 'warning');
    }

    remindLater() {
        const today = dataManager.getDateString(new Date());
        
        // Mark as not done yet (remove progress entry)
        dataManager.setMedicineProgress(this.activeReminder.id, today, null);
        
        this.closeReminder();
        this.showNotification('⏰ Reminder in 15 minutes', 'info');
        
        // Set reminder for 15 minutes later
        setTimeout(() => {
            if (this.activeReminder) {
                this.showReminder(this.activeReminder);
            }
        }, 15 * 60 * 1000);
    }

    closeReminder() {
        const reminderModal = document.getElementById('reminderModal');
        reminderModal.classList.remove('active');
        
        // Stop speech synthesis
        window.speechSynthesis.cancel();
        
        this.activeReminder = null;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#27ae60' : type === 'warning' ? '#f39c12' : '#3498db'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 2000;
            animation: slideDown 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Schedule notification
    scheduleNotification(title, options = {}) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                icon: 'assets/icon.png',
                badge: 'assets/icon.png',
                ...options
            });
        }
    }

    // Request notification permission
    static requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }
}

// Initialize global reminder system
const reminderSystem = new ReminderSystem();

// Add animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Request notification permission on load
window.addEventListener('load', () => {
    ReminderSystem.requestNotificationPermission();
});
