// Main App Controller
let currentScreen = 'home-screen';
let selectedFrequency = null;
let selectedDays = [];

// Language translations - Comprehensive UI translations
const translations = {
    english: {
        // Navigation
        home: "Home",
        medicines: "Medicines",
        progress: "Progress",
        settings: "Settings",
        
        // Home screen
        todaysMedicines: "Today's Medicines",
        noMedicines: "📋 No medicines scheduled for today",
        
        // Medicines screen
        myMedicines: "My Medicines",
        noMedicinesAdded: "💊 No medicines added yet",
        
        // Add medicine
        addMedicine: "Add Medicine",
        medicinePhoto: "Medicine Photo",
        uploadPhoto: "📷 Upload Photo",
        medicineName: "Medicine Name *",
        dosage: "Dosage *",
        dosageAmount: "Amount",
        dosageUnit: "Unit",
        intakeInstruction: "Intake Instruction *",
        beforeMeal: "Before Meal",
        afterMeal: "After Meal",
        withMeal: "With Meal",
        emptyStomach: "Empty Stomach",
        anytime: "Anytime",
        intakeTime: "Intake Time *",
        startDate: "Start Date *",
        endDate: "End Date (Leave empty if ongoing)",
        frequency: "Frequency *",
        daily: "Daily",
        weekly: "Weekly",
        monthly: "Monthly",
        customCycle: "Custom Cycle",
        selectDays: "Select Days",
        intakeDays: "Intake Days (e.g., 1 day) *",
        pauseDays: "Pause Days (e.g., 2 days) *",
        notes: "Additional Notes",
        addMedicineBtn: "Add Medicine",
        updateMedicine: "Update Medicine",
        back: "← Back",
        
        // Progress
        trackProgress: "Track Progress",
        selectMedicine: "Select Medicine",
        
        // Settings
        settingsTitle: "Settings",
        userProfile: "User Profile",
        languageSettings: "Language & Voice",
        appLanguage: "App Language",
        voiceGender: "Voice Gender for Reminders",
        voiceLanguage: "Voice Language for Reminders",
        sameAsAppLanguage: "Same as App Language",
        volumeLevel: "Volume Level",
        low: "Low",
        normal: "Normal",
        high: "High",
        accessibility: "Accessibility",
        largerText: "Larger Text Size",
        highContrast: "High Contrast Mode",
        vibrationAlerts: "Vibration Alerts",
        dataManagement: "Data Management",
        exportData: "Export Data",
        clearAllData: "Clear All Data",
        about: "About",
        name: "Name",
        age: "Age",
        gender: "Gender",
        editProfile: "Edit Profile",
        saveChanges: "Save Changes",
        cancel: "Cancel",
        
        // Actions
        done: "✓ Done",
        remindLater: "⏰ Remind Later",
        skip: "✕ Skip",
        edit: "Edit",
        delete: "Delete",
        
        // Buttons
        continue: "Continue",
        completeSetup: "Complete Setup",
        
        // Messages
        medicineAdded: "Medicine added successfully",
        medicineUpdated: "Medicine updated successfully",
        medicineDeleted: "Medicine deleted",
        profileUpdated: "Profile updated successfully",
        languageUpdated: "Language updated",
        voiceUpdated: "Voice gender updated",
        voiceLanguageUpdated: "Voice language updated",
        volumeUpdated: "Volume level updated",
        settingsUpdated: "Settings updated successfully",
        dataExported: "Data exported successfully",
        testReminder: "Playing test reminder..."
    },
    spanish: {
        home: "Inicio",
        medicines: "Medicinas",
        progress: "Progreso",
        settings: "Configuración",
        
        todaysMedicines: "Medicinas de Hoy",
        noMedicines: "📋 No hay medicinas programadas para hoy",
        
        myMedicines: "Mis Medicinas",
        noMedicinesAdded: "💊 Aún no se han añadido medicinas",
        
        addMedicine: "Agregar Medicina",
        medicinePhoto: "Foto de la Medicina",
        uploadPhoto: "📷 Subir Foto",
        medicineName: "Nombre de la Medicina *",
        dosage: "Dosis *",
        dosageAmount: "Cantidad",
        dosageUnit: "Unidad",
        intakeInstruction: "Instrucción de Ingesta *",
        beforeMeal: "Antes de la Comida",
        afterMeal: "Después de la Comida",
        withMeal: "Con la Comida",
        emptyStomach: "Estómago Vacío",
        anytime: "En Cualquier Momento",
        intakeTime: "Hora de Ingesta *",
        startDate: "Fecha de Inicio *",
        endDate: "Fecha de Fin (Dejar vacío si es continuo)",
        frequency: "Frecuencia *",
        daily: "Diario",
        weekly: "Semanal",
        monthly: "Mensual",
        customCycle: "Ciclo Personalizado",
        selectDays: "Seleccionar Días",
        intakeDays: "Días de Ingesta (p. ej., 1 día) *",
        pauseDays: "Días de Pausa (p. ej., 2 días) *",
        notes: "Notas Adicionales",
        addMedicineBtn: "Agregar Medicina",
        updateMedicine: "Actualizar Medicina",
        back: "← Atrás",
        
        trackProgress: "Rastrear Progreso",
        selectMedicine: "Seleccionar Medicina",
        
        settingsTitle: "Configuración",
        userProfile: "Perfil de Usuario",
        languageSettings: "Idioma y Voz",
        appLanguage: "Idioma de la Aplicación",
        voiceGender: "Género de Voz para Recordatorios",
        voiceLanguage: "Idioma de Voz para Recordatorios",
        sameAsAppLanguage: "Igual al Idioma de la Aplicación",
        volumeLevel: "Nivel de Volumen",
        low: "Bajo",
        normal: "Normal",
        high: "Alto",
        accessibility: "Accesibilidad",
        largerText: "Tamaño de Texto Más Grande",
        highContrast: "Modo de Alto Contraste",
        vibrationAlerts: "Alertas de Vibración",
        dataManagement: "Gestión de Datos",
        exportData: "Exportar Datos",
        clearAllData: "Borrar Todos los Datos",
        about: "Acerca de",
        name: "Nombre",
        age: "Edad",
        gender: "Género",
        editProfile: "Editar Perfil",
        saveChanges: "Guardar Cambios",
        cancel: "Cancelar",
        
        done: "✓ Hecho",
        remindLater: "⏰ Recordar Más Tarde",
        skip: "✕ Saltar",
        edit: "Editar",
        delete: "Eliminar",
        
        continue: "Continuar",
        completeSetup: "Completar Configuración",
        
        medicineAdded: "Medicina añadida exitosamente",
        medicineUpdated: "Medicina actualizada exitosamente",
        medicineDeleted: "Medicina eliminada",
        profileUpdated: "Perfil actualizado exitosamente",
        languageUpdated: "Idioma actualizado",
        voiceUpdated: "Género de voz actualizado",
        voiceLanguageUpdated: "Idioma de voz actualizado",
        volumeUpdated: "Nivel de volumen actualizado",
        settingsUpdated: "Configuración actualizada exitosamente",
        dataExported: "Datos exportados exitosamente",
        testReminder: "Reproduciendo recordatorio de prueba..."
    },
    hindi: {
        home: "होम",
        medicines: "दवाइयां",
        progress: "प्रगति",
        settings: "सेटिंग्स",
        
        todaysMedicines: "आज की दवाइयां",
        noMedicines: "📋 आज के लिए कोई दवा निर्धारित नहीं है",
        
        myMedicines: "मेरी दवाइयां",
        noMedicinesAdded: "💊 अभी कोई दवा नहीं जोड़ी गई है",
        
        addMedicine: "दवा जोड़ें",
        medicinePhoto: "दवा की फोटो",
        uploadPhoto: "📷 फोटो अपलोड करें",
        medicineName: "दवा का नाम *",
        dosage: "खुराक *",
        dosageAmount: "मात्रा",
        dosageUnit: "इकाई",
        intakeInstruction: "सेवन निर्देश *",
        beforeMeal: "भोजन से पहले",
        afterMeal: "भोजन के बाद",
        withMeal: "भोजन के साथ",
        emptyStomach: "खाली पेट",
        anytime: "किसी भी समय",
        intakeTime: "सेवन समय *",
        startDate: "शुरुआत की तारीख *",
        endDate: "समाप्ति तारीख (यदि जारी है तो खाली छोड़ें)",
        frequency: "आवृत्ति *",
        daily: "रोज़",
        weekly: "साप्ताहिक",
        monthly: "मासिक",
        customCycle: "कस्टम चक्र",
        selectDays: "दिन चुनें",
        intakeDays: "सेवन दिन (उदा। 1 दिन) *",
        pauseDays: "विराम दिन (उदा। 2 दिन) *",
        notes: "अतिरिक्त नोट्स",
        addMedicineBtn: "दवा जोड़ें",
        updateMedicine: "दवा अपडेट करें",
        back: "← पीछे",
        
        trackProgress: "प्रगति ट्रैक करें",
        selectMedicine: "दवा चुनें",
        
        settingsTitle: "सेटिंग्स",
        userProfile: "उपयोगकर्ता प्रोफ़ाइल",
        languageSettings: "भाषा और आवाज़",
        appLanguage: "ऐप भाषा",
        voiceGender: "रिमाइंडर के लिए आवाज़ का लिंग",
        voiceLanguage: "रिमाइंडर के लिए आवाज़ भाषा",
        sameAsAppLanguage: "ऐप भाषा के समान",
        volumeLevel: "वॉल्यूम स्तर",
        low: "कम",
        normal: "सामान्य",
        high: "उच्च",
        accessibility: "पहुंचने की क्षमता",
        largerText: "बड़ा पाठ आकार",
        highContrast: "उच्च कंट्रास्ट मोड",
        vibrationAlerts: "कंपन सतर्कता",
        dataManagement: "डेटा प्रबंधन",
        exportData: "डेटा निर्यात करें",
        clearAllData: "सभी डेटा साफ़ करें",
        about: "के बारे में",
        name: "नाम",
        age: "उम्र",
        gender: "लिंग",
        editProfile: "प्रोफ़ाइल संपादित करें",
        saveChanges: "परिवर्तन सहेजें",
        cancel: "रद्द करें",
        
        done: "✓ हो गया",
        remindLater: "⏰ बाद में याद दिलाएं",
        skip: "✕ छोड़ें",
        edit: "संपादित करें",
        delete: "हटाएं",
        
        continue: "जारी रखें",
        completeSetup: "सेटअप पूरा करें",
        
        medicineAdded: "दवा सफलतापूर्वक जोड़ी गई",
        medicineUpdated: "दवा सफलतापूर्वक अपडेट की गई",
        medicineDeleted: "दवा हटा दी गई",
        profileUpdated: "प्रोफ़ाइल सफलतापूर्वक अपडेट की गई",
        languageUpdated: "भाषा अपडेट की गई",
        voiceUpdated: "आवाज़ लिंग अपडेट किया गया",
        voiceLanguageUpdated: "आवाज़ भाषा अपडेट की गई",
        volumeUpdated: "वॉल्यूम स्तर अपडेट किया गया",
        settingsUpdated: "सेटिंग्स सफलतापूर्वक अपडेट की गईं",
        dataExported: "डेटा सफलतापूर्वक निर्यात किया गया",
        testReminder: "परीक्षण रिमाइंडर चला रहे हैं..."
    },
    tamil: {
        home: "முகப்பு",
        medicines: "மருந்துகள்",
        progress: "முன்னேற்றம்",
        settings: "அமைப்புகள்",
        
        todaysMedicines: "இன்றைய மருந்துகள்",
        noMedicines: "📋 இன்று கோட்டாக்கப்பட்ட மருந்துகள் இல்லை",
        
        myMedicines: "என் மருந்துகள்",
        noMedicinesAdded: "💊 இதுவரை மருந்துகள் சேர்க்கப்படவில்லை",
        
        addMedicine: "மருந்து சேர்க்கவும்",
        medicinePhoto: "மருந்து புகைப்படம்",
        uploadPhoto: "📷 புகைப்படம் பதிவேற்றவும்",
        medicineName: "மருந்தின் பெயர் *",
        dosage: "மருந்தளவு *",
        dosageAmount: "அளவு",
        dosageUnit: "அலகு",
        intakeInstruction: "உட்கொள்ளும் வழிமுறை *",
        beforeMeal: "உணவுக்கு முன்",
        afterMeal: "உணவுக்குப் பிறகு",
        withMeal: "உணவுடன்",
        emptyStomach: "வெற்றுப் வயிறில்",
        anytime: "எப்போதும்",
        intakeTime: "உட்கொள்ளும் நேரம் *",
        startDate: "தொடக்க தேதி *",
        endDate: "முடிவு தேதி (தொடர்ந்தால் வெற்றிடம் விடவும்)",
        frequency: "அதிர்வெண் *",
        daily: "தினமும்",
        weekly: "வாரம்",
        monthly: "மாसிக",
        customCycle: "தனிப்பயன் சுழற்சி",
        selectDays: "நாட்களைத் தேர்ந்தெடுக்கவும்",
        intakeDays: "உட்கொள்ளும் நாட்கள் (எ.கா. 1 நாள்) *",
        pauseDays: "இடைநிறுத்தக் குறிப்பு (எ.கா. 2 நாட்கள்) *",
        notes: "கூடுதல் குறிப்புகள்",
        addMedicineBtn: "மருந்து சேர்க்கவும்",
        updateMedicine: "மருந்து அப்டேட் செய்யவும்",
        back: "← பின்னுக்குத்",
        
        trackProgress: "முன்னேற்றத்தைக் கண்ணோட்டம் செய்யவும்",
        selectMedicine: "மருந்தைத் தேர்ந்தெடுக்கவும்",
        
        settingsTitle: "அமைப்புகள்",
        userProfile: "ஆள்பணி சுயவிவரம்",
        languageSettings: "மொழி மற்றும் குரல்",
        appLanguage: "பயன்பாட்டு மொழி",
        voiceGender: "நினைவூட்டுதல்களுக்கான குரலின் பாலினம்",
        voiceLanguage: "நினைவூட்டுதல்களுக்கான குரல் மொழி",
        sameAsAppLanguage: "பயன்பாட்டு மொழிக்கு சமம்",
        volumeLevel: "தொகுதி மட்டம்",
        low: "குறைவு",
        normal: "சாதாரணம்",
        high: "உচ்சம்",
        accessibility: "அணுகல்தன்மை",
        largerText: "பெரிய உரை அளவு",
        highContrast: "உচ்च மாறுபாடு பயன்முறை",
        vibrationAlerts: "அதிர்வு எச்சரிக்கைகள்",
        dataManagement: "தரவு நிர்வாகம்",
        exportData: "தரவை ஏற்றுமதி செய்யவும்",
        clearAllData: "அனைத்து தரவையும் அழிக்கவும்",
        about: "பற்றி",
        name: "பெயர்",
        age: "வயது",
        gender: "பாலினம்",
        editProfile: "சுயவிவரத்தைத் திருத்தவும்",
        saveChanges: "மாற்றங்களைச் சேமிக்கவும்",
        cancel: "ரத்து செய்",
        
        done: "✓ முடிந்தது",
        remindLater: "⏰ பின்னர் நினைவூட்டவும்",
        skip: "✕ தவிர்",
        edit: "தொகு",
        delete: "நீக்கு",
        
        continue: "தொடரவும்",
        completeSetup: "அமைப்பை முடிக்கவும்",
        
        medicineAdded: "மருந்து வெற்றிகரமாக சேர்க்கப்பட்டது",
        medicineUpdated: "மருந்து வெற்றிகரமாக அப்டேட் செய்யப்பட்டது",
        medicineDeleted: "மருந்து நீக்கப்பட்டது",
        profileUpdated: "சுயவிவரம் வெற்றிகரமாக அப்டேட் செய்யப்பட்டது",
        languageUpdated: "மொழி அப்டேட் செய்யப்பட்டது",
        voiceUpdated: "குரல் பாலினம் அப்டேட் செய்யப்பட்டது",
        voiceLanguageUpdated: "குரல் மொழி அப்டேட் செய்யப்பட்டது",
        volumeUpdated: "ஒலி வலிமை அப்டேட் செய்யப்பட்டது",
        settingsUpdated: "அமைப்புகள் வெற்றிகரமாக அப்டேட் செய்யப்பட்டது",
        dataExported: "தரவு வெற்றிகரமாக ஏற்றுமதி செய்யப்பட்டது",
        testReminder: "சோதனை நினைவூட்டலை இயக்குகிறது..."
    }
};

// Get current language
function getCurrentLanguage() {
    const settings = dataManager.getSettings();
    return settings.language || 'english';
}

// Translate text
function translate(key) {
    const lang = getCurrentLanguage();
    return translations[lang]?.[key] || translations.english[key] || key;
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Check user registration
    const userRegistered = localStorage.getItem('healthGuardianUser');
    if (!userRegistered) {
        window.location.href = 'registration.html';
        return;
    }

    // Initialize data manager
    dataManager.initializeData();
    
    // Initialize reminder system voice
    if (window.reminderSystem) {
        window.reminderSystem.initializeSpeechSynthesis();
    }
    
    // Setup event listeners
    setupFormListeners();
    setupDaySelectors();
    setupFrequencyButtons();
    
    // Load initial data
    loadHomeScreen();
    loadSettings();
    
    // Apply current app language to UI
    applyLanguageToUI();
    
    // Set today's date
    document.getElementById('today-date').textContent = 
        new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    // Set minimum date to today for start date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').value = today;
    document.getElementById('startDate').min = today;

    // Handle hash-based navigation (when coming from home.html buttons)
    const hash = window.location.hash.slice(1); // Remove '#'
    if (hash) {
        const screenMap = {
            'add-medicine': 'add-medicine-screen',
            'medicines': 'medicines-screen',
            'home': 'home-screen',
            'progress': 'progress-screen',
            'settings': 'settings-screen'
        };
        if (screenMap[hash]) {
            switchScreen(screenMap[hash]);
        }
    }

    // Close modals when clicking outside
    const editProfileModal = document.getElementById('editProfileModal');
    window.addEventListener('click', function(e) {
        if (e.target === editProfileModal) {
            closeEditProfile();
        }
    });
});

// Screen Navigation
function switchScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show selected screen
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;
    
    // Update nav button active state
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-screen="${screenId}"]`).classList.add('active');
    
    // Load screen-specific data
    if (screenId === 'medicines-screen') {
        loadMedicinesList();
    } else if (screenId === 'progress-screen') {
        loadProgressScreen();
    } else if (screenId === 'home-screen') {
        loadHomeScreen();
    }
    
    // Scroll to top
    document.querySelector('.content-area').scrollTop = 0;
}

function navigateTo(screen) {
    const screenMap = {
        'home': 'home-screen',
        'medicines': 'medicines-screen',
        'add-medicine': 'add-medicine-screen',
        'progress': 'progress-screen',
        'settings': 'settings-screen'
    };
    switchScreen(screenMap[screen] || screen);
}

// Go back to dashboard
function goToDashboard() {
    window.location.href = 'home.html';
}

// ========== HOME SCREEN ==========
function loadHomeScreen() {
    const medicinesToday = dataManager.getMedicinesToday();
    const container = document.getElementById('medicinesToday');
    
    if (medicinesToday.length === 0) {
        container.innerHTML = '<div class="empty-state">📋 No medicines scheduled for today</div>';
        return;
    }
    
    container.innerHTML = medicinesToday.map(medicine => {
        const today = dataManager.getDateString(new Date());
        const status = dataManager.getMedicineProgressForDate(medicine.id, today);
        
        let statusClass = 'pending';
        let statusIcon = '◯';
        
        if (status === 'taken') {
            statusClass = 'taken';
            statusIcon = '✓';
        } else if (status === 'missed') {
            statusClass = 'missed';
            statusIcon = '✕';
        } else if (status === 'skipped') {
            statusClass = 'skipped';
            statusIcon = '⊘';
        }
        
        return `
            <div class="medicine-card">
                <img src="${medicine.photoData || 'assets/placeholder.svg'}" alt="${medicine.name}">
                <div class="medicine-card-content">
                    <div class="medicine-card-name">${medicine.name}</div>
                    <div class="medicine-card-dosage">${medicine.dosageAmount} ${medicine.dosageUnit}</div>
                    <div class="medicine-card-time">🕐 ${medicine.intakeTime}</div>
                    <div class="medicine-card-instruction">${getInstructionText(medicine.intakeInstruction)}</div>
                </div>
                <div class="medicine-card-status">
                    <div class="status-badge ${statusClass}" onclick="toggleMedicineStatus('${medicine.id}', '${today}')" title="Click to change status">
                        ${statusIcon}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function toggleMedicineStatus(medicineId, date) {
    const currentStatus = dataManager.getMedicineProgressForDate(medicineId, date);
    let newStatus;
    
    switch(currentStatus) {
        case 'taken':
            newStatus = 'missed';
            break;
        case 'missed':
            newStatus = 'skipped';
            break;
        case 'skipped':
            newStatus = null;
            break;
        default:
            newStatus = 'taken';
    }
    
    dataManager.setMedicineProgress(medicineId, date, newStatus);
    loadHomeScreen();
}

function getInstructionText(instruction) {
    const instructions = {
        'before-meal': '📍 Before meal',
        'after-meal': '📍 After meal',
        'with-meal': '📍 With meal',
        'empty-stomach': '📍 Empty stomach',
        'anytime': '📍 Anytime'
    };
    return instructions[instruction] || instruction;
}

// ========== MEDICINES LIST SCREEN ==========
function loadMedicinesList() {
    const medicines = dataManager.getMedicines();
    const container = document.getElementById('medicinesList');
    
    if (medicines.length === 0) {
        container.innerHTML = '<div class="empty-state">💊 No medicines added yet</div>';
        return;
    }
    
    container.innerHTML = medicines.map(medicine => `
        <div class="medicines-list-item">
            <div class="medicine-item-content">
                <img src="${medicine.photoData || 'assets/placeholder.svg'}" alt="${medicine.name}" class="medicine-item-img">
                <div class="medicine-item-details">
                    <h3>${medicine.name}</h3>
                    <p>${medicine.dosageAmount} ${medicine.dosageUnit}</p>
                    <p>⏰ ${medicine.intakeTime}</p>
                    <p>${getInstructionText(medicine.intakeInstruction)}</p>
                </div>
            </div>
            <div class="medicine-item-actions">
                <button onclick="editMedicine('${medicine.id}')" title="Edit">✏️</button>
                <button onclick="deleteMedicineConfirm('${medicine.id}')" title="Delete">🗑️</button>
            </div>
        </div>
    `).join('');
}

function editMedicine(medicineId) {
    const medicine = dataManager.getMedicineById(medicineId);
    if (!medicine) return;
    
    // Populate form with medicine data
    document.getElementById('medicineName').value = medicine.name;
    document.getElementById('dosageAmount').value = medicine.dosageAmount;
    document.getElementById('dosageUnit').value = medicine.dosageUnit;
    document.getElementById('intakeInstruction').value = medicine.intakeInstruction;
    document.getElementById('intakeTime').value = medicine.intakeTime;
    document.getElementById('startDate').value = medicine.startDate;
    document.getElementById('endDate').value = medicine.endDate || '';
    document.getElementById('notes').value = medicine.notes || '';
    
    if (medicine.photoData) {
        document.getElementById('medicinePreview').src = medicine.photoData;
    }
    
    // Set frequency
    selectFrequency(medicine.frequency);
    if (medicine.frequency === 'weekly' && medicine.selectedDays) {
        medicine.selectedDays.forEach(day => {
            document.querySelector(`[data-day="${day}"]`).classList.add('active');
        });
        document.getElementById('selectedDays').value = medicine.selectedDays.join(',');
    }
    if (medicine.frequency === 'custom') {
        document.getElementById('intakeDays').value = medicine.intakeDays;
        document.getElementById('pauseDays').value = medicine.pauseDays;
    }
    
    // Store edit ID
    document.getElementById('addMedicineForm').dataset.editId = medicineId;
    document.querySelector('.btn-primary').textContent = 'Update Medicine';
    
    navigateTo('add-medicine');
}

function deleteMedicineConfirm(medicineId) {
    if (confirm('Are you sure you want to delete this medicine? This cannot be undone.')) {
        dataManager.deleteMedicine(medicineId);
        loadMedicinesList();
        reminderSystem.showNotification('Medicine deleted', 'success');
    }
}

// ========== ADD MEDICINE FORM ==========
function setupFormListeners() {
    const form = document.getElementById('addMedicineForm');
    form.addEventListener('submit', handleAddMedicine);
}

function setupFrequencyButtons() {
    document.querySelectorAll('.freq-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
}

function setupDaySelectors() {
    document.querySelectorAll('.day-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            updateSelectedDays();
        });
    });
}

function selectFrequency(frequency) {
    selectedFrequency = frequency;
    document.getElementById('frequency').value = frequency;
    
    // Update button states
    document.querySelectorAll('.freq-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-freq="${frequency}"]`).classList.add('active');
    
    // Show/hide relevant options
    document.getElementById('weeklyDays').classList.toggle('hidden', frequency !== 'weekly');
    document.getElementById('customCycle').classList.toggle('hidden', frequency !== 'custom');
}

function updateSelectedDays() {
    const selected = Array.from(document.querySelectorAll('.day-btn.active'))
        .map(btn => btn.dataset.day);
    selectedDays = selected;
    document.getElementById('selectedDays').value = selected.join(',');
}

function previewPhoto(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('medicinePreview').src = e.target.result;
            // Store the data URL for later
            window.medicinePhotoData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function handleAddMedicine(e) {
    e.preventDefault();
    
    // Validate form
    if (!selectedFrequency) {
        alert('Please select a frequency');
        return;
    }
    
    if (selectedFrequency === 'weekly' && selectedDays.length === 0) {
        alert('Please select at least one day');
        return;
    }
    
    if (selectedFrequency === 'custom') {
        const intakeDays = document.getElementById('intakeDays').value;
        const pauseDays = document.getElementById('pauseDays').value;
        if (!intakeDays || !pauseDays) {
            alert('Please enter intake and pause days');
            return;
        }
    }
    
    // Collect form data
    const medicine = {
        name: document.getElementById('medicineName').value,
        dosageAmount: parseFloat(document.getElementById('dosageAmount').value),
        dosageUnit: document.getElementById('dosageUnit').value,
        intakeInstruction: document.getElementById('intakeInstruction').value,
        intakeTime: document.getElementById('intakeTime').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        frequency: selectedFrequency,
        notes: document.getElementById('notes').value,
        photoData: window.medicinePhotoData || 'assets/placeholder.svg'
    };
    
    // Add frequency-specific data
    if (selectedFrequency === 'weekly') {
        medicine.selectedDays = selectedDays.map(d => parseInt(d));
    } else if (selectedFrequency === 'custom') {
        medicine.intakeDays = parseInt(document.getElementById('intakeDays').value);
        medicine.pauseDays = parseInt(document.getElementById('pauseDays').value);
    }
    
    // Add or update medicine
    const editId = document.getElementById('addMedicineForm').dataset.editId;
    if (editId) {
        dataManager.updateMedicine(editId, medicine);
        document.getElementById('addMedicineForm').dataset.editId = '';
        document.querySelector('.btn-primary').textContent = 'Add Medicine';
        reminderSystem.showNotification('Medicine updated successfully', 'success');
    } else {
        dataManager.addMedicine(medicine);
        reminderSystem.showNotification('Medicine added successfully', 'success');
    }
    
    // Reset form
    resetForm();
    navigateTo('medicines');
}

function resetForm() {
    document.getElementById('addMedicineForm').reset();
    document.getElementById('medicinePreview').src = 'assets/placeholder.svg';
    window.medicinePhotoData = null;
    selectedFrequency = null;
    selectedDays = [];
    
    document.querySelectorAll('.freq-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.day-btn').forEach(btn => btn.classList.remove('active'));
    
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').value = today;
}

// ========== PROGRESS TRACKING ==========
function loadProgressScreen() {
    const medicines = dataManager.getMedicines();
    const selector = document.getElementById('medicineSelector');
    
    if (medicines.length === 0) {
        document.getElementById('progressCalendar').innerHTML = 
            '<div class="empty-state">No medicines to track</div>';
        return;
    }
    
    selector.innerHTML = '<option value="">Select Medicine</option>' + 
        medicines.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
}

function loadMedicineProgress(medicineId) {
    if (!medicineId) {
        document.getElementById('progressCalendar').innerHTML = '';
        return;
    }
    
    const medicine = dataManager.getMedicineById(medicineId);
    const progress = dataManager.getMedicineProgress(medicineId);
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    const dates = dataManager.getMonthDates(year, month);
    
    let calendarHtml = `
        <div class="calendar-header">
            <button onclick="previousMonth()">←</button>
            <h3>${new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
            <button onclick="nextMonth()">→</button>
        </div>
        <div class="calendar-days">
            <div class="calendar-day-header">Sun</div>
            <div class="calendar-day-header">Mon</div>
            <div class="calendar-day-header">Tue</div>
            <div class="calendar-day-header">Wed</div>
            <div class="calendar-day-header">Thu</div>
            <div class="calendar-day-header">Fri</div>
            <div class="calendar-day-header">Sat</div>
    `;
    
    // Add empty cells for days before month starts
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarHtml += '<div class="calendar-date"></div>';
    }
    
    // Add dates
    dates.forEach(date => {
        const status = progress[date];
        let statusClass = 'not-due';
        
        if (status === 'taken') statusClass = 'taken';
        else if (status === 'missed') statusClass = 'missed';
        else if (status === 'skipped') statusClass = 'skipped';
        else if (new Date(date) > new Date()) statusClass = 'future';
        else if (dataManager.isMedicineActiveOnDate(medicine, date) && 
                 dataManager.isDueTodayByFrequency(medicine, date)) {
            statusClass = 'missed';
        }
        
        const day = new Date(date).getDate();
        calendarHtml += `<div class="calendar-date ${statusClass}">${day}</div>`;
    });
    
    calendarHtml += '</div>';
    document.getElementById('progressCalendar').innerHTML = calendarHtml;
}

function previousMonth() {
    // Implementation for previous month
    loadMedicineProgress(document.getElementById('medicineSelector').value);
}

function nextMonth() {
    // Implementation for next month
    loadMedicineProgress(document.getElementById('medicineSelector').value);
}

// ========== SETTINGS ==========
function loadSettings() {
    const user = JSON.parse(localStorage.getItem('healthGuardianUser'));
    const settings = dataManager.getSettings();
    
    document.getElementById('settingsName').textContent = user.fullName;
    document.getElementById('settingsAge').textContent = user.age;
    document.getElementById('settingsLanguage').value = settings.language;
    document.getElementById('settingsVoiceGender').value = settings.voiceGender;
    document.getElementById('settingsVoiceLanguage').value = settings.voiceLanguage || '';
    document.getElementById('volumeLevel').value = settings.volumeLevel;
    document.getElementById('largeText').checked = settings.largeText;
    document.getElementById('highContrast').checked = settings.highContrast;
    document.getElementById('vibration').checked = settings.vibration;
}

function updateLanguage(language) {
    dataManager.updateSetting('language', language);
    applyLanguageToUI();
    reminderSystem.showNotification(translate('languageUpdated'), 'success');
}

function applyLanguageToUI() {
    // Update all visible text on the page based on current language
    
    // Navigation buttons
    const navButtons = {
        'home-screen': 'home',
        'medicines-screen': 'medicines',
        'progress-screen': 'progress',
        'settings-screen': 'settings'
    };
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        const screen = btn.dataset.screen;
        const labelKey = navButtons[screen];
        if (labelKey) {
            btn.querySelector('.nav-label').textContent = translate(labelKey);
        }
    });
    
    // Screen headers
    document.querySelectorAll('.screen-header h1').forEach(header => {
        const screen = header.closest('.screen');
        if (screen.id === 'home-screen') {
            header.textContent = translate('todaysMedicines');
        } else if (screen.id === 'medicines-screen') {
            header.textContent = translate('myMedicines');
        } else if (screen.id === 'add-medicine-screen') {
            header.textContent = translate('addMedicine');
        } else if (screen.id === 'progress-screen') {
            header.textContent = translate('trackProgress');
        } else if (screen.id === 'settings-screen') {
            header.textContent = translate('settingsTitle');
        }
    });
    
    // Form labels
    const labelMap = {
        'medicineName': 'medicineName',
        'dosageAmount': 'dosageAmount',
        'dosageUnit': 'dosageUnit',
        'intakeInstruction': 'intakeInstruction',
        'intakeTime': 'intakeTime',
        'startDate': 'startDate',
        'endDate': 'endDate',
        'notes': 'notes'
    };
    
    Object.entries(labelMap).forEach(([elemId, transKey]) => {
        const elem = document.querySelector(`label[for="${elemId}"]`);
        if (elem) {
            elem.textContent = translate(transKey);
        }
    });
    
    // Frequency buttons
    const freqMap = {
        'daily': 'daily',
        'weekly': 'weekly',
        'monthly': 'monthly',
        'custom': 'customCycle'
    };
    
    document.querySelectorAll('.freq-btn').forEach(btn => {
        const freq = btn.dataset.freq;
        if (freqMap[freq]) {
            btn.textContent = translate(freqMap[freq]);
        }
    });
    
    // Settings labels
    const settingsMap = {
        'settingsLanguage': 'appLanguage',
        'settingsVoiceGender': 'voiceGender',
        'settingsVoiceLanguage': 'voiceLanguage',
        'volumeLevel': 'volumeLevel'
    };
    
    Object.entries(settingsMap).forEach(([elemId, transKey]) => {
        const elem = document.querySelector(`label[for="${elemId}"]`);
        if (elem) {
            elem.textContent = translate(transKey);
        }
    });
    
    // Settings checkboxes
    const checkboxMap = {
        'largeText': 'largerText',
        'highContrast': 'highContrast',
        'vibration': 'vibrationAlerts'
    };
    
    Object.entries(checkboxMap).forEach(([elemId, transKey]) => {
        const label = document.querySelector(`label[for="${elemId}"]`);
        if (label) {
            label.textContent = translate(transKey);
        }
    });
    
    // Settings section titles
    const sectionTitles = document.querySelectorAll('.settings-section h2');
    if (sectionTitles[0]) sectionTitles[0].textContent = translate('userProfile');
    if (sectionTitles[1]) sectionTitles[1].textContent = translate('languageSettings');
    if (sectionTitles[2]) sectionTitles[2].textContent = translate('accessibility');
    if (sectionTitles[3]) sectionTitles[3].textContent = translate('dataManagement');
    if (sectionTitles[4]) sectionTitles[4].textContent = translate('about');
    
    // Reload current screen content
    if (currentScreen === 'home-screen') {
        loadHomeScreen();
    } else if (currentScreen === 'medicines-screen') {
        loadMedicinesList();
    } else if (currentScreen === 'progress-screen') {
        loadProgressScreen();
    }
}

function updateVoice(voice) {
    dataManager.updateSetting('voiceGender', voice);
    reminderSystem.showNotification('Voice gender updated', 'success');
}

function updateVoiceLanguage(language) {
    dataManager.updateSetting('voiceLanguage', language);
    reminderSystem.showNotification('Voice language updated', 'success');
}

function updateVolume(volume) {
    dataManager.updateSetting('volumeLevel', volume);
    reminderSystem.showNotification('Volume level updated', 'success');
}

function testVoiceReminder() {
    const settings = dataManager.getSettings();
    const user = JSON.parse(localStorage.getItem('healthGuardianUser'));
    
    if (!('speechSynthesis' in window)) {
        alert('Speech synthesis not supported on this device');
        return;
    }
    
    const text = `Hi ${user.fullName}, this is a test of your voice reminder. Please take 1 tablet of Test Medicine. You can take it anytime.`;
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Use voice language if set, otherwise use app language
    const voiceLanguage = settings.voiceLanguage || settings.language;
    
    // Get language code
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
    
    utterance.language = languageCodes[voiceLanguage] || 'en-US';
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
            selectAndPlayVoice(voices, utterance, settings.voiceGender);
        };
    } else {
        selectAndPlayVoice(voices, utterance, settings.voiceGender);
    }
    
    reminderSystem.showNotification('🔊 Playing test reminder...', 'info');
}

function selectAndPlayVoice(voices, utterance, voiceGender) {
    if (voices.length === 0) {
        window.speechSynthesis.speak(utterance);
        return;
    }
    
    // Get language prefix
    const langPrefix = utterance.language.split('-')[0];
    
    // Find voices for the language
    let voicesForLanguage = voices.filter(v => v.lang.startsWith(langPrefix));
    
    if (voicesForLanguage.length === 0) {
        voicesForLanguage = voices;
    }
    
    // Find voice by gender
    if (voiceGender === 'male') {
        let maleVoices = voicesForLanguage.filter(v => 
            v.name.toLowerCase().includes('male') || 
            v.name.toLowerCase().includes('man') ||
            v.name.toLowerCase().includes('boy')
        );
        if (maleVoices.length > 0) {
            utterance.voice = maleVoices[0];
        } else if (voicesForLanguage.length > 0) {
            utterance.voice = voicesForLanguage[0];
        }
    } else if (voiceGender === 'female') {
        let femaleVoices = voicesForLanguage.filter(v => 
            v.name.toLowerCase().includes('female') || 
            v.name.toLowerCase().includes('woman') ||
            v.name.toLowerCase().includes('girl')
        );
        if (femaleVoices.length > 0) {
            utterance.voice = femaleVoices[0];
        } else if (voicesForLanguage.length > 0) {
            utterance.voice = voicesForLanguage[0];
        }
    } else if (voicesForLanguage.length > 0) {
        utterance.voice = voicesForLanguage[0];
    }
    
    window.speechSynthesis.speak(utterance);
}

// Manual reminder test (for debugging)
function testReminderManual() {
    const medicines = dataManager.getMedicinesToday();
    
    if (medicines.length === 0) {
        alert('No medicines scheduled for today to test');
        return;
    }
    
    // Test with first medicine
    const testMedicine = medicines[0];
    reminderSystem.showReminder(testMedicine);
}

function updateAccessibility() {
    const settings = {
        largeText: document.getElementById('largeText').checked,
        highContrast: document.getElementById('highContrast').checked,
        vibration: document.getElementById('vibration').checked
    };
    
    Object.entries(settings).forEach(([key, value]) => {
        dataManager.updateSetting(key, value);
    });
    
    // Apply large text
    document.body.classList.toggle('large-text', settings.largeText);
    document.body.classList.toggle('high-contrast', settings.highContrast);
    
    reminderSystem.showNotification('Accessibility settings updated', 'success');
}

function editProfile() {
    const user = JSON.parse(localStorage.getItem('healthGuardianUser'));
    document.getElementById('editName').value = user.fullName;
    document.getElementById('editAge').value = user.age;
    document.getElementById('editGender').value = user.gender || '';
    
    const modal = document.getElementById('editProfileModal');
    modal.classList.add('active');
}

function closeEditProfile() {
    const modal = document.getElementById('editProfileModal');
    modal.classList.remove('active');
}

function saveProfile(event) {
    event.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('healthGuardianUser'));
    user.fullName = document.getElementById('editName').value.trim();
    user.age = parseInt(document.getElementById('editAge').value);
    user.gender = document.getElementById('editGender').value;
    
    localStorage.setItem('healthGuardianUser', JSON.stringify(user));
    loadSettings();
    closeEditProfile();
    reminderSystem.showNotification('Profile updated successfully', 'success');
}

function exportData() {
    const data = dataManager.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health-guardian-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    reminderSystem.showNotification('Data exported successfully', 'success');
}

function clearAllData() {
    if (confirm('Are you sure? This will delete all your data permanently!')) {
        if (confirm('This is your last chance. Are you absolutely sure?')) {
            dataManager.clearAllData();
            window.location.href = 'registration.html';
        }
    }
}

// Reminder Modal Functions
function closeReminder() {
    reminderSystem.closeReminder();
}

function markAsDone() {
    reminderSystem.markAsDone();
    loadHomeScreen();
}

function remindLater() {
    reminderSystem.remindLater();
}

function markAsSkipped() {
    reminderSystem.markAsSkipped();
    loadHomeScreen();
}

// Apply saved accessibility settings on load
window.addEventListener('load', () => {
    const settings = dataManager.getSettings();
    if (settings.largeText) document.body.classList.add('large-text');
    if (settings.highContrast) document.body.classList.add('high-contrast');
});
