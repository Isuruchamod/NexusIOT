💡 Project: Smart Home Automation System – NexusIOT
🔗 Live Demo: nexusiot.web.app
📱 App Name: NexusIOT

🏠 Overview
I developed NexusIOT, a complete Smart Home Automation System powered by the ESP32 microcontroller. This project enables users to control home appliances from anywhere via the internet using a real-time dashboard, integrated with Firebase, voice control, and PWA support.

It merges hardware, cloud integration, and a mobile-responsive UI/UX, offering a seamless, secure, and scalable smart home experience.

🔧 Key Features
🌍 Remote Control: Turn appliances on/off from anywhere via an intuitive web dashboard.

📱 PWA Support: Install the web app on your mobile or desktop for a native-like experience.

🎙️ Voice Assistant Integration: Use commands like “Turn on living room light” or “Switch to dark mode”.

📶 WiFi Configuration Without Re-Flashing:

Uses WiFiManager to let users enter credentials via a captive portal.

No need to hardcode or modify WiFi credentials in code.

☁️ Firebase Realtime Integration:

Device state changes are instantly synced and reflected on the dashboard.

Efficient 1-second polling and connection batching for performance.

🧩 Custom PCB Designed:

Ensures clean hardware assembly, improved stability, and easier deployment.

📶 WiFi Monitor & Auto Recovery:

Every 10 seconds, WiFi connectivity is checked.

If disconnected, it retries up to 3 times.

After 3 failed attempts, WiFi credentials are reset and the ESP32 reboots to allow fresh configuration.

🎙️ Supported Voice Commands
“Turn on/off all lights”

“Turn on/off [room] light” (e.g., living room, bedroom)

“Switch to dark/light mode”

“Show commands”

🔐 Security Considerations
API keys and credentials are exposed in code (for dev use only – use secure storage in production).

Firebase Database rules should be applied to protect data access.

Secure user authentication is enabled for cloud control.

🚀 Potential Upgrades
OTA firmware updates

Energy monitoring sensors (voltage/current)

Time-based or rule-based automation


🛠️ Technologies Used
ESP32

Arduino IDE

Firebase Realtime Database

HTML / CSS / JavaScript

WiFiManager Library

Web Speech API (Voice Commands)

Progressive Web App (PWA)

Custom-designed PCB (KiCad)

🧠 What I Learned
This project helped me strengthen my skills in:

IoT architecture and real-time device control

Embedded systems programming (ESP32, C++)

Web development for responsive and interactive dashboards

Cloud integration using Firebase

Progressive Web App (PWA) technologies

PCB design and fabrication for deployment-ready hardware

🎉 Try It Out
👉 Live Demo: nexusiot.web.app

