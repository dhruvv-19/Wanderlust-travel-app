# 🌍 Wanderlust – Travel Listing Web App

Wanderlust is a full-stack travel listing application where users can explore travel destinations, view detailed pages, and manage listings. It is built using **Node.js**, **Express**, **MongoDB**, and **EJS** templating engine.

---

## 🚀 Features

- 🧭 Browse all travel listings
- ➕ Create, update, and delete listings
- 💬 Add and delete reviews
- 🗺️ View detailed destination info
- 🔐 Login/Signup system with Passport.js
- 🛡️ Authorization for listings and reviews using custom middleware
- 👤 Ownership-based access control
- 🛡️ Route protection with custom middleware
- ⚙️ Centralized error handling
- 📱 Responsive front-end using Bootstrap

---

## 🛠️ Tech Stack

- **Frontend**: EJS, Bootstrap, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Templating**: EJS
- **Authentication**: Passport, Passport-Local, Passport-Local-Mongoose
- **Utilities**: MVC Architecture, Express Router with `router.route()`, Custom Middleware, Session Handling

---

## 🔐 Authentication & Security

User authentication is implemented using:

- `passport` – for managing authentication strategies
- `passport-local` – for username/password-based login
- `passport-local-mongoose` – to simplify integration with Mongoose
- Session-based login with persistent sessions
- Input validation, flash messaging, and centralized error handling

Registered users can:

- Sign up and log in securely
- Access protected routes (e.g., create/edit listings)
- Only modify their own listings
- Leave and delete their own reviews

---

### 🔒 Authorization for Listings & Reviews

- Only logged-in users can create listings and reviews
- Users can **edit/delete only their own listings and reviews**
- Custom middleware ensures ownership-based protection

---

## 🧩 Middleware

The app uses custom middleware to:

- Restrict access to protected routes
- Verify ownership for listings and reviews
- Handle flash messages and redirect logic
- Centralize error responses (`ExpressError.js`)

---
