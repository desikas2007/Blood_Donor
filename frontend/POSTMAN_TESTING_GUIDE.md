# 🧪 Postman Testing Guide — Blood Donor Portal Backend

## Setup

**Base URL:** `http://localhost:3001/api`

> Start your backend first: `cd backend && npm run start:dev`

---

## 📋 Test Flow (Follow in Order)

```
1. Register User (Auth)
2. Login (Auth)
3. Create Donor Profile
4. Create Requester Profile (Hospital)
5. Search Donors (Public)
6. Get Donor by ID
7. Create Blood Request
8. View Sent Requests
9. View Received Requests
10. Update Request Status
```

---

## 1. AUTH — Register

### POST `http://localhost:3001/api/auth/register`

**Body → raw → JSON:**

```json
{
  "name": "Arjun Kumar",
  "email": "arjun@example.com",
  "phone": "+91-9876543210",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "donor",
  "blood_group": "O+",
  "city": "Tiruchengode",
  "state": "Tamil Nadu"
}
```

**Expected Response (201):**
```json
{
  "user": {
    "id": "u1724...",
    "email": "arjun@example.com",
    "role": "donor",
    "created_at": "2026-08-22T..."
  },
  "token": "jwt-token-u1724..."
}
```

**Copy the `token` — you'll use it for authenticated requests.**

---

### Register Hospital

```json
{
  "name": "Hospital Admin",
  "email": "cityhospital@example.com",
  "phone": "+91-9876543220",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "hospital",
  "hospital_name": "City Hospital",
  "city": "Tiruchengode",
  "state": "Tamil Nadu",
  "address": "123 Main Road, Tiruchengode"
}
```

### Register Organization

```json
{
  "name": "Org Admin",
  "email": "redcross@example.com",
  "phone": "+91-9876543230",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "organization",
  "organization_name": "Red Cross Society",
  "organization_type": "NGO",
  "city": "Erode",
  "state": "Tamil Nadu",
  "address": "456 Hospital Road, Erode"
}
```

### ❌ Test Duplicate Registration

```json
{
  "name": "Arjun Kumar",
  "email": "arjun@example.com",
  "phone": "+91-9876543210",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "donor"
}
```

**Expected Response (401):**
```json
{
  "statusCode": 401,
  "message": "Email already registered"
}
```

### ❌ Test Missing Fields

```json
{
  "email": "test@example.com"
}
```

**Expected Response (400):**
```json
{
  "statusCode": 400,
  "message": ["name should not be empty", "password must be longer than or equal to 6 characters", ...]
}
```

---

## 2. AUTH — Login

### POST `http://localhost:3001/api/auth/login`

**Body → raw → JSON:**

```json
{
  "email": "arjun@example.com",
  "password": "password123",
  "role": "donor"
}
```

**Expected Response (200):**
```json
{
  "user": {
    "id": "u1724...",
    "email": "arjun@example.com",
    "role": "donor",
    "created_at": "2026-08-22T..."
  },
  "token": "jwt-token-u1724..."
}
```

**Copy the `token` value for later requests.**

### ❌ Test Wrong Credentials

```json
{
  "email": "arjun@example.com",
  "password": "wrongpassword",
  "role": "donor"
}
```

**Expected Response (401):**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials"
}
```

### ❌ Test Wrong Role

```json
{
  "email": "arjun@example.com",
  "password": "password123",
  "role": "hospital"
}
```

**Expected Response (401):**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials"
}
```

---

## 3. DONORS — Create Profile

### POST `http://localhost:3001/api/donors`

**Body → raw → JSON:**

```json
{
  "full_name": "Arjun Kumar",
  "phone": "+91-9876543210",
  "email": "arjun@example.com",
  "blood_group": "O+",
  "city": "Tiruchengode",
  "state": "Tamil Nadu",
  "last_donation_date": "2026-05-15",
  "available": true
}
```

**Expected Response (201):**
```json
{
  "id": "d1724...",
  "full_name": "Arjun Kumar",
  "phone": "+91-9876543210",
  "email": "arjun@example.com",
  "blood_group": "O+",
  "city": "Tiruchengode",
  "state": "Tamil Nadu",
  "last_donation_date": "2026-05-15",
  "available": true,
  "created_at": "2026-08-22T..."
}
```

**Copy the `id` — use it as `donorId` in requests.**

### Create More Donors (for search testing)

```json
{
  "full_name": "Priya R",
  "phone": "+91-9876543211",
  "email": "priya@example.com",
  "blood_group": "A+",
  "city": "Erode",
  "state": "Tamil Nadu",
  "available": true
}
```

```json
{
  "full_name": "Vikram Singh",
  "phone": "+91-9876543212",
  "email": "vikram@example.com",
  "blood_group": "B+",
  "city": "Coimbatore",
  "state": "Tamil Nadu",
  "available": false
}
```

```json
{
  "full_name": "Ravi Patel",
  "phone": "+91-9876543214",
  "email": "ravi@example.com",
  "blood_group": "O-",
  "city": "Salem",
  "state": "Tamil Nadu",
  "available": true
}
```

---

## 4. DONORS — Search (Public)

### GET `http://localhost:3001/api/donors`

**No body needed.**

**Expected Response (200):** Returns array of all donors.

---

### GET `http://localhost:3001/api/donors?blood_group=O+`

**Query Params:**

| Key | Value |
|-----|-------|
| blood_group | O+ |

**Expected Response (200):** Only donors with blood group O+.

---

### GET `http://localhost:3001/api/donors?city=Erode`

**Query Params:**

| Key | Value |
|-----|-------|
| city | Erode |

**Expected Response (200):** Only donors in Erode.

---

### GET `http://localhost:3001/api/donors?blood_group=A%2B&city=Erode`

> Note: `+` in URL is encoded as `%2B`

**Query Params:**

| Key | Value |
|-----|-------|
| blood_group | A+ |
| city | Erode |

**Expected Response (200):** Only donors matching both filters.

---

## 5. DONORS — Get by ID

### GET `http://localhost:3001/api/donors/{id}`

Replace `{id}` with the donor ID from step 3 (e.g., `d1724...`).

**Expected Response (200):** Full donor profile object.

### ❌ Test Non-existent Donor

### GET `http://localhost:3001/api/donors/d999`

**Expected Response (404):**
```json
{
  "statusCode": 404,
  "message": "Donor not found"
}
```

---

## 6. DONORS — Update Profile

### PATCH `http://localhost:3001/api/donors/{id}`

**Body → raw → JSON:**

```json
{
  "available": false,
  "last_donation_date": "2026-08-20"
}
```

**Expected Response (200):** Updated donor object.

---

## 7. REQUESTERS — Create Hospital Profile

### POST `http://localhost:3001/api/requesters`

**Body → raw → JSON:**

```json
{
  "type": "hospital",
  "name": "City Hospital",
  "phone": "+91-9876543220",
  "email": "cityhospital@example.com",
  "city": "Tiruchengode",
  "state": "Tamil Nadu",
  "address": "123 Main Road, Tiruchengode"
}
```

**Expected Response (201):**
```json
{
  "id": "req1724...",
  "type": "hospital",
  "name": "City Hospital",
  "phone": "+91-9876543220",
  "email": "cityhospital@example.com",
  "city": "Tiruchengode",
  "state": "Tamil Nadu",
  "address": "123 Main Road, Tiruchengode",
  "created_at": "2026-08-22T..."
}
```

**Copy the `id` — use it as `requesterId` in requests.**

---

### Create Organization Profile

```json
{
  "type": "organization",
  "name": "Red Cross Society",
  "phone": "+91-9876543230",
  "email": "redcross@example.com",
  "city": "Erode",
  "state": "Tamil Nadu",
  "address": "456 Hospital Road, Erode",
  "organization_type": "NGO"
}
```

### ❌ Test Invalid Type

```json
{
  "type": "admin",
  "name": "Bad Request",
  "phone": "+91-1234567890",
  "email": "bad@example.com",
  "city": "Chennai",
  "state": "Tamil Nadu",
  "address": "123 Street"
}
```

**Expected Response (400):**
```json
{
  "statusCode": 400,
  "message": ["type must be one of the following values: hospital, organization"]
}
```

---

## 8. REQUESTERS — Get by ID

### GET `http://localhost:3001/api/requesters/{id}`

Replace `{id}` with the requester ID from step 7.

**Expected Response (200):** Full requester profile.

---

## 9. REQUESTERS — Update Profile

### PATCH `http://localhost:3001/api/requesters/{id}`

**Body → raw → JSON:**

```json
{
  "address": "789 New Road, Tiruchengode"
}
```

**Expected Response (200):** Updated requester object.

---

## 10. BLOOD REQUESTS — Send Request

### POST `http://localhost:3001/api/requests`

**Body → raw → JSON:**

```json
{
  "donor_id": "d1724...",
  "donor_name": "Arjun Kumar",
  "donor_blood_group": "O+",
  "donor_city": "Tiruchengode",
  "requester_id": "req1724...",
  "requester_name": "City Hospital",
  "requester_type": "hospital",
  "blood_group": "O+",
  "message": "Urgent need for O+ blood for a surgery tomorrow."
}
```

> Replace `donor_id` and `requester_id` with actual IDs from previous steps.

**Expected Response (201):**
```json
{
  "id": "r1724...",
  "donor_id": "d1724...",
  "donor_name": "Arjun Kumar",
  "donor_blood_group": "O+",
  "donor_city": "Tiruchengode",
  "requester_id": "req1724...",
  "requester_name": "City Hospital",
  "requester_type": "hospital",
  "blood_group": "O+",
  "message": "Urgent need for O+ blood for a surgery tomorrow.",
  "status": "pending",
  "created_at": "2026-08-22T...",
  "updated_at": "2026-08-22T..."
}
```

**Copy the request `id` for status updates.**

---

## 11. BLOOD REQUESTS — View Sent

### GET `http://localhost:3001/api/requests/sent`

**Expected Response (200):** Array of requests sent by the requester.

> Note: Currently returns all requests (placeholder). Will filter by JWT user when auth is wired.

---

## 12. BLOOD REQUESTS — View Received

### GET `http://localhost:3001/api/requests/received`

**Expected Response (200):** Array of requests received by the donor.

---

## 13. BLOOD REQUESTS — Update Status

### PATCH `http://localhost:3001/api/requests/{id}/status`

**Body → raw → JSON:**

```json
{
  "status": "accepted"
}
```

**Expected Response (200):**
```json
{
  "id": "r1724...",
  "status": "accepted",
  "updated_at": "2026-08-22T..."
}
```

### Test All Status Transitions

**Accept:**
```json
{ "status": "accepted" }
```

**Reject:**
```json
{ "status": "rejected" }
```

**Complete:**
```json
{ "status": "completed" }
```

### ❌ Test Invalid Status

```json
{ "status": "invalid_status" }
```

**Expected Response (400):**
```json
{
  "statusCode": 400,
  "message": ["status must be one of the following values: pending, accepted, rejected, completed"]
}
```

---

## 📊 Quick Reference — All Endpoints

| # | Method | Endpoint | Body Required | Description |
|---|--------|----------|---------------|-------------|
| 1 | POST | `/api/auth/register` | ✅ | Register user |
| 2 | POST | `/api/auth/login` | ✅ | Login |
| 3 | POST | `/api/donors` | ✅ | Create donor profile |
| 4 | GET | `/api/donors` | ❌ | Search donors (query params) |
| 5 | GET | `/api/donors/:id` | ❌ | Get donor by ID |
| 6 | PATCH | `/api/donors/:id` | ✅ | Update donor profile |
| 7 | POST | `/api/requesters` | ✅ | Create requester profile |
| 8 | GET | `/api/requesters/:id` | ❌ | Get requester by ID |
| 9 | PATCH | `/api/requesters/:id` | ✅ | Update requester profile |
| 10 | POST | `/api/requests` | ✅ | Send blood request |
| 11 | GET | `/api/requests/sent` | ❌ | View sent requests |
| 12 | GET | `/api/requests/received` | ❌ | View received requests |
| 13 | PATCH | `/api/requests/:id/status` | ✅ | Update request status |

---

## 🔧 Postman Tips

### Set Environment Variables

Create a Postman Environment called `BloodDonor`:

| Variable | Initial Value | Description |
|----------|---------------|-------------|
| `base_url` | `http://localhost:3001/api` | Backend base URL |
| `token` | (paste after login) | JWT token |
| `donor_id` | (paste after creating donor) | Donor ID |
| `requester_id` | (paste after creating requester) | Requester ID |
| `request_id` | (paste after sending request) | Request ID |

Then use `{{base_url}}/auth/login` in your URLs.

### Add Token to Headers

For authenticated requests, go to **Headers** tab:

| Key | Value |
|-----|-------|
| Authorization | Bearer {{token}} |

> Note: Current backend doesn't enforce JWT auth yet (TODO in code), but the header is ready for when it's implemented.

### Save Requests as a Collection

1. Create Collection: `Blood Donor API`
2. Save each request with a descriptive name
3. Organize folders: `Auth`, `Donors`, `Requesters`, `Requests`

---

## ✅ Verification Checklist

```
□ Register donor → 201
□ Register hospital → 201
□ Register organization → 201
□ Duplicate email → 401
□ Missing fields → 400
□ Login donor → 200
□ Login wrong password → 401
□ Create donor profile → 201
□ Search donors (no filter) → 200 (array)
□ Search donors by blood_group → 200 (filtered)
□ Search donors by city → 200 (filtered)
□ Search donors by both → 200 (filtered)
□ Get donor by ID → 200
□ Get non-existent donor → 404
□ Update donor profile → 200
□ Create requester → 201
□ Get requester by ID → 200
□ Update requester → 200
□ Send blood request → 201
□ View sent requests → 200
□ View received requests → 200
□ Update status to accepted → 200
□ Update status to completed → 200
□ Invalid status → 400
```
