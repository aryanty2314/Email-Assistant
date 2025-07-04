# 📧 Smart Email Assistant

An AI-powered **Spring Boot** backend paired with a **Chrome Extension** that instantly generates email replies in three adjustable tones—**casual**, **professional**, and **friendly**—right inside Gmail.

---

## 🌟 Key Features

- 🧠 **Tone Generation**: Automatically craft replies in Casual, Professional, and Friendly styles using Spring AI (GPT‑powered).
- ✉️ **Automated Send**: Optionally send generated or custom emails via Gmail SMTP.
- 🧩 **Chrome Extension**: Click "Reply" in Gmail and select your tone—the assistant inserts the response into the draft.
- 🛠️ **Customizable Prompts**: Extendable logic for fine‑tuning tone/style based on user needs.

---

## 🗂️ Project Structure

Smart-Email-Assistant/
├── backend/ ← Spring Boot AI server
│ ├── controller/ → API for tone-generation & send-email
│ ├── service/ → Spring AI integration + email logic
│ └── Application.java
├── extension/ ← Chrome extension
│ ├── manifest.json
│ ├── popup.js → Calls backend API and injects reply
│ └── popup.html
├── pom.xml
└── README.md


---

## 🔧 Quick Start

1. **Clone repo and run backend**:
   ```bash
   git clone https://github.com/aryanty2314/Smart-Email-Assistant.git
   cd Smart-Email-Assistant/backend
   mvn clean install
   mvn spring-boot:run
Load Chrome Extension:

Visit chrome://extensions

Enable Developer mode

Click Load unpacked → select extension/

Use it in Gmail:

Click Reply on any message

The extension triggers the backend, offering three tone options

Select a tone → reply is inserted

📬 API Endpoints
POST /api/generate-reply

Body: { "incomingEmail": "...text..." }

Response:

json
Copy
Edit
{
  "casual": "...",
  "professional": "...",
  "friendly": "..."
}
POST /api/send-email

Body: { "to": "...", "subject": "...", "message": "..." }

Sends via Gmail SMTP (configure in application.properties)

⚙️ SMTP Config (if sending emails)
Configure in application.properties:

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=you@gmail.com
spring.mail.password=YOUR_APP_PASSWORD
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
Use Gmail App Passwords if 2FA is enabled.

🧠 AI Backend Setup
Leverages Spring AI (GPT‑powered) for tone generation. Ensure environment variables or config include your API key:

properties
Copy
Edit
spring.ai.api-key=YOUR_OPENAI_KEY
🤖 Chrome Extension

Intercepts Gmail's reply button
Calls /generate-reply with current email text
Displays tone options
Inserts selected reply into Gmail draft box

🧪 Testing

Test Generate Reply via Postman:
POST http://localhost:8080/api/generate-reply
Body: {"incomingEmail":"Could we meet today?"}
Test Send Email similarly with send endpoint
Test Extension in Gmail by clicking reply

🧑‍💻 Future Improvements

Add more tones (e.g. witty, concise, empathetic)
Support Outlook and other webmail clients
Add rate limits, logging, analytics

🛠️ Tech Stack

Backend: Spring Boot (Java), Spring AI, Spring Mail
Front-end: ReactJs and for Chrome Extension (JavaScript, HTML)
AI: GPT‑powered tone generation
Email Sending: SMTP via Gmail

🧑‍🎓 Author & Contributions
Aryan Tyagi – GitHub: @aryanty2314

Contributions welcome! Add tones, support, normalization. Submit issues or PRs.
