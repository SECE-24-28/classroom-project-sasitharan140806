# 🚀 Mock API Integration Guide

## Overview
Your mobile recharge website now uses a **Mock API** that simulates a real backend server with JSON data files. All pages display **real-time data** from the API.

---

## 📁 File Structure

```
mobapp/
├── api/
│   ├── users.json          # User accounts database
│   ├── plans.json          # Recharge plans for all operators
│   ├── transactions.json   # Transaction history
│   └── offers.json         # Cashback offers
├── js/
│   └── mockAPI.js          # API service handler
├── test-api.html           # API testing interface
├── moblogin.html           # Login page (API integrated ✅)
├── register.html           # Registration page (API integrated ✅)
├── customer-dashboard.html # Customer dashboard (API integrated ✅)
└── admin-dashboard.html    # Admin dashboard (API integrated ✅)
```

---

## 🔑 Test Credentials

### Admin Account
- **Email:** `admin@recharge.com`
- **Password:** `admin123`
- **Role:** Admin
- **Access:** Admin Dashboard with full statistics

### Customer Accounts
1. **User 1:**
   - **Mobile/Email:** `sasi@example.com` or `9876543211`
   - **Password:** `user123`
   - **Role:** Customer

2. **User 2:**
   - **Mobile/Email:** `priya@example.com` or `9876543212`
   - **Password:** `user123`
   - **Role:** Customer

---

## 🎯 Features Working with Mock API

### ✅ Login Page (`moblogin.html`)
- Real-time authentication against API
- Auto role detection (admin/customer)
- Automatic redirect based on role
- Loading states and error handling

### ✅ Registration Page (`register.html`)
- New user creation in API
- Duplicate email/mobile validation
- Auto-generated user IDs
- Success/error feedback

### ✅ Customer Dashboard (`customer-dashboard.html`)
**Real-time data displayed:**
- Total Spent (from transactions)
- Total Recharges count
- Total Cashback earned
- Active Plans
- Monthly spending chart (last 6 months)
- Operator distribution chart
- Recent recharge transactions with status

### ✅ Admin Dashboard (`admin-dashboard.html`)
**Real-time statistics:**
- Total Revenue
- Total Users
- Total Transactions
- Success Rate
- Active Users
- Average Transaction
- Weekly revenue chart
- Operator distribution chart
- Recent transaction table (10 latest)

---

## 🧪 How to Test

### Important: Wait for API to Initialize! ⚠️
When you open the login page, you'll see a **yellow banner** saying "Initializing API...". Wait 1-2 seconds until it turns **green** and says "API Ready - You can login now". The login button will be disabled (grayed out) until the API is ready.

### Method 1: Use Test Interface
1. Open `test-api.html` in your browser
2. Click any button to test API endpoints
3. View real-time results in output panels

### Method 2: Use Actual Pages
1. Open `moblogin.html`
2. Login with test credentials
3. View real-time data in dashboards

### Method 3: Browser Console
```javascript
// Test login
mockAPI.login('sasi@example.com', 'user123')
  .then(result => console.log(result));

// Get user statistics
mockAPI.getUserStatistics(2)
  .then(result => console.log(result));

// Get all offers
mockAPI.getOffers()
  .then(result => console.log(result));
```

---

## 📊 Available API Methods

### Authentication
```javascript
mockAPI.login(email, password)
mockAPI.register(userData)
mockAPI.getUserProfile(userId)
```

### Plans
```javascript
mockAPI.getPlans(operator)      // 'jio', 'airtel', 'vi', 'bsnl'
mockAPI.getAllPlans()
mockAPI.getPlanById(planId)
```

### Transactions
```javascript
mockAPI.createTransaction(data)
mockAPI.getTransactions(userId, limit)
mockAPI.getTransactionById(transactionId)
```

### Offers
```javascript
mockAPI.getOffers()
mockAPI.applyOffer(offerCode, amount)
```

### Statistics
```javascript
mockAPI.getStatistics()              // Admin stats
mockAPI.getUserStatistics(userId)    // Customer stats
```

---

## 🎨 Real-Time Features

### Auto-Loading
- Data loads automatically 1.5 seconds after page load
- Simulates network delay (500ms per API call)
- Console logs show success/failure

### Dynamic Updates
- Charts update with real data
- Transaction tables populate from API
- Stat cards show live numbers

### Visual Feedback
- ✅ Success alerts with checkmark
- ❌ Error alerts with X mark
- Loading states on buttons
- Console logging for debugging

---

## 📝 Sample Data

### Users
- 1 Admin account
- 2 Customer accounts
- Total: 3 users

### Transactions
- 7 sample transactions
- Mix of success/pending/failed status
- Different operators and amounts

### Plans
- **Jio:** 5 plans (₹25 - ₹2999)
- **Airtel:** 5 plans (₹48 - ₹3359)
- **Vi:** 3 plans (₹58 - ₹699)
- **BSNL:** 3 plans (₹47 - ₹1999)

### Offers
- 3 active cashback offers
- Percentage and fixed discounts
- Minimum amount requirements

---

## 🔄 How It Works

1. **Page Load:**
   - `mockAPI.js` loads first
   - Fetches all JSON files
   - Initializes data in memory

2. **User Action:**
   - Form submission triggers API call
   - API simulates 500ms network delay
   - Returns JSON response

3. **Data Display:**
   - Page updates with API data
   - Charts refresh automatically
   - Tables populate dynamically

---

## 🛠️ Customization

### Add New User
Edit `api/users.json`:
```json
{
  "id": 4,
  "firstName": "Your",
  "lastName": "Name",
  "email": "your@example.com",
  "mobile": "9876543213",
  "password": "yourpass",
  "role": "customer",
  "walletBalance": 1000
}
```

### Add New Plan
Edit `api/plans.json` under desired operator:
```json
{
  "id": "jio_6",
  "operator": "Jio",
  "amount": 599,
  "validity": "56 days",
  "data": "2GB/day",
  "voice": "Unlimited",
  "sms": "100/day",
  "type": "unlimited",
  "popular": true
}
```

### Add Transaction
Edit `api/transactions.json`:
```json
{
  "id": "TXN001235",
  "userId": 2,
  "userName": "Test User",
  "mobile": "9876543211",
  "operator": "Jio",
  "amount": 299,
  "status": "success",
  "paymentMethod": "UPI",
  "transactionDate": "2024-12-05T15:00:00Z",
  "cashback": 15
}
```

---

## ⚠️ Important Notes

1. **Local Storage:** Changes to JSON files require page refresh
2. **No Persistence:** API data resets when JSON files are reloaded
3. **90% Success Rate:** Transactions have 10% random failure
4. **Browser Required:** Must run in browser, not file system directly
5. **CORS:** Use Live Server or local server for testing

---

## 🚀 For Production

To make this production-ready:
1. Replace Mock API with real backend (Node.js, Python, PHP)
2. Use real database (MongoDB, MySQL, PostgreSQL)
3. Add authentication tokens (JWT)
4. Implement secure password hashing (bcrypt)
5. Add API rate limiting
6. Enable HTTPS encryption
7. Add server-side validation

---

## 📞 Support

For questions or issues:
- Check browser console for error messages
- Verify all JSON files are present
- Ensure `mockAPI.js` loads before other scripts
- Test with `test-api.html` first

---

**✨ Your website now displays real-time data from Mock API! ✨**
