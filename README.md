# 🎒 ABES-Findify

**ABES-Findify** is a **Lost & Found Portal** designed specifically for **ABES Engineering College students**.  
The platform helps students easily report lost items, report found items, and connect with each other to recover belongings within the campus.

---

## 📌 Problem Statement
In a large college campus, students often lose personal belongings such as ID cards, wallets, books, or electronic items.  
Traditional notice boards are inefficient and slow. **ABES-Findify** provides a **digital, centralized solution** to this problem.

---

## 🚀 Features

### 🔍 Lost Item Reporting
- Students can report items they have lost on campus
- Provide important details like item name, description, location, and date

### 📦 Found Item Reporting
- Students can report items they have found within the campus
- Share relevant information to help identify the rightful owner

### 🔔 Smart Alert System
- **“I Found Your Item”**  
  → Used when someone finds an item reported as lost
- **“I Claim My Item”**  
  → Used when someone believes a found item belongs to them

### 👥 Student-to-Student Interaction
- Direct alerts help connect the finder and owner
- Reduces delays and miscommunication

### 🎨 User-Friendly Interface
- Simple and intuitive UI
- Easy navigation for students

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- HTML
- CSS
- JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB

---

## ⚡ Getting Started

Clone the repository  
```bash
git clone https://github.com/Coder-0120/ABES_FINDIFY.git
cd ABES_FINDIFY
```

Install backend dependencies
```bash
cd backend
npm install
cd--
```

Install frontend dependencies
```bash
cd frontend
npm install
```

Create a .env file in the root directory:  
- PORT=5000  
- MONGO_URI=your_mongodb_connection_string

Run the development server
```bash
npm run dev
```
Frontend will run at http://localhost:3000  
Backend will run at http://localhost:5000

