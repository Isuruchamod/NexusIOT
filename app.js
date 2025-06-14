// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDml7yKe_irqHKTeDzusrN8spLDXVO78p0",
    databaseURL: "https://iot1-4accc-default-rtdb.firebaseio.com/",
    projectId: "iot1-4accc",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// DOM elements
const darkModeToggle = document.getElementById('darkModeToggle');
const ledSwitches = document.querySelectorAll('.led-switch');
const lightCards = document.querySelectorAll('.light-card');
const notificationContainer = document.getElementById('notificationContainer');
const allOnBtn = document.getElementById('allOnBtn');
const allOffBtn = document.getElementById('allOffBtn');
const voiceBtn = document.getElementById('voiceBtn');

// Voice control state
let voiceRecognition = null;
let isVoiceActive = false;

// Theme toggle
darkModeToggle.addEventListener('change', () => {
    document.body.setAttribute('data-theme', darkModeToggle.checked ? 'dark' : 'light');
    localStorage.setItem('theme', darkModeToggle.checked ? 'dark' : 'light');
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    darkModeToggle.checked = true;
    document.body.setAttribute('data-theme', 'dark');
}

// Initialize LED states from Firebase
function initializeLEDStates() {
    for (let i = 1; i <= 4; i++) {
        const ledRef = database.ref(`led/led${i}`);
        ledRef.on('value', (snapshot) => {
            const state = snapshot.val();
            const switchElement = document.querySelector(`.led-switch[data-led="${i}"]`);
            const lightCard = document.querySelector(`.light-card[data-led="${i}"]`);
            
            if (switchElement) {
                switchElement.checked = state === 1;
            }
            
            if (lightCard) {
                if (state === 1) {
                    lightCard.classList.add('active');
                } else {
                    lightCard.classList.remove('active');
                }
            }
        });
    }
}

// Handle LED switch changes
ledSwitches.forEach(switchElement => {
    switchElement.addEventListener('change', function() {
        const ledNumber = this.getAttribute('data-led');
        const newState = this.checked ? 1 : 0;
        
        database.ref(`led/led${ledNumber}`).set(newState)
            .then(() => {
                showNotification(`Light ${ledNumber} turned ${newState ? 'on' : 'off'}`, 'success');
            })
            .catch(error => {
                console.error("Error updating LED state:", error);
                this.checked = !this.checked;
                showNotification("Failed to update light", 'error');
            });
    });
});

// All lights control
function turnAllLights(state) {
    const updates = {};
    for (let i = 1; i <= 4; i++) {
        updates[`led/led${i}`] = state;
    }
    
    database.ref().update(updates)
        .then(() => {
            showNotification(`All lights turned ${state ? 'on' : 'off'}`, 'success');
        })
        .catch(error => {
            console.error("Error updating all lights:", error);
            showNotification("Failed to update lights", 'error');
        });
}

// Voice control functions
function setupVoiceControl() {
    if (isVoiceActive) {
        stopVoiceControl();
        return;
    }

    if (!('webkitSpeechRecognition' in window)) {
        showNotification("Voice control not supported in your browser", 'error');
        return;
    }

    // Request microphone permission
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
            startVoiceRecognition();
        })
        .catch(err => {
            console.error("Microphone access denied:", err);
            showNotification("Please allow microphone access for voice control", 'error');
            voiceBtn.classList.remove('active');
        });
}

function startVoiceRecognition() {
    voiceRecognition = new webkitSpeechRecognition();
    voiceRecognition.continuous = true;
    voiceRecognition.interimResults = false;
    voiceRecognition.lang = 'en-US';

    voiceRecognition.onstart = function() {
        isVoiceActive = true;
        voiceBtn.classList.add('active');
        showNotification("Listening... Try saying 'turn on living room light'", 'info');
    };

    voiceRecognition.onresult = function(event) {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        processVoiceCommand(transcript);
    };

    voiceRecognition.onerror = function(event) {
        console.error("Voice recognition error:", event.error);
        
        let errorMsg = "Voice error occurred";
        if (event.error === 'no-speech') {
            errorMsg = "No speech detected";
        } else if (event.error === 'audio-capture') {
            errorMsg = "Microphone not available";
        } else if (event.error === 'not-allowed') {
            errorMsg = "Microphone access denied";
        }
        
        showNotification(errorMsg, 'error');
        stopVoiceControl();
    };

    voiceRecognition.onend = function() {
        if (isVoiceActive) {
            setTimeout(() => voiceRecognition.start(), 500);
        }
    };

    voiceRecognition.start();
}

function stopVoiceControl() {
    if (voiceRecognition) {
        voiceRecognition.stop();
    }
    isVoiceActive = false;
    voiceRecognition = null;
    voiceBtn.classList.remove('active');
    showNotification("Voice control turned off", 'info');
}

function processVoiceCommand(command) {
    console.log("Voice command:", command);
    
    if (command.includes('turn on') || command.includes('switch on')) {
        if (command.includes('all') || command.includes('every')) {
            turnAllLights(1);
        } else if (command.includes('living room') || command.includes('one') || command.includes('1')) {
            toggleLight(1, true);
        } else if (command.includes('bedroom') || command.includes('two') || command.includes('2')) {
            toggleLight(2, true);
        } else if (command.includes('kitchen') || command.includes('three') || command.includes('3')) {
            toggleLight(3, true);
        } else if (command.includes('bathroom') || command.includes('four') || command.includes('4')) {
            toggleLight(4, true);
        }
    } else if (command.includes('turn off') || command.includes('switch off')) {
        if (command.includes('all') || command.includes('every')) {
            turnAllLights(0);
        } else if (command.includes('living room') || command.includes('one') || command.includes('1')) {
            toggleLight(1, false);
        } else if (command.includes('bedroom') || command.includes('two') || command.includes('2')) {
            toggleLight(2, false);
        } else if (command.includes('kitchen') || command.includes('three') || command.includes('3')) {
            toggleLight(3, false);
        } else if (command.includes('bathroom') || command.includes('four') || command.includes('4')) {
            toggleLight(4, false);
        }
    } else if (command.includes('dark mode')) {
        darkModeToggle.checked = true;
        darkModeToggle.dispatchEvent(new Event('change'));
    } else if (command.includes('light mode')) {
        darkModeToggle.checked = false;
        darkModeToggle.dispatchEvent(new Event('change'));
    }
}

function toggleLight(ledNumber, state) {
    const switchElement = document.querySelector(`.led-switch[data-led="${ledNumber}"]`);
    if (switchElement) {
        switchElement.checked = state;
        switchElement.dispatchEvent(new Event('change'));
    }
}

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let icon = 'fa-lightbulb';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'info') icon = 'fa-info-circle';
    
    notification.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    notificationContainer.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize the app
function initApp() {
    initializeLEDStates();
    
    lightCards.forEach(card => {
        card.addEventListener('click', function() {
            const ledNumber = this.getAttribute('data-led');
            const switchElement = document.querySelector(`.led-switch[data-led="${ledNumber}"]`);
            if (switchElement) {
                switchElement.checked = !switchElement.checked;
                switchElement.dispatchEvent(new Event('change'));
            }
        });
    });
    
    allOnBtn.addEventListener('click', () => turnAllLights(1));
    allOffBtn.addEventListener('click', () => turnAllLights(0));
    voiceBtn.addEventListener('click', setupVoiceControl);
}

// Start the app
document.addEventListener('DOMContentLoaded', initApp);