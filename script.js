// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDml7yKe_irqHKTeDzusrN8spLDXVO78p0",
    authDomain: "iot1-4accc.firebaseapp.com",
    databaseURL: "https://iot1-4accc-default-rtdb.firebaseio.com/",
    projectId: "iot1-4accc",
    storageBucket: "iot1-4accc.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef1234567890"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const loadingProgress = document.getElementById('loadingProgress');
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebarClose');
const overlay = document.getElementById('overlay');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const notificationContainer = document.getElementById('notificationContainer');
const led1Toggle = document.getElementById('led1Toggle');
const led2Toggle = document.getElementById('led2Toggle');
const led3Toggle = document.getElementById('led3Toggle');
const led4Toggle = document.getElementById('led4Toggle');
const led5Toggle = document.getElementById('led5Toggle');
const led6Toggle = document.getElementById('led6Toggle');
const led1Status = document.getElementById('led1Status');
const led2Status = document.getElementById('led2Status');
const led3Status = document.getElementById('led3Status');
const led4Status = document.getElementById('led4Status');
const led5Status = document.getElementById('led5Status');
const led6Status = document.getElementById('led6Status');
const ledIcons = document.querySelectorAll('.device-icon');
const canvas = document.getElementById('modern-canvas');
const ctx = canvas.getContext('2d');
const voiceBtn = document.getElementById('voiceBtn');
const topVoiceBtn = document.getElementById('topVoiceBtn');
const voiceCommands = document.getElementById('voiceCommands');
const voiceResponse = document.getElementById('voiceResponse');
const responseText = document.getElementById('responseText');
const allOnBtn = document.getElementById('allOnBtn');
const allOffBtn = document.getElementById('allOffBtn');

// Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
} else {
    console.log("Speech Recognition not supported in this browser.");
}

// Set canvas dimensions
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Advanced Fluid Simulation Animation
const isMobile = window.innerWidth <= 768; // Detect mobile screens
const particles = [];
const particleCount = isMobile ? 30 : 50; // Reduce particles on mobile
const maxDistance = isMobile ? 0 : 0;  // Reduce connection distance
let mouseX = 0;
let mouseY = 0;
let mouseRadius = 250;
let frame = 0;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (isMobile ? 0 : 0) + 0; // Smaller particles on mobile
        this.speedX = (Math.random() - 0) * 0;
        this.speedY = (Math.random() - 0) * 0;
        this.color = Math.random() > 0.0 ? 
            'rgba(57, 255, 20, 0.6)' : // Neon green
            'rgba(0, 238, 255, 0.6)';   // Electric blue
        this.originalSize = this.size;
        this.angle = Math.random() * Math.PI * 0;
        this.waveAmplitude = Math.random() * 0 + 0;
        this.waveSpeed = Math.random() * 0+ 0;
        this.opacity = 0.5;
    }
    
    update() {
        // Wave-like movement
        this.angle += this.waveSpeed;
        this.x += this.speedX + Math.sin(this.angle) * 0.5;
        this.y += this.speedY + Math.cos(this.angle) * 0.5;
        
        // Boundary check
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        
        // Mouse interaction
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
            const force = (mouseRadius - distance) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            this.speedX += Math.cos(angle) * force * 0.2;
            this.speedY += Math.sin(angle) * force * 0.2;
            
            // Increase size when near mouse
            this.size = this.originalSize + (1 - distance / mouseRadius) * 8;
            this.opacity = 0.8;
        } else {
            this.size = this.originalSize;
            this.opacity = 0.5;
        }
        
        // Apply friction
        this.speedX *= 0.98;
        this.speedY *= 0.98;
    }
    
    draw() {
        // Draw glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 1.5
        );
        gradient.addColorStop(0, this.color.replace('0.6', this.opacity));
        gradient.addColorStop(1, this.color.replace('0.6', '0'));
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw main particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace('0.6', this.opacity);
        ctx.fill();
    }
}

// Draw connections between particles
function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
                const opacity = 1 - distance / maxDistance;
                const gradient = ctx.createLinearGradient(
                    particles[i].x, particles[i].y,
                    particles[j].x, particles[j].y
                );
                
                gradient.addColorStop(0, particles[i].color.replace('0.6', (opacity * 0.3).toFixed(2)));
                gradient.addColorStop(1, particles[j].color.replace('0.6', (opacity * 0.3).toFixed(2)));
                
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = opacity * 0.8;
                ctx.stroke();
            }
        }
    }
}

// Draw background effects
function drawBackground() {
    // Draw large glowing orbs in background
    const orbCount = isMobile ? 2 : 4; // Fewer orbs on mobile
     for (let i = 0; i < orbCount; i++) {
        const x = canvas.width * (i * 0.25 + 0.125);
        const y = canvas.height * (Math.sin(frame * 0.005 + i) * 0.3 + 0.5);
        const size = 150 + Math.sin(frame * 0.01 + i) * 50;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
            x, y, 0,
            x, y, size
        );
        
        if (i % 2 === 0) {
            gradient.addColorStop(0, 'rgba(0, 238, 255, 0.1)');
            gradient.addColorStop(1, 'rgba(0, 238, 255, 0)');
        } else {
            gradient.addColorStop(0, 'rgba(57, 255, 20, 0.1)');
            gradient.addColorStop(1, 'rgba(57, 255, 20, 0)');
        }
        
        ctx.fillStyle = gradient;
        ctx.fill();
    }
}

// Animation loop
function animate() {
    frame++;
    
    // Create motion blur effect
    ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw background effects
    drawBackground();
    
    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Draw connections between particles
    drawConnections();
    
    requestAnimationFrame(animate);
}

// Track mouse position for interaction
function trackMouse(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

// Show notification
function showNotification(title, message, isSuccess = false) {
    const notification = document.createElement('div');
    notification.className = `notification ${isSuccess ? 'success' : ''}`;
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${isSuccess ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        </div>
        <div class="notification-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Remove notification after animation completes
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Simulate loading progress
let progress = 0;
const loadingInterval = setInterval(() => {
    progress += 5;
    loadingProgress.style.width = `${progress}%`;
    
    if (progress >= 100) {
        clearInterval(loadingInterval);
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // Show welcome notification
                showNotification("System Online", "Dashboard initialized successfully", true);
            }, 500);
        }, 300);
    }
}, 100);

// Mobile menu toggle
function toggleSidebar() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

menuBtn.addEventListener('click', toggleSidebar);
sidebarClose.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        themeIcon.className = 'fas fa-sun';
        showNotification("Theme Changed", "Switched to Light Mode");
    } else {
        themeIcon.className = 'fas fa-moon';
        showNotification("Theme Changed", "Switched to Dark Mode");
    }
});

// Initialize Firebase listeners
function initFirebase() {
    // Listen for LED 1 changes
    database.ref('led/led1').on('value', (snapshot) => {
        const state = snapshot.val();
        led1Toggle.checked = state === 1;
        updateLEDStatus(1, state);
    });
    
    // Listen for LED 2 changes
    database.ref('led/led2').on('value', (snapshot) => {
        const state = snapshot.val();
        led2Toggle.checked = state === 1;
        updateLEDStatus(2, state);
    });
    
    // Listen for LED 3 changes
    database.ref('led/led3').on('value', (snapshot) => {
        const state = snapshot.val();
        led3Toggle.checked = state === 1;
        updateLEDStatus(3, state);
    });
    
    // Listen for LED 4 changes
    database.ref('led/led4').on('value', (snapshot) => {
        const state = snapshot.val();
        led4Toggle.checked = state === 1;
        updateLEDStatus(4, state);
    });
    
    // Listen for LED 5 changes
    database.ref('led/led5').on('value', (snapshot) => {
        const state = snapshot.val();
        led5Toggle.checked = state === 1;
        updateLEDStatus(5, state);
    });
    
    // Listen for LED 6 changes
    database.ref('led/led6').on('value', (snapshot) => {
        const state = snapshot.val();
        led6Toggle.checked = state === 1;
        updateLEDStatus(6, state);
    });
}

// Update LED status display
function updateLEDStatus(ledNumber, state) {
    const statusElement = document.getElementById(`led${ledNumber}Status`);
    const iconElement = ledIcons[ledNumber - 1];
    
    if (state === 1) {
        statusElement.textContent = 'ON';
        statusElement.classList.remove('off');
        statusElement.style.background = 'rgba(57, 255, 20, 0.1)';
        statusElement.style.color = 'var(--neon-green)';
        iconElement.style.color = 'var(--neon-green)';
        iconElement.style.boxShadow = '0 0 15px var(--neon-green)';
    } else {
        statusElement.textContent = 'OFF';
        statusElement.classList.add('off');
        statusElement.style.background = 'rgba(255, 255, 255, 0.1)';
        statusElement.style.color = 'rgba(255, 255, 255, 0.6)';
        iconElement.style.color = 'var(--electric-blue)';
        iconElement.style.boxShadow = 'none';
    }
}

// Setup toggle handlers
function setupToggleHandlers() {
    led1Toggle.addEventListener('change', () => {
        database.ref('led/led1').set(led1Toggle.checked ? 1 : 0);
        showNotification("Light Control", `Living Room Light turned ${led1Toggle.checked ? 'ON' : 'OFF'}`, led1Toggle.checked);
    });
    
    led2Toggle.addEventListener('change', () => {
        database.ref('led/led2').set(led2Toggle.checked ? 1 : 0);
        showNotification("Light Control", `Kitchen Light turned ${led2Toggle.checked ? 'ON' : 'OFF'}`, led2Toggle.checked);
    });
    
    led3Toggle.addEventListener('change', () => {
        database.ref('led/led3').set(led3Toggle.checked ? 1 : 0);
        showNotification("Light Control", `Bedroom Light turned ${led3Toggle.checked ? 'ON' : 'OFF'}`, led3Toggle.checked);
    });
    
    led4Toggle.addEventListener('change', () => {
        database.ref('led/led4').set(led4Toggle.checked ? 1 : 0);
        showNotification("Light Control", `Bathroom Light turned ${led4Toggle.checked ? 'ON' : 'OFF'}`, led4Toggle.checked);
    });
    
    led5Toggle.addEventListener('change', () => {
        database.ref('led/led5').set(led5Toggle.checked ? 1 : 0);
        showNotification("Light Control", `Garage Light turned ${led5Toggle.checked ? 'ON' : 'OFF'}`, led5Toggle.checked);
    });
    
    led6Toggle.addEventListener('change', () => {
        database.ref('led/led6').set(led6Toggle.checked ? 1 : 0);
        showNotification("Light Control", `Garden Light turned ${led6Toggle.checked ? 'ON' : 'OFF'}`, led6Toggle.checked);
    });
}

// Turn all LEDs on
function turnAllOn() {
    database.ref('led').set({
        led1: 1,
        led2: 1,
        led3: 1,
        led4: 1,
        led5: 1,
        led6: 1
    });
    showNotification("All Lights On", "All lights have been turned on", true);
}

// Turn all LEDs off
function turnAllOff() {
    database.ref('led').set({
        led1: 0,
        led2: 0,
        led3: 0,
        led4: 0,
        led5: 0,
        led6: 0
    });
    showNotification("All Lights Off", "All lights have been turned off");
}

// Handle voice commands
function handleVoiceCommand(command) {
    command = command.toLowerCase();
    let response = "";
    
    if (command.includes("on all lights") || command.includes("turn on everything")) {
        turnAllOn();
        response = "Turning all lights on";
    } 
    else if (command.includes("off all lights") || command.includes("turn off everything")) {
        turnAllOff();
        response = "Turning all lights off";
    } 
    else if (command.includes("on living room") || command.includes("living room on")) {
        database.ref('led/led1').set(1);
        response = "Turning on living room light";
    } 
    else if (command.includes("off living room") || command.includes("living room off")) {
        database.ref('led/led1').set(0);
        response = "Turning off living room light";
    } 
    else if (command.includes("on kitchen") || command.includes("kitchen on")) {
        database.ref('led/led2').set(1);
        response = "Turning on kitchen light";
    } 
    else if (command.includes("off kitchen") || command.includes("kitchen off")) {
        database.ref('led/led2').set(0);
        response = "Turning off kitchen light";
    } 
    else if (command.includes("on bedroom") || command.includes("bedroom on")) {
        database.ref('led/led3').set(1);
        response = "Turning on bedroom light";
    } 
    else if (command.includes("off bedroom") || command.includes("bedroom off")) {
        database.ref('led/led3').set(0);
        response = "Turning off bedroom light";
    } 
    else if (command.includes("on bathroom") || command.includes("bathroom on")) {
        database.ref('led/led4').set(1);
        response = "Turning on bathroom light";
    } 
    else if (command.includes("off bathroom") || command.includes("bathroom off")) {
        database.ref('led/led4').set(0);
        response = "Turning off bathroom light";
    }
    else if (command.includes("on garage") || command.includes("garage on")) {
        database.ref('led/led5').set(1);
        response = "Turning on garage light";
    } 
    else if (command.includes("off garage") || command.includes("garage off")) {
        database.ref('led/led5').set(0);
        response = "Turning off garage light";
    } 
    else if (command.includes("on garden") || command.includes("garden on")) {
        database.ref('led/led6').set(1);
        response = "Turning on garden light";
    } 
    else if (command.includes("off garden") || command.includes("garden off")) {
        database.ref('led/led6').set(0);
        response = "Turning off garden light";
    } 
    else if (command.includes("dark mode") || command.includes("switch to dark")) {
        document.body.classList.remove('light-mode');
        themeIcon.className = 'fas fa-moon';
        response = "Switching to dark mode";
    } 
    else if (command.includes("light mode") || command.includes("switch to light")) {
        document.body.classList.add('light-mode');
        themeIcon.className = 'fas fa-sun';
        response = "Switching to light mode";
    } 
    else if (command.includes("show commands") || command.includes("help")) {
        voiceCommands.classList.toggle('active');
        response = "Here are available commands";
    } 
    else {
        response = "Sorry, I didn't understand that command. Try 'show commands' for help.";
    }
    
    // Show voice response
    responseText.textContent = response;
    voiceResponse.classList.add('active');
    
    // Use speech synthesis to speak the response
    if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(response);
        speechSynthesis.speak(utterance);
    }
    
    // Hide response after delay
    setTimeout(() => {
        voiceResponse.classList.remove('active');
    }, 3000);
}

// Initialize voice assistant
function initVoiceAssistant() {
    if (!recognition) {
        showNotification("Voice Assistant", "Speech recognition not supported in this browser");
        return;
    }
    
    voiceBtn.addEventListener('click', () => {
        voiceBtn.classList.add('listening');
        recognition.start();
        voiceResponse.classList.add('active');
        responseText.textContent = "Listening...";
        
        // Hide voice commands
        voiceCommands.classList.remove('active');
    });
    
    topVoiceBtn.addEventListener('click', () => {
        voiceBtn.click();
    });
    
    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript;
        responseText.textContent = `Heard: ${command}`;
        handleVoiceCommand(command);
    };
    
    recognition.onend = () => {
        voiceBtn.classList.remove('listening');
    };
    
    recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        voiceBtn.classList.remove('listening');
        voiceResponse.classList.remove('active');
        showNotification("Voice Assistant", "Error recognizing speech");
    };
}

// Initialize when the page loads
window.addEventListener('DOMContentLoaded', () => {
    // Set up modern background animation
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    animate();
    
    // Track mouse for interactive effects
    document.addEventListener('mousemove', trackMouse);
    
    // Initialize Firebase listeners
    initFirebase();
    
    // Setup toggle handlers
    setupToggleHandlers();
    
    // Initialize voice assistant
    initVoiceAssistant();
    
    // Setup bulk control buttons
    allOnBtn.addEventListener('click', turnAllOn);
    allOffBtn.addEventListener('click', turnAllOff);
    
    // Add hover effects to device cards
    const deviceCards = document.querySelectorAll('.device-card');
    deviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 25px rgba(0, 238, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Demo notifications
    setTimeout(() => {
        showNotification("System Update", "Firmware update available for security system");
    }, 5000);
    
    setTimeout(() => {
        showNotification("Energy Saving", "Your usage is 12% lower than yesterday", true);
    }, 8000);
});