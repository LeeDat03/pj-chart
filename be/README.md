# Chart Project - Backend API

## 🔧 Prerequisites

Before you begin, ensure you have the following installed on your Linux/macOS system:

### Required Software

1. **Node.js** (v18 or higher) and npm

   ```bash
   # Check if installed
   node --version
   npm --version
   ```

   If don't have it already you can install it here https://nodejs.org/en/download

2. **MongoDB**

   ```bash
   mongod --version
   ```

   You can download and setup db in here: https://www.mongodb.com/try/download/community

3. **Git**

   ```bash
   # Check if installed
   git --version
   ```

## 📥 Installation

### Step 1: Move to the be part

```bash
cd pj-chart/be
```

### Step 2: Install Dependencies

```bash
npm install
```

## ⚙️ Environment Configuration

### Create Environment File

Create a `.env` file in the `be` directory:

### Add Environment Variables

Open `.env` and add the following configuration:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
# replace with your db connection
MONGODB_URI=mongodb://localhost:27017/pj-chart

# JWT Configuration
JWT_SECRET=your-super-secret-key-change-this-to-something-secure
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

**Important Security Notes:**

- Change `JWT_SECRET` to a strong, random string (at least 32 characters)
- Never commit `.env` file to version control (it's already in `.gitignore`)

## 🚀 Running the Application

### Development Mode (with auto-reload)

```bash
npm run dev
```

This will:

- Start the server with nodemon
- Auto-reload on file changes
- Run on `http://localhost:3000`
- Connect to MongoDB

You should see:

```
Server running on port 3000
Connected DB
```

### Verify Server is Running

```bash
# Or open in browser
http://localhost:3000/api/v1/health
# You should see the API response
{
  "status": "ok",
  "uptime": 14.5241196,
  "timestamp": "2025-10-02T16:20:36.341Z"
}
```
