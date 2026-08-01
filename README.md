# WhizChat Backend 🚀

This is the backend server for **WhizChat**, a real-time, highly secure, and modern chat application.

## 🛠️ Tech Stack
- **Node.js** & **Express.js** (Server & Routing)
- **MongoDB** & **Mongoose** (Database & ODM)
- **Socket.io** (Real-time communication & live online status)
- **JWT (JSON Web Tokens)** & **Cookies** (Bulletproof authentication against XSS)
- **Bcrypt** (Password hashing)

## 🌟 Key Features
- **Secure Authentication**: Uses `HttpOnly` cookies to store JWT tokens, preventing cross-site scripting (XSS) attacks.
- **Real-time Messaging**: Instant message delivery using WebSockets.
- **Live Online Status**: Tracks and broadcasts which users are currently online across the platform.
- **Friend Requests System**: Dedicated API routes to send, accept, and reject friend requests.
- **Discover Users**: Excludes current friends and pending requests from the "Explore" feed.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js installed
- MongoDB installed locally (or a MongoDB Atlas account)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Ayushkumar302/chat-app-backend.git
cd chat-app-backend
npm install
```

### 3. Environment Variables
Create a `.env` file in the root of the project with the following keys:
```env
PORT=5000
MONGO_URL="mongodb://localhost:27017/chat" # Or your MongoDB Atlas URI
JWT_SECRET="your_super_secret_jwt_key"
```

### 4. Running the Server
```bash
npm start
```
The server will start on `http://localhost:5000`.

## 🔒 Security Enhancements
This backend has been heavily refactored for enterprise-level security:
- `credentials: true` enabled in CORS.
- `cookie-parser` implemented to parse incoming request cookies.
- Authentication middleware reads exclusively from the secure HTTP-only cookie, not the authorization header.
- Passwords are completely sanitized before user data is sent back to the client.

## 📄 License
This project is open-source and available under the MIT License.
