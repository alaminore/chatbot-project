# Bean There Coffee - AI Customer Service Chatbot

A production-ready AI-powered chatbot for coffee shop customer service, featuring database integration, input sanitization, and multilingual support.

![Demo Screenshot](screenshot.jpg)

## 🚀 Features

- **AI-Powered Responses** - Uses Google Gemini AI for natural conversation
- **Real-time Database Integration** - Queries PostgreSQL for accurate product/hours info
- **Security First** - Input sanitization, SQL injection prevention, sensitive data protection
- **Multilingual Support** - Responds in user's language automatically
- **Smart Query Optimization** - Only fetches relevant data, never dumps entire database
- **Responsive Design** - Works on desktop and mobile
- **Clean Architecture** - Organized routes, services, and helpers

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL (via Prisma ORM)
- **AI:** Google Gemini API
- **Frontend:** EJS templates, Vanilla JS, CSS
- **Deployment:** Render

## 🏗️ Architecture
```
src/
  ├── helpers/       # Input validation & sanitization
  ├── services/      # Database queries & AI integration
  └── routes/        # API endpoints
```

**Security Features:**
- Read-only database access for AI
- Sensitive data (employee salaries, customer PII) excluded from AI context
- SQL keyword filtering
- Input length limits
- Parameterized queries via Prisma

## 📦 Installation
```bash
# Clone repo
git clone [your-repo-url]
cd chatbot-project

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your GEMINI_API_KEY and DATABASE_URL

# Run migrations
npx prisma migrate dev

# Seed database
npx prisma db seed

# Start development server
npm run dev
```

## 🌐 Environment Variables
```
GEMINI_API_KEY=your_google_ai_key
DATABASE_URL=postgresql://user:pass@host:5432/db
PORT=3000
```

## 🎯 Use Cases

This architecture can be adapted for:
- Restaurant ordering assistance
- E-commerce product help
- Hotel booking inquiries
- Appointment scheduling
- FAQ automation

## 📸 Screenshots

<figure>
  <img src="screenshot2.png" alt="Chatbot Demo: Unrelated Topics">
  <figcaption>AI chatbot refusing to talk about unrelated topics.</figcaption>
</figure>

<figure>
  <img src="screenshot3.png" alt="Chatbot Demo: Employees">
  <figcaption>AI chatbot refusing to provide employee information.</figcaption>
</figure>

<figure>
  <img src="screenshot4.png" alt="Chatbot Demo: Profit Margins">
  <figcaption>AI chatbot refusing to provide confidential information about prices.</figcaption>
</figure>

<figure>
  <img src="screenshot5.png" alt="Chatbot Demo: SQL Injection">
  <figcaption>AI chatbot invulnerable to SQL injection attacks.</figcaption>
</figure>

<figure>
  <img src="screenshot6.png" alt="Chatbot Demo: Prompt Injection">
  <figcaption>AI chatbot invulnerable to prompt injection.</figcaption>
</figure>

## 🔮 Future Enhancements

- [ ] Conversation history storage
- [ ] Admin dashboard for analytics
- [ ] Multi-language UI (not just responses)
- [ ] Voice input support
- [ ] Integration with ordering system

## 👨‍💻 Author

Built by [Your Name] as a portfolio project demonstrating AI integration, database architecture, and security best practices.

[LinkedIn](your-linkedin) | [Portfolio](your-site) | [GitHub](your-github)

## 📄 License

MIT