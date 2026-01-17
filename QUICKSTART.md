# Quick Start Guide

## 5-Minute Setup

### Step 1: Start MongoDB
```bash
mongod
```

### Step 2: Backend Setup (Terminal 1)
```bash
cd backend
npm install
npm run dev
```
✅ Backend runs on http://localhost:5000

### Step 3: Frontend Setup (Terminal 2)
```bash
cd frontend
npm install
npm start
```
✅ Frontend opens on http://localhost:3000

## Testing the Application

### 1. Register
- Navigate to http://localhost:3000/register
- Fill in: Full Name, Email, Password
- Click "Register"

### 2. Create a Job
- Click "Post a Job" in navbar
- Fill in job details
- Click "Post Job"

### 3. Browse Jobs
- Click "Browse Jobs" to see all postings
- Click "View Details" to see full job info

### 4. Manage Your Jobs
- Click "My Jobs" to see your postings
- Use Edit/Delete buttons to manage

## Sample Data for Testing

**Test User:**
- Email: `test@example.com`
- Password: `test123456`

**Sample Job:**
- Title: Senior React Developer
- Company: Tech Innovations Inc
- Location: Remote
- Type: Full-Time
- Salary: 120000
- Description: Build amazing web applications with React

## API Base URL
- Development: `http://localhost:5000/api`

## Project Structure Overview

```
├── backend/
│   ├── server.js              → Express server entry
│   ├── config/db.js           → MongoDB connection
│   ├── models/                → User, Job schemas
│   ├── controllers/           → Auth, Job logic
│   ├── routes/                → API routes
│   ├── middleware/auth.js     → JWT protection
│   └── .env                   → Configuration
│
└── frontend/
    ├── src/App.js            → Main component
    ├── components/           → React components
    │   ├── Register.js       → Register form
    │   ├── Login.js          → Login form
    │   ├── JobForm.js        → Create job
    │   ├── JobList.js        → Show jobs
    │   ├── MyJobs.js         → Manage jobs
    │   └── Navigation.js     → Navbar
    ├── utils/api.js          → API calls
    ├── styles/App.css        → Styling
    └── .env                  → Config
```

## Key Technologies

| Layer | Technology |
|-------|------------|
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Security | JWT + bcrypt |
| Frontend | React + React Router |
| Styling | CSS3 |

## Important Files

- **User Authentication**: `backend/controllers/authController.js`
- **Password Hashing**: `backend/models/User.js` (bcrypt)
- **JWT Middleware**: `backend/middleware/auth.js`
- **Job Management**: `backend/controllers/jobController.js`
- **Frontend Auth**: `frontend/src/components/Register.js`, `Login.js`
- **Job UI**: `frontend/src/components/JobList.js`, `JobForm.js`
- **Styling**: `frontend/src/styles/App.css`

## Development Commands

### Backend
```bash
npm run dev    # Watch mode with nodemon
npm start      # Production start
```

### Frontend
```bash
npm start      # Start dev server
npm run build  # Production build
npm test       # Run tests
```

## Common Issues

| Issue | Solution |
|-------|----------|
| MongoDB won't connect | Start mongod service |
| Port already in use | Change PORT in .env or kill process |
| CORS errors | Check backend is running and API_URL is correct |
| Token invalid | Clear localStorage and re-login |

## Next Steps

1. ✅ Get the app running
2. Create test accounts
3. Post and manage jobs
4. Explore the code
5. Customize UI/features
6. Deploy to production

Happy coding! 🚀
