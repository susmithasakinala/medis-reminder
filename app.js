// Registration Form Logic
const form = document.getElementById('registrationForm');
let currentStep = 1;
const totalSteps = 3;

// Check if user is already registered
function checkRegistration() {
    const userRegistered = localStorage.getItem('healthGuardianUser');
    if (userRegistered) {
        // User is already registered, redirect to dashboard
        window.location.href = 'home.html';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkRegistration();
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitRegistration();
    });
});

// Navigate to next step
function nextStep(step) {
    // Validate current step
    if (!validateStep(step)) {
        return;
    }

    // Hide current step
    document.getElementById(`form-${step}`).classList.remove('active');
    
    // Update step indicators
    document.getElementById(`step-indicator-${step}`).classList.add('completed');
    
    // Show next step
    currentStep = step + 1;
    document.getElementById(`form-${currentStep}`).classList.add('active');
    document.getElementById(`step-indicator-${currentStep}`).classList.add('active');
    
    // Scroll to top
    document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
}

// Navigate to previous step
function previousStep(step) {
    // Hide current step
    document.getElementById(`form-${step}`).classList.remove('active');
    
    // Remove completed state from indicator
    document.getElementById(`step-indicator-${step}`).classList.remove('active');
    
    // Show previous step
    currentStep = step - 1;
    document.getElementById(`form-${currentStep}`).classList.add('active');
    document.getElementById(`step-indicator-${currentStep}`).classList.remove('completed');
    
    // Scroll to top
    document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
}

// Validate each step
function validateStep(step) {
    let isValid = true;

    if (step === 1) {
        const fullName = document.getElementById('fullName').value.trim();
        const age = document.getElementById('age').value;
        const nameError = document.getElementById('nameError');
        const ageError = document.getElementById('ageError');

        // Clear previous errors
        nameError.style.display = 'none';
        ageError.style.display = 'none';

        // Validate name
        if (!fullName) {
            nameError.textContent = 'Please enter your full name';
            nameError.style.display = 'block';
            isValid = false;
        } else if (fullName.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameError.style.display = 'block';
            isValid = false;
        }

        // Validate age
        if (!age) {
            ageError.textContent = 'Please enter your age';
            ageError.style.display = 'block';
            isValid = false;
        } else if (age < 1 || age > 150) {
            ageError.textContent = 'Please enter a valid age between 1 and 150';
            ageError.style.display = 'block';
            isValid = false;
        }
    } else if (step === 2) {
        const language = document.getElementById('language').value;
        const languageError = document.getElementById('languageError');

        languageError.style.display = 'none';

        if (!language) {
            languageError.textContent = 'Please select your preferred language';
            languageError.style.display = 'block';
            isValid = false;
        }
    } else if (step === 3) {
        const voiceGender = document.getElementById('voiceGender').value;
        const voiceError = document.getElementById('voiceError');

        voiceError.style.display = 'none';

        if (!voiceGender) {
            voiceError.textContent = 'Please select your voice preference';
            voiceError.style.display = 'block';
            isValid = false;
        }
    }

    return isValid;
}

// Submit registration
function submitRegistration() {
    // Validate final step
    if (!validateStep(3)) {
        return;
    }

    // Show loading state
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('loading').style.display = 'block';

    // Collect all form data
    const userData = {
        fullName: document.getElementById('fullName').value.trim(),
        age: parseInt(document.getElementById('age').value),
        gender: document.getElementById('gender').value || 'not-specified',
        language: document.getElementById('language').value,
        voiceGender: document.getElementById('voiceGender').value,
        volumeLevel: document.getElementById('volumeLevel').value,
        registrationDate: new Date().toISOString(),
        medications: []
    };

    // Save to localStorage
    try {
        localStorage.setItem('healthGuardianUser', JSON.stringify(userData));
        
        // Show success message
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            
            // Redirect to dashboard after a short delay
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 500);
        }, 1000);
    } catch (error) {
        console.error('Error saving user data:', error);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('submitBtn').disabled = false;
        alert('Error saving your information. Please try again.');
    }
}

// Optional: Function to get user data from localStorage
function getUserData() {
    const userData = localStorage.getItem('healthGuardianUser');
    return userData ? JSON.parse(userData) : null;
}

// Optional: Function to clear registration (for testing)
function clearRegistration() {
    if (confirm('Are you sure you want to clear your registration? This cannot be undone.')) {
        localStorage.removeItem('healthGuardianUser');
        location.reload();
    }
}
