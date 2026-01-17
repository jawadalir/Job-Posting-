# MongoDB Atlas Setup - Allow Connections from Anywhere

## Quick Setup (5 Minutes)

### Step 1: Login to MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Login with your credentials

### Step 2: Configure Network Access
1. Click on **Security** in the left sidebar
2. Select **Network Access** tab
3. Click the **+ ADD IP ADDRESS** button
4. In the dialog box:
   - Select **Allow access from anywhere** option
   - This will automatically set the IP to `0.0.0.0/0`
   - Click **Confirm**

### Step 3: Verify Database User
1. Go back to **Security** → **Database Access**
2. Ensure your user `jarheman571ail_db_user` exists
3. Verify password is `4J9!MA2nv4qDP9r`

### Step 4: Connection String
Your connection string should be:
```
mongodb+srv://jarheman571ail_db_user:4J9!MA2nv4qDP9r@cluster0.ksd8tim.mongodb.net/job_posting_db?retryWrites=true&w=majority
```

This is already configured in the backend code.

### Step 5: Test Connection
Run the backend and check console for:
```
MongoDB connected via Atlas
```

## Important Notes

⚠️ **Security Warning**: 
- Allowing `0.0.0.0/0` (anywhere) means anyone with your credentials can access the database
- In production, use specific IP addresses instead of 0.0.0.0/0
- Keep your database credentials secure

## Troubleshooting

### "Connection timed out"
- Check Network Access settings allow 0.0.0.0/0
- Wait 1-2 minutes for changes to take effect

### "Authentication failed"
- Verify username and password in .env
- Ensure user exists in MongoDB Atlas

### "Database not found"
- Check database name in connection string
- Create the database if it doesn't exist

## Connection Success Indicators
- Backend logs: "MongoDB connected via Atlas"
- No console errors
- Frontend can register and login users
- Jobs are saved to database
