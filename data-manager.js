// Data Manager - Handles all localStorage operations and data management
class DataManager {
    constructor() {
        this.storageKey = 'healthGuardianData';
        this.medicinesKey = 'healthGuardianMedicines';
        this.progressKey = 'healthGuardianProgress';
        this.settingsKey = 'healthGuardianSettings';
    }

    // Initialize data structure
    initializeData() {
        if (!this.getData(this.medicinesKey)) {
            this.setData(this.medicinesKey, []);
        }
        if (!this.getData(this.progressKey)) {
            this.setData(this.progressKey, {});
        }
        if (!this.getData(this.settingsKey)) {
            this.setDefaultSettings();
        }
    }

    // Set default settings
    setDefaultSettings() {
        const defaultSettings = {
            language: localStorage.getItem('healthGuardianUser') ? 
                JSON.parse(localStorage.getItem('healthGuardianUser')).language : 'english',
            voiceGender: localStorage.getItem('healthGuardianUser') ? 
                JSON.parse(localStorage.getItem('healthGuardianUser')).voiceGender : 'female',
            voiceLanguage: '', // Empty means use app language
            volumeLevel: 'normal',
            largeText: false,
            highContrast: false,
            vibration: true
        };
        this.setData(this.settingsKey, defaultSettings);
        return defaultSettings;
    }

    // Generic data operations
    setData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving data:', error);
            return false;
        }
    }

    getData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error retrieving data:', error);
            return null;
        }
    }

    // Medicine operations
    addMedicine(medicine) {
        const medicines = this.getData(this.medicinesKey) || [];
        medicine.id = Date.now().toString();
        medicine.createdAt = new Date().toISOString();
        medicines.push(medicine);
        this.setData(this.medicinesKey, medicines);
        
        // Initialize progress tracking for this medicine
        this.initializeMedicineProgress(medicine.id);
        return medicine;
    }

    getMedicines() {
        return this.getData(this.medicinesKey) || [];
    }

    getMedicineById(id) {
        const medicines = this.getMedicines();
        return medicines.find(m => m.id === id);
    }

    updateMedicine(id, updates) {
        const medicines = this.getMedicines();
        const index = medicines.findIndex(m => m.id === id);
        if (index !== -1) {
            medicines[index] = { ...medicines[index], ...updates };
            this.setData(this.medicinesKey, medicines);
            return medicines[index];
        }
        return null;
    }

    deleteMedicine(id) {
        const medicines = this.getMedicines();
        const filtered = medicines.filter(m => m.id !== id);
        this.setData(this.medicinesKey, filtered);
        
        // Delete progress data
        const progress = this.getData(this.progressKey) || {};
        delete progress[id];
        this.setData(this.progressKey, progress);
    }

    // Progress tracking
    initializeMedicineProgress(medicineId) {
        const progress = this.getData(this.progressKey) || {};
        if (!progress[medicineId]) {
            progress[medicineId] = {};
        }
        this.setData(this.progressKey, progress);
    }

    setMedicineProgress(medicineId, date, status) {
        const progress = this.getData(this.progressKey) || {};
        if (!progress[medicineId]) {
            progress[medicineId] = {};
        }
        progress[medicineId][date] = status; // 'taken', 'missed', 'skipped'
        this.setData(this.progressKey, progress);
    }

    getMedicineProgress(medicineId) {
        const progress = this.getData(this.progressKey) || {};
        return progress[medicineId] || {};
    }

    getMedicineProgressForDate(medicineId, date) {
        const progress = this.getMedicineProgress(medicineId);
        return progress[date] || null;
    }

    // Get medicines for today
    getMedicinesToday() {
        const medicines = this.getMedicines();
        const today = this.getDateString(new Date());
        return medicines.filter(medicine => {
            if (!this.isMedicineActiveOnDate(medicine, today)) return false;
            return this.isDueTodayByFrequency(medicine, today);
        });
    }

    isMedicineActiveOnDate(medicine, dateString) {
        const startDate = new Date(medicine.startDate);
        const date = new Date(dateString);
        
        if (date < startDate) return false;
        if (medicine.endDate) {
            const endDate = new Date(medicine.endDate);
            if (date > endDate) return false;
        }
        return true;
    }

    isDueTodayByFrequency(medicine, dateString) {
        const date = new Date(dateString);
        const startDate = new Date(medicine.startDate);
        
        switch (medicine.frequency) {
            case 'daily':
                return true;
            
            case 'weekly':
                const dayOfWeek = date.getDay();
                return medicine.selectedDays && medicine.selectedDays.includes(dayOfWeek);
            
            case 'monthly':
                return date.getDate() === startDate.getDate();
            
            case 'custom':
                const daysSinceStart = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
                const cycleLength = medicine.intakeDays + medicine.pauseDays;
                const dayInCycle = daysSinceStart % cycleLength;
                return dayInCycle < medicine.intakeDays;
            
            default:
                return false;
        }
    }

    // Settings operations
    getSettings() {
        return this.getData(this.settingsKey) || this.setDefaultSettings();
    }

    updateSetting(key, value) {
        const settings = this.getSettings();
        settings[key] = value;
        this.setData(this.settingsKey, settings);
    }

    // Utility functions
    getDateString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    getMonthDates(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const dates = [];
        
        for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
            dates.push(this.getDateString(new Date(d)));
        }
        
        return dates;
    }

    // Export data
    exportData() {
        const medicines = this.getMedicines();
        const progress = this.getData(this.progressKey);
        const userData = JSON.parse(localStorage.getItem('healthGuardianUser'));
        
        const exportData = {
            user: userData,
            medicines: medicines,
            progress: progress,
            exportDate: new Date().toISOString()
        };
        
        return JSON.stringify(exportData, null, 2);
    }

    // Clear all data
    clearAllData() {
        localStorage.removeItem(this.medicinesKey);
        localStorage.removeItem(this.progressKey);
        localStorage.removeItem(this.settingsKey);
        localStorage.removeItem('healthGuardianUser');
    }
}

// Initialize global data manager
const dataManager = new DataManager();
dataManager.initializeData();
