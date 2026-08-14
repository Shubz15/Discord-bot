# Discord Bot Application

A Discord bot built with **Node.js, Discord.js, Express.js, MongoDB, and
Gemini API**.

## Features

- Discord slash commands
- User profile and XP system
- URL shortener with click tracking
- `/myurls` to view created URLs
- Gemini AI chatbot using `/ask`
- Express route for short URL redirection
- MongoDB data storage

## Tech Stack

- Node.js
- Discord.js
- Express.js
- MongoDB + Mongoose
- Gemini API
- Nanoid
- dotenv

## Project Structure

```text
DISCORD_BOT/
│
├── commands/
│   ├── ask.js
│   ├── create.js
│   ├── myurls.js
│   ├── ping.js
│   └── profile.js
│
├── config/
│   ├── database.js
│   └── registerCommand.js
│
├── controllers/
│   └── urlController.js
│
├── events/
│   ├── interactionCreate.js
│   ├── messageCreate.js
│   └── ready.js
│
├── models/
│   ├── url.js
│   └── user.js
│
├── routes/
│   └── urlRoutes.js
│
├── services/
│   ├── gemini.service.js
│   └── shortUrl.service.js
│
├── utils/
│   └── generateShortId.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env`

```env
DISCORD_TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_client_id
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
PORT=3000
```

Never upload `.env` to GitHub.

### 3. Register commands

```bash
npm run register
```

### 4. Start the bot

```bash
npm start
```

## Commands

Command Description

---

`/ping` Checks if the bot is working
`/profile` Shows user profile and XP
`/create` Creates a short URL
`/myurls` Shows your created URLs
`/ask` Ask Gemini a question

## Main Workflows

### Discord Command

```text
User → Discord → interactionCreate.js → Command → Response
```

### URL Shortener

```text
/create
   ↓
shortUrl.service.js
   ↓
generateShortId.js
   ↓
MongoDB
   ↓
Short URL
```

### URL Redirect

```text
Short URL
   ↓
Express Route
   ↓
urlController.js
   ↓
MongoDB
   ↓
Redirect to Original URL
```

### Gemini

```text
/ask
   ↓
ask.js
   ↓
gemini.service.js
   ↓
Gemini API
   ↓
Discord Response
```

## Database

MongoDB stores:

- User information
- XP and level
- Original URLs
- Short IDs
- Click counts

## Testing

Test the following commands:

```text
/ping
/profile
/create
/myurls
/ask
```

Also verify URL redirection, MongoDB updates, XP changes, and Gemini
responses.

## Future Improvements

- `/help`
- `/leaderboard`
- URL analytics
- URL expiration
- QR code generation
- Gemini conversation history
- Discord web dashboard
- Automated tests

## Learning Outcomes

This project demonstrates:

- Node.js backend development
- Discord.js
- MongoDB and Mongoose
- Express.js routing
- REST API concepts
- External API integration
- Async/await
- Services and controllers
- Environment variables
- Git and GitHub

## Author

Shubham Shinde,
CSE Student.
