# Job Posting Web Application

A full-stack job posting web application built with React.js, Node.js/Express, and MongoDB with JWT authentication.

## Features

✅ **User Authentication**
- User registration with email validation
- Secure login with JWT tokens
- Password hashing and salting using bcrypt
- Protected routes requiring authentication

✅ **Job Management**
- Post new job listings (logged-in users only)
- View all available jobs
- Filter jobs by various criteria
- Edit and delete own job postings
- Link job posts to user profiles

✅ **Database**
- MongoDB for data persistence
- Mongoose for schema validation
- User and Job collections
- Relationships between users and jobs

✅ **Security**
- JWT token-based authentication
- Bcrypt password hashing with salt
- Protected API routes with middleware
- Environment variable configuration

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **CORS**: cors

### Frontend
- **Framework**: React.js 18
- **Routing**: React Router v6
- **HTTP Client**: Fetch API
- **Styling**: CSS3
- **State Management**: React Hooks (useState, useEffect)

## Project Structure

```
job-posting-app/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── User.js              # User schema with bcrypt hashing
│   │   └── Job.js               # Job schema
│   ├── controllers/
│   │   ├── authController.js    # Auth logic (register, login, getMe)
│   │   └── jobController.js     # Job CRUD operations
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints
│   │   └── jobs.js              # Job endpoints
│   ├── middleware/
│   │   └── auth.js              # JWT verification middleware
│   ├── .env                     # Environment variables
│   ├── .env.example             # Example env file
│   ├── package.json
│   └── server.js                # Express app entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Register.js      # Registration form
    │   │   ├── Login.js         # Login form
    │   │   ├── JobForm.js       # Job posting form
    │   │   ├── JobList.js       # Display all jobs
    │   │   ├── MyJobs.js        # User's job listings
    │   │   └── Navigation.js    # Navigation bar
    │   ├── styles/
    │   │   └── App.css          # All styling
    │   ├── utils/
    │   │   └── api.js           # API calls and helper functions
    │   ├── App.js               # Main app component with routing
    │   ├── index.js             # React entry point
    │   └── .env                 # Frontend environment variables
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/job_posting_db
   JWT_SECRET=your_secret_key_here_change_in_production
   PORT=5000
   NODE_ENV=development
   ```

4. Start MongoDB service (if running locally):
   ```bash
   # Windows
   mongod
   
   # macOS/Linux
   brew services start mongodb-community
   ```

5. Run backend server:
   ```bash
   npm run dev    # Development with nodemon
   # or
   npm start      # Production
   ```

   Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm start
   ```

   Frontend will run on `http://localhost:3000`

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}

Response: { success: true, token: "...", user: {...} }
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: { success: true, token: "...", user: {...} }
```

#### Get Current User (Protected)
```
GET /api/auth/me
Authorization: Bearer <token>

Response: { success: true, data: {...} }
```

### Job Endpoints

#### Get All Jobs (Public)
```
GET /api/jobs

Response: { success: true, count: 10, data: [...] }
```

#### Get Job by ID (Public)
```
GET /api/jobs/:id

Response: { success: true, data: {...} }
```

#### Create Job (Protected)
```
POST /api/jobs
Authorization: Bearer <token>
Content-Type: application/json

{
  "jobTitle": "Senior React Developer",
  "companyName": "Tech Corp",
  "location": "New York, NY",
  "jobType": "Full-Time",
  "salary": 120000,
  "description": "We are looking for..."
}

Response: { success: true, data: {...} }
```

#### Get My Jobs (Protected)
```
GET /api/jobs/user/my-jobs
Authorization: Bearer <token>

Response: { success: true, count: 5, data: [...] }
```

#### Update Job (Protected, Owner Only)
```
PUT /api/jobs/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "jobTitle": "Updated Title",
  ...
}

Response: { success: true, data: {...} }
```

#### Delete Job (Protected, Owner Only)
```
DELETE /api/jobs/:id
Authorization: Bearer <token>

Response: { success: true, message: "Job deleted successfully" }
```

## Authentication Flow

1. **Registration**: User provides fullName, email, password
   - Password is hashed using bcrypt with salt
   - User data stored in MongoDB
   - JWT token generated and returned

2. **Login**: User provides email and password
   - Password verified using bcrypt.compare()
   - JWT token generated if credentials valid
   - Token stored in client's localStorage

3. **Protected Routes**: 
   - Token sent in Authorization header: `Bearer <token>`
   - JWT middleware verifies token signature
   - Request proceeds if token valid

4. **Logout**: Token removed from localStorage

## Security Implementation

### Password Security
```javascript
// Using bcrypt in User model
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Comparing passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
```

### JWT Protection
```javascript
// Middleware protects routes
const protect = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decoded.id;
  next();
};
```

## Frontend Features

### Components
- **Register**: User registration form with validation
- **Login**: User login with email/password
- **JobForm**: Create new job postings (protected)
- **JobList**: Browse all available jobs
- **MyJobs**: Manage own job postings (protected)
- **Navigation**: Header with auth status and navigation

### State Management
- React hooks (useState) for form state
- useEffect for data fetching
- localStorage for token persistence
- Protected routes using React Router

### Styling
- Modern gradient design
- Responsive grid layouts
- Smooth animations and transitions
- Mobile-friendly responsive design

## Key Features Explained

### Bcrypt Password Hashing
- **Salt Rounds**: 10 (recommended)
- **Storage**: Only hashed password stored in DB
- **Verification**: bcrypt.compare() checks user input against stored hash

### JWT Authentication
- **Token Format**: `Bearer <token>`
- **Expiration**: 30 days
- **Storage**: localStorage on client
- **Verification**: Middleware validates on protected routes

### Database Relationships
- **User-Job**: One user can have many job postings
- **Foreign Key**: Job.postedBy references User._id
- **Populate**: Retrieve user info with jobs using Mongoose populate()

## Usage Guide

### For Users

1. **Register**: Create account with email and password
2. **Login**: Sign in with credentials
3. **Browse Jobs**: View all available job postings
4. **Post Job**: Click "Post a Job" to create new listing
5. **Manage Jobs**: View, edit, or delete your postings in "My Jobs"
6. **Logout**: Click logout to end session

### For Developers

#### Adding a New Job Field
1. Update Job schema in `backend/models/Job.js`
2. Update JobForm component in `frontend/src/components/JobForm.js`
3. Update job card display in `frontend/src/components/JobList.js`

#### Extending Authentication
1. Add fields to User schema in `backend/models/User.js`
2. Update auth controller methods in `backend/controllers/authController.js`
3. Update Register/Login forms in `frontend/src/components/`

## Environment Variables

### Backend (.env)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing (use strong string in production)
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)

### Frontend (.env)
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:5000/api)

## Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Use MongoDB Atlas for cloud database
4. Deploy to Heroku, AWS, or similar

### Frontend
1. Build optimized bundle: `npm run build`
2. Deploy to Vercel, Netlify, or similar
3. Update `REACT_APP_API_URL` to production backend

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in .env
- Verify firewall settings for MongoDB

### Token Not Working
- Ensure JWT_SECRET is consistent
- Check token expiration (30 days)
- Clear localStorage and re-login

### CORS Issues
- Verify `cors()` middleware in server.js
- Check frontend API_URL matches backend URL
- Ensure Content-Type headers are correct

## Future Enhancements

- [ ] Job search and filtering
- [ ] Advanced job categories
- [ ] User profiles with portfolio
- [ ] Job application tracking
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Payment integration
- [ ] Resume upload
- [ ] Saved/favorited jobs
- [ ] Job recommendations

## License

MIT License

## Support

For issues or questions, please check the documentation or create an issue in the repository.
