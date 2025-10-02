# Chart Project - Backend API

## 🔐 Environment Variables

Create `.env` file:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pj-chart

# JWT
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# CORS
FRONTEND_URL=http://localhost:5173
```

## 🚀 Running the Server

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## 📝 API Endpoints Summary

### Authentication (Public)

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/logout` - Logout
- `GET /api/v1/auth/me` - Get current user

### Users (Admin Only)

- `GET /api/v1/users` - Get all users
- `PATCH /api/v1/users/:id/role` - Update user role

### Charts - Admin Routes (Protected)

- `GET /api/v1/charts` - Get all charts (with unpublished)
- `POST /api/v1/charts` - Create chart
- `PUT /api/v1/charts/:id` - Update chart
- `DELETE /api/v1/charts/:id` - Delete chart
- `PATCH /api/v1/charts/:id/publish` - Publish/unpublish chart

### Charts - Public Routes (No Auth)

- `GET /api/v1/public/charts` - Get published charts only
- `GET /api/v1/public/charts/:id` - Get single published chart

## 🧪 Testing

Example: Create admin user and login

```bash
# Register
POST http://localhost:3000/api/v1/auth/register
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}

# Login
POST http://localhost:3000/api/v1/auth/login
{
  "email": "admin@example.com",
  "password": "admin123"
}
# Returns: { token: "jwt-token-here" }

# Create Chart (with token in Authorization header)
POST http://localhost:3000/api/v1/charts
Headers: Authorization: Bearer <your-token>
{
  "title": "Sales Chart",
  "type": "bar",
  "data": {...},
  "isPublished": true
}
```

## 🔄 Development Workflow

1. Pick a task from TODO list above
2. Create necessary files (models, routes, controllers)
3. Test with Postman/Thunder Client
4. Move to next task
5. Update TODO as completed ✅

---

**Ready to start? Let's build this step by step! 🎯**
