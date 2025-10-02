# Chart Project - Frontend Application

## 🔧 Prerequisites

### Required Software

1. **Node.js** (v18 or higher) and npm

   ```bash
   # Check if installed
   node --version
   npm --version
   ```

   If don't have it already you can install it here https://nodejs.org/en/download

2. **Backend API Running** (Required)

   The frontend requires the backend API to be running. Please ensure you have:

- Completed the backend setup (see `be/README.md`)
- Backend API running on `http://localhost:3000`
- MongoDB running and connected

## 📥 Installation

### Step 1: Clone the Repository (if not done already)

```bash
git clone <your-repository-url>
cd pj-chart/fe
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages to run

**Installation Time:** This may take 2-5 minutes depending on your internet connection.

## ⚙️ Environment Configuration

### Create Environment File

Create a `.env.local` file in the `fe` directory:

```bash
# From the fe directory
touch .env
```

### Add Environment Variables

Open `.env.local` and add the following configuration:

THIS MUST BE MATCH WITH YOUR BE CONFIG IN BE (see in BE)

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

# JWT Cookie Name (should match backend)
JWT_COOKIE_NAME=pj-chart-token
```

## 🚀 Running the Application

### Step 1: Ensure Backend is Running

Before starting the frontend, make sure:

- run backend server

```bash
# In a separate terminal, from the be directory
cd ../be
npm run dev

# You should see:
# Server running on port 3000
# Connected DB
```

### Step 2: Start the Development Server

```bash
# From the fe directory
npm run dev
```

**Expected Output:**

```
▲ Next.js 15.5.4
- Local:        http://localhost:3001
- Turbopack (Experimental): Enabled

✓ Ready in 1.2s
```

### Step 3: Open in Browser

```bash
# Open in your default browser
open http://localhost:3001    # macOS
xdg-open http://localhost:3001  # Linux

# Or manually navigate to http://localhost:3001
```

### Verify Installation

When open http://localhost:3001 you will see a Backend Connection Status
If status is Disconnected => check be server and run again

If status is Connected => Try

1. Click "Dashboard" or "Login"
2. Navigate to `/auth/login`
3. Login to create data for your charts
4. You should be redirected to `/admin/metrics`
5. After all comeback to /dashboard to see complete chart
