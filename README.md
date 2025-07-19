# 🌍 Wanderlust – Travel Listing Web App

Wanderlust is a full-stack travel listing application where users can explore travel destinations, view detailed pages, and manage listings. It is built using **Node.js**, **Express**, **MongoDB**, and **EJS** templating engine.

---

## 🚀 Features

- 🧭 Browse all travel listings
- ➕ Create, update, and delete listings
- 💬 Add and delete reviews
- 🗺️ View detailed destination info
- ⚙️ Error handling and middleware
- 📱 Responsive front-end (Bootstrap)

---

## 🛠️ Tech Stack

- **Frontend**: EJS, Bootstrap, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Templating**: EJS
- **Others**: Express Router, Custom Error Handling

---

## 🔐 Authentication & Security

User authentication is implemented using:

- `passport` – for managing authentication strategies
- `passport-local` – for username/password-based login
- `passport-local-mongoose` – to simplify integration with Mongoose
- Session management for persistent login
- Input validation and error handling

Registered users can:
- Sign up and log in securely
- Create, edit, and delete listings (with ownership)
- Leave reviews

---
