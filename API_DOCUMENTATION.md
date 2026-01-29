# MusnestFinance API Documentation

**Base URL**: `http://localhost:{PORT}` (default: 3000)
**Swagger UI**: `http://localhost:{PORT}/api/docs`

## Table of Contents
- [Authentication](#authentication)
- [Admins Module](#admins-module)
- [Clients Module](#clients-module)
- [Transactions Module](#transactions-module)
- [Announcements Module](#announcements-module)
- [Error Codes](#error-codes)
- [Schemas](#schemas)

---

## Authentication

This API uses **JWT Bearer Token** authentication.

### How to Authenticate
1. Login using `/admins/login` or `/clients/login`
2. Receive a JWT token in the response
3. Include the token in subsequent requests:
   ```
   Authorization: Bearer {your-token-here}
   ```

### Token Payload

**Admin Token**:
```json
{
  "id": "admin_id",
  "email": "admin@example.com",
  "name": "Admin Name",
  "role": "admin"
}
```

**Client Token**:
```json
{
  "sub": "client_id",
  "email": "client@example.com",
  "role": "client"
}
```

---

## Admins Module

Base path: `/admins`

### 1. Admin Signup

**POST** `/admins/signup`

Create a new admin account (public access).

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "admin@example.com",
  "password": "SecurePass123!"
}
```

**Response** (201):
```json
{
  "message": "Admin created successfully"
}
```

**Errors**:
- `400`: Admin with this email already exists

---

### 2. Admin Login

**POST** `/admins/login`

Authenticate admin and receive JWT token.

**Request Body**:
```json
{
  "email": "admin@example.com",
  "password": "SecurePass123!"
}
```

**Response** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors**:
- `400`: Invalid email or password

---

### 3. Get All Admins

**GET** `/admins`

Get list of all administrators (excludes passwords).

**Auth Required**: Yes (Admin only)

**Response** (200):
```json
[
  {
    "_id": "65abc123...",
    "name": "John Doe",
    "email": "admin@example.com",
    "createdAt": "2026-01-28T10:30:34.567Z",
    "updatedAt": "2026-01-28T10:30:34.567Z"
  }
]
```

---

### 4. Get Admin by ID

**GET** `/admins/:id`

Get specific admin details.

**Auth Required**: Yes (Admin only)

**Response** (200):
```json
{
  "_id": "65abc123...",
  "name": "John Doe",
  "email": "admin@example.com",
  "createdAt": "2026-01-28T10:30:34.567Z",
  "updatedAt": "2026-01-28T10:30:34.567Z"
}
```

---

### 5. Update Admin

**PATCH** `/admins/:id`

Update admin details (can only update own account).

**Auth Required**: Yes (Admin only, self-only)

**Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "newemail@example.com",
  "password": "NewSecurePass123!"
}
```

**Response** (200):
```json
{
  "message": "Admin updated successfully"
}
```

**Errors**:
- `403`: You cannot modify other admin accounts

---

### 6. Delete Admin

**DELETE** `/admins/:id`

Delete admin account (can only delete own account).

**Auth Required**: Yes (Admin only, self-only)

**Response** (200):
```json
{
  "message": "Admin deleted successfully"
}
```

**Errors**:
- `403`: You cannot modify other admin accounts

---

## Clients Module

Base path: `/clients`

### 1. Create Client (Register)

**POST** `/clients`

Register a new client (public access, no auth required).

**Request Body**:
```json
{
  "companyName": "Tech Corp",
  "contactFirstName": "John",
  "contactLastName": "Smith",
  "contactNumber": "+1234567890",
  "contactEmail": "john@techcorp.com",
  "clientMessage": "We would like to register our business"
}
```

**Response** (201):
```json
{
  "message": "Client created successfully",
  "newClient": {
    "_id": "65abc123...",
    "companyName": "Tech Corp",
    "contactFirstName": "John",
    "contactLastName": "Smith",
    "contactNumber": "+1234567890",
    "contactEmail": "john@techcorp.com",
    "clientMessage": "We would like to register our business",
    "isVerified": false,
    "createdAt": "2026-01-28T10:30:34.567Z",
    "updatedAt": "2026-01-28T10:30:34.567Z"
  }
}
```

---

### 2. Get All Clients

**GET** `/clients`

Get list of all clients.

**Auth Required**: Yes (Admin or Client)

**Response** (200):
```json
{
  "message": "Clients retrieved successfully",
  "clients": [
    {
      "_id": "65abc123...",
      "companyName": "Tech Corp",
      "companyEmail": "info@techcorp.com",
      "companyAddress": "123 Business St",
      "companyLogoUrl": "https://bucket.r2.dev/images/...",
      "contactFirstName": "John",
      "contactLastName": "Smith",
      "contactDesignation": "CEO",
      "contactNumber": "+1234567890",
      "contactEmail": "john@techcorp.com",
      "businessRegistrationUrl": "https://bucket.r2.dev/images/...",
      "mayorsPermitUrl": "https://bucket.r2.dev/images/...",
      "birCrUrl": "https://bucket.r2.dev/images/...",
      "clientMessage": "We would like to register our business",
      "isVerified": true,
      "createdAt": "2026-01-28T10:30:34.567Z",
      "updatedAt": "2026-01-28T10:30:34.567Z"
    }
  ]
}
```

---

### 3. Get Client by ID

**GET** `/clients/:id`

Get specific client details.

**Auth Required**: Yes (Admin or Client)

**Response** (200):
```json
{
  "message": "Client retrieved successfully",
  "client": {
    "_id": "65abc123...",
    "companyName": "Tech Corp",
    ...
  }
}
```

---

### 4. Update Client

**PATCH** `/clients/:id`

Update client information.

**Auth Required**: Yes (Admin or Client)

**Request Body**:
```json
{
  "companyName": "Tech Corp Updated",
  "companyEmail": "info@techcorp.com",
  "companyAddress": "456 New Address",
  "companyLogoUrl": "https://...",
  "contactFirstName": "John",
  "contactLastName": "Smith",
  "contactDesignation": "CEO",
  "contactNumber": "+1234567890",
  "contactEmail": "john@techcorp.com",
  "businessRegistrationUrl": "https://...",
  "mayorsPermitUrl": "https://...",
  "birCrUrl": "https://..."
}
```

**Response** (200):
```json
{
  "message": "Client updated successfully",
  "client": { ... }
}
```

---

### 5. Delete Client

**DELETE** `/clients/:id`

Delete a client account.

**Auth Required**: Yes (Admin or Client)

**Response** (200):
```json
{
  "message": "Client deleted successfully"
}
```

---

### 6. Approve Client

**PATCH** `/clients/approve/:id`

Approve client registration and set password (Admin only).

**Auth Required**: Yes (Admin only)

**Request Body**:
```json
{
  "password": "ClientPassword123!",
  "isVerified": true
}
```

**Response** (200):
```json
{
  "message": "Client approved successfully",
  "client": {
    "_id": "65abc123...",
    "isVerified": true,
    ...
  }
}
```

---

### 7. Client Login

**POST** `/clients/login`

Authenticate client and receive JWT token.

**Request Body**:
```json
{
  "contactEmail": "john@techcorp.com",
  "password": "ClientPassword123!"
}
```

**Response** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors**:
- `400`: Invalid credentials
- `400`: Failed to login client

---

### 8. Upload Client Document

**POST** `/clients/upload?documentType={type}`

Upload client documents (logo, permits, certificates).

**Auth Required**: Yes (Client only)

**Content-Type**: `multipart/form-data`

**Query Parameters**:
- `documentType` (required): One of:
  - `companyLogoUrl`
  - `businessRegistrationUrl`
  - `mayorsPermitUrl`
  - `birCrUrl`

**Request Body** (form-data):
```
file: [image file] (max 5MB, jpg/jpeg/png/gif/webp)
```

**Response** (200):
```json
{
  "url": "https://bucket.r2.dev/images/2026-01-28/1738080234567-a3f9c2e1b5d4.jpg",
  "key": "images/2026-01-28/1738080234567-a3f9c2e1b5d4.jpg",
  "fileName": "business-reg.jpg",
  "size": 245678,
  "mimetype": "image/jpeg",
  "uploadedAt": "2026-01-28T10:30:34.567Z"
}
```

**Errors**:
- `400`: No file uploaded
- `400`: Only image files are allowed
- `400`: documentType query parameter is required
- `400`: Invalid documentType

---

## Transactions Module

Base path: `/transactions`

### 1. Create Transaction

**POST** `/transactions`

Create a new transaction (with or without receipt image).

**Auth Required**: Yes (Client only)

**Option A: JSON (without image)**

**Content-Type**: `application/json`

**Request Body**:
```json
{
  "description": "Office supplies purchase",
  "amount": "5000",
  "category": "Office Expenses"
}
```

**Option B: Form-Data (with image)**

**Content-Type**: `multipart/form-data`

**Request Body** (form-data):
```
description: Office supplies purchase
amount: 5000
category: Office Expenses
file: [receipt image] (optional, max 5MB)
```

**Response** (201):
```json
{
  "transaction": {
    "clientId": "65abc123...",
    "description": "Office supplies purchase",
    "amount": "5000",
    "category": "Office Expenses",
    "receiptUrl": "https://bucket.r2.dev/images/...",
    "_id": "65def456...",
    "createdAt": "2026-01-28T10:30:34.567Z",
    "updatedAt": "2026-01-28T10:30:34.567Z"
  }
}
```

**Errors**:
- `400`: Failed to create Transaction
- `400`: Only image files are allowed (if file provided)

---

### 2. Upload Receipt to Transaction

**POST** `/transactions/:id/upload-receipt`

Upload receipt image for an existing transaction.

**Auth Required**: Yes (Client only)

**Content-Type**: `multipart/form-data`

**Request Body** (form-data):
```
file: [receipt image] (max 5MB, jpg/jpeg/png/gif/webp)
```

**Response** (200):
```json
{
  "url": "https://bucket.r2.dev/images/2026-01-28/1738080234567-a3f9c2e1b5d4.jpg",
  "key": "images/2026-01-28/1738080234567-a3f9c2e1b5d4.jpg",
  "fileName": "receipt.jpg",
  "size": 245678,
  "mimetype": "image/jpeg",
  "uploadedAt": "2026-01-28T10:30:34.567Z"
}
```

**Errors**:
- `400`: No file uploaded
- `400`: Only image files are allowed
- `400`: Failed to upload receipt

---

## Announcements Module

Base path: `/announcements`

### 1. Create Announcement

**POST** `/announcements`

Create a new system announcement.

**Auth Required**: Yes (Admin only)

**Request Body**:
```json
{
  "title": "System Maintenance",
  "description": "The system will be under maintenance on January 30, 2026."
}
```

**Response** (201):
```json
{
  "_id": "65xyz789...",
  "title": "System Maintenance",
  "description": "The system will be under maintenance on January 30, 2026.",
  "createdAt": "2026-01-28T10:30:34.567Z",
  "updatedAt": "2026-01-28T10:30:34.567Z"
}
```

**Errors**:
- `400`: Failed to create announcement

---

### 2. Get All Announcements

**GET** `/announcements`

Get list of all announcements.

**Auth Required**: Yes (User or Admin)

**Response** (200):
```json
[
  {
    "_id": "65xyz789...",
    "title": "System Maintenance",
    "description": "The system will be under maintenance on January 30, 2026.",
    "createdAt": "2026-01-28T10:30:34.567Z",
    "updatedAt": "2026-01-28T10:30:34.567Z"
  }
]
```

**Errors**:
- `400`: No announcements found

---

### 3. Update Announcement

**PATCH** `/announcements/:id`

Update an existing announcement.

**Auth Required**: Yes (Admin only)

**Request Body**:
```json
{
  "title": "System Maintenance - Updated",
  "description": "Maintenance rescheduled to February 1, 2026."
}
```

**Response** (200):
```json
{
  "message": "updated sucessfully",
  "UpdatedAnnouncement": {
    "_id": "65xyz789...",
    "title": "System Maintenance - Updated",
    "description": "Maintenance rescheduled to February 1, 2026.",
    "createdAt": "2026-01-28T10:30:34.567Z",
    "updatedAt": "2026-01-28T10:35:12.345Z"
  }
}
```

**Errors**:
- `400`: Announcement not found
- `400`: Failed to update announcement

---

### 4. Delete Announcement

**DELETE** `/announcements/:id`

Delete an announcement.

**Auth Required**: Yes (Admin only)

**Response** (200):
```json
{
  "message": "Announcement deleted successfully"
}
```

**Errors**:
- `400`: Failed to delete announcement

---

## Error Codes

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200  | OK - Request succeeded |
| 201  | Created - Resource created successfully |
| 400  | Bad Request - Invalid input or business logic error |
| 401  | Unauthorized - Missing or invalid JWT token |
| 403  | Forbidden - Insufficient permissions |
| 404  | Not Found - Resource not found |
| 500  | Internal Server Error - Server error |

### Common Error Response Format

```json
{
  "statusCode": 400,
  "message": "Error message here",
  "error": "Bad Request"
}
```

---

## Schemas

### Admin Schema

**Collection**: `admins`

```typescript
{
  _id: ObjectId,
  name: string,           // required
  email: string,          // required, unique
  password: string,       // required, hashed with bcrypt
  createdAt: Date,        // auto-generated
  updatedAt: Date         // auto-generated
}
```

---

### Client Schema

**Collection**: `clients`

```typescript
{
  _id: ObjectId,
  companyName: string,                  // required
  companyEmail?: string,
  companyAddress?: string,
  companyLogoUrl?: string,              // URL from Cloudflare R2
  contactFirstName: string,             // required
  contactLastName: string,              // required
  contactDesignation?: string,
  contactNumber: string,                // required
  contactEmail: string,                 // required, unique
  businessRegistrationUrl?: string,     // URL from Cloudflare R2
  mayorsPermitUrl?: string,             // URL from Cloudflare R2
  birCrUrl?: string,                    // URL from Cloudflare R2
  clientMessage: string,                // required
  password?: string,                    // hashed, set during approval
  isVerified: boolean,                  // default: false
  createdAt: Date,                      // auto-generated
  updatedAt: Date                       // auto-generated
}
```

---

### Transaction Schema

**Collection**: `transactions`

```typescript
{
  _id: ObjectId,
  clientId: ObjectId,       // required, ref: 'Clients'
  description: string,      // required
  amount: string,           // required
  receiptUrl?: string,      // URL from Cloudflare R2
  category?: string,
  createdAt: Date,          // auto-generated
  updatedAt: Date           // auto-generated
}
```

---

### Announcement Schema

**Collection**: `announcements`

```typescript
{
  _id: ObjectId,
  title: string,           // required
  description: string,     // required
  createdAt: Date,         // auto-generated
  updatedAt: Date          // auto-generated
}
```

---

## File Upload Specifications

### Supported Image Types
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### File Size Limit
- Maximum: 5MB per file

### Storage
- Cloud Provider: Cloudflare R2 (S3-compatible)
- URL Format: `https://{bucket}.r2.dev/images/{YYYY-MM-DD}/{timestamp}-{random}.{ext}`

### File Organization
```
images/
  └── YYYY-MM-DD/
      ├── timestamp1-random1.jpg
      ├── timestamp2-random2.png
      └── ...
```

---

## Authentication & Authorization Matrix

| Endpoint | Public | Admin | Client |
|----------|--------|-------|--------|
| POST /admins/signup | ✅ | ✅ | ✅ |
| POST /admins/login | ✅ | ✅ | ✅ |
| GET /admins | ❌ | ✅ | ❌ |
| GET /admins/:id | ❌ | ✅ | ❌ |
| PATCH /admins/:id | ❌ | ✅ (self) | ❌ |
| DELETE /admins/:id | ❌ | ✅ (self) | ❌ |
| POST /clients | ✅ | ✅ | ✅ |
| GET /clients | ❌ | ✅ | ✅ |
| GET /clients/:id | ❌ | ✅ | ✅ |
| PATCH /clients/:id | ❌ | ✅ | ✅ |
| DELETE /clients/:id | ❌ | ✅ | ✅ |
| PATCH /clients/approve/:id | ❌ | ✅ | ❌ |
| POST /clients/login | ✅ | ✅ | ✅ |
| POST /clients/upload | ❌ | ❌ | ✅ |
| POST /transactions | ❌ | ❌ | ✅ |
| POST /transactions/:id/upload-receipt | ❌ | ❌ | ✅ |
| POST /announcements | ❌ | ✅ | ❌ |
| GET /announcements | ❌ | ✅ | ✅ (user) |
| PATCH /announcements/:id | ❌ | ✅ | ❌ |
| DELETE /announcements/:id | ❌ | ✅ | ❌ |

---

## Development Notes

### Environment Variables Required

```env
# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d

# Database
MONGO_URI=mongodb://localhost:27017/musnest-finance

# Server
PORT=3000
DEV=DEVELOPMENT

# Cloudflare R2
CLOUDFLARE_SECRET_ACCESS_KEY=your_secret_key
CLOUDFLARE_ACCESS_KEY_ID=your_access_key_id
CLOUDFLARE_ENDPOINT=https://account-id.r2.cloudflarestorage.com
CLOUDFLARE_BUCKET=your_bucket_name
```

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)

### Important Notes
1. **Admin Token Field**: Uses `id` field (not `sub`)
2. **Client Token Field**: Uses `sub` field (not `id`)
3. **Client Workflow**: Register → Admin Approves → Client Can Login
4. **File Uploads**: Automatically update corresponding database fields
5. **Transaction Creation**: Auto-links to authenticated client via JWT

---

## Version History

- **v1.0.0** (2026-01-28) - Initial API release
  - Admin authentication
  - Client registration & approval workflow
  - Transaction management with receipt upload
  - Announcement system
  - Cloudflare R2 integration for image storage

---

**Last Updated**: 2026-01-28
**API Version**: 1.0.0
**Documentation Version**: 1.0.0
