# 🚀 Quick Fix Guide - Homebase Error Resolution

## ❌ Problem
Error: `column "homebase" does not exist` when loading the dashboard.

## ✅ Solution
The homebase column needs to be added to your Neon database. Follow these steps:

### Step 1: Apply Database Schema

1. **Go to your Neon Console:**
   - Open [Neon Console](https://console.neon.tech/)
   - Select your project
   - Go to the **SQL Editor**

2. **Execute the SQL Schema:**
   - Copy the content from `src/data/homebase_schema.sql`
   - Paste it into the Neon SQL Editor
   - Click **Run** to execute

### Step 2: Restart Your Application

1. **Stop the backend server** (if running)
2. **Start the backend:**
   ```bash
   cd backend
   node index.js
   ```
3. **Start the frontend** (in another terminal):
   ```bash
   npm run dev
   ```

### Step 3: Re-enable Homebase Features

After the schema is applied successfully, uncomment these lines:

**In `backend/index.js`:**
- Line ~55: Add `homebase` back to the SELECT query
- Line ~206: Add `homebase` back to the destructuring
- Line ~230: Add `homebase` back to the INSERT query
- Line ~264: Add `homebase` back to the UPDATE query

**In `src/pages/AdminDashboard.tsx`:**
- Lines ~110 & ~147: Uncomment `homebase: formData.homebase`
- Lines ~442-454: Uncomment the homebase form field
- Lines ~519-521: Uncomment the homebase table header
- Lines ~556-562: Uncomment the homebase table cell

## 🎯 What This Fixes

- ✅ Removes "column homebase does not exist" error
- ✅ Dashboard loads without errors
- ✅ CRUD operations work normally
- ✅ Photo upload continues to work
- ✅ Toast notifications continue to work

## 📋 Current Status

- **Backend:** Homebase temporarily disabled ✅
- **Frontend:** Homebase UI temporarily hidden ✅
- **Database:** Schema ready to apply 📋
- **Features:** All other features working ✅

## 🔄 After Schema Applied

Once you've applied the schema to Neon:
1. All professor data will have a `homebase` column
2. You can uncomment the homebase features
3. Professors can be categorized as "Informatika" or "Sistem Informasi"
4. The dashboard will show color-coded homebase badges

## 📞 Need Help?

If you encounter any issues:
1. Check the Neon Console for SQL execution errors
2. Verify the schema was applied by running: `SELECT column_name FROM information_schema.columns WHERE table_name = 'professors';`
3. Restart both backend and frontend after schema changes
