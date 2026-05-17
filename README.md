# 🐾 Home4Paws Backend

Backend API for the **Home4Paws** pet adoption management system.  
This project provides REST APIs for managing pets, users, adoptions, shelters, and authentication.

GitHub Repository:  
:contentReference[oaicite:0]{index=0}

---

# 📌 Project Overview

Home4Paws is a pet adoption platform designed to connect shelters with people who are looking to adopt pets.

This backend handles:

- User Authentication & Authorization
- Pet Management
- Adoption Requests
- Shelter Management
- Database Operations
- REST API Services
- Secure Data Handling
- Frontend Communication

---

# 🚀 Features

## 👤 User Features

- Register new users
- Login authentication
- Manage user profiles
- View available pets
- Submit adoption requests

## 🐶 Pet Features

- Add new pets
- Update pet information
- Delete pets
- Upload pet details
- View adoption availability

## 🏠 Shelter Features

- Manage shelter information
- Add pets under shelters
- Track adoption requests

## 🔐 Security Features

- JWT Authentication
- Password Encryption
- Protected Routes
- Role-based Access

---

# 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Backend Runtime |
| Express.js | API Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| dotenv | Environment Variables |
| Postman | API Testing |

---

# 📂 Project Structure

```bash
Home4Paws-Backend/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── uploads/
├── .env
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Installation Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Linath-Perera/Home4Paws-Backend.git
````

### 2️⃣ Navigate to the Project

```bash
cd Home4Paws-Backend
```

### 3️⃣ Install Dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory.

### Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## ▶️ Running the Project

### Start Development Server

```bash
npm run dev
```

### Start Production Server

```bash
npm start
```

Server will run on:

```
http://localhost:5000
```

---

## 🧪 API Testing with Postman

### 📥 Import APIs into Postman

* Open Postman
* Click **New Collection**
* Add requests manually OR import a JSON collection
* Set request method and URL

---

## 🔐 Authentication APIs

### Register User

**POST**

```
http://localhost:5000/api/auth/register
```

**Body (JSON)**

```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456"
}
```

---

### Login User

**POST**

```
http://localhost:5000/api/auth/login
```

**Body (JSON)**

```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

**Response Example**

```json
{
  "token": "jwt_token_here"
}
```

---

## 🐾 Pet APIs

### Get All Pets

**GET**

```
http://localhost:5000/api/pets
```

---

### Add New Pet

**POST**

```
http://localhost:5000/api/pets
```

**Headers**

```
Authorization: Bearer YOUR_TOKEN
```

**Body (JSON)**

```json
{
  "name": "Bella",
  "type": "Dog",
  "age": 2,
  "breed": "Golden Retriever"
}
```

---

### Update Pet

**PUT**

```
http://localhost:5000/api/pets/:id
```

---

### Delete Pet

**DELETE**

```
http://localhost:5000/api/pets/:id
```

---

## ❤️ Adoption APIs

### Create Adoption Request

**POST**

```
http://localhost:5000/api/adoptions
```

**Headers**

```
Authorization: Bearer YOUR_TOKEN
```

---

### Get Adoption Requests

**GET**

```
http://localhost:5000/api/adoptions
```

---

## 🌐 Frontend Integration

The frontend application communicates with this backend using REST APIs.

### Example Fetch Request

```javascript
fetch("http://localhost:5000/api/pets")
  .then((res) => res.json())
  .then((data) => console.log(data));
```

---

## 💻 Recommended Frontend Technologies

* React.js
* Next.js
* Angular
* Vue.js
* Flutter
* React Native

---

## 🔄 Backend Workflow

### User Flow

1. User registers or logs in
2. JWT token is generated
3. User accesses protected APIs
4. User views pets
5. User sends adoption request
6. Shelter/Admin reviews request

---

## 📸 Postman Testing Workflow

### Step 1

Register a new user

### Step 2

Login and copy JWT token

### Step 3

Use token in Authorization header:

```
Bearer YOUR_TOKEN
```

### Step 4

Test protected routes

---

## 🧱 Future Improvements

* Image Upload Support
* Email Notifications
* AI-based Pet Recommendations
* Payment Integration
* Admin Dashboard
* Real-time Notifications

---

## 🤝 Contributing

Contributions are welcome!

### Steps:

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push changes
5. Create Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Developed by **Linath Perera**

GitHub: [https://github.com/Linath-Perera](https://github.com/Linath-Perera)

```
```
