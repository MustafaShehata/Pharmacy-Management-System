# 💊 Pharmacy Management System

A simple online system for local pharmacies to manage medicines, prescriptions, inventory, and orders efficiently.

---

## 📌 Introduction

Pharmacy Management System is a full-stack web application that enables pharmacies to manage:

- Inventory of medicines
- User roles and authentication
- Prescription uploads and approvals
- Order placement and tracking

It supports both administrators and pharmacists in managing pharmacy workflows and assists patients in ordering medicines with or without prescriptions.

---

## 🔍 Problem Statement

Pharmacy management systems often struggle with inefficient inventory tracking and prescription processing, leading to medication errors and operational delays.

- Manual inventory tracking leads to 15-20% medication waste annually
- 40% of pharmacies report prescription processing delays >24 hours

---

## 🛠 Tech Stack

| Layer      | Technology               |
|------------|--------------------------|
| Backend    | Node.js, Express         |
| Database   | MySQL                    |
| Frontend   | React or Next.js         |
| Auth       | JWT + Role-Based Access  |

---

## 🧠 System Overview

### 🗂️ Features

- User Registration and Role-Based Access (Admin, Pharmacist, Patient, Doctor)
- Medicine Inventory Management
- Upload & Approve Prescriptions
- Order Medicines with Cart System
- Track Order History
- Admin Controls

### 🧩 Core Modules

- [ ] ✅ User Management
- [ ] ✅ Authentication
- [ ] ✅ Inventory Management
- [ ] ✅ Prescription Handling
- [ ] ✅ Order Management

---

## 🔄 User Flow Diagram

![Pharmacy Flow Diagram](./imgs/Final_Pharmacy_Diagram.png)

---

## 📋 Task Breakdown

### Task 1: System Design & Setup

- [ ] Purpose, Design, and Feature Overview
- [ ] Create ER Diagram and Plan DB Schema
- [ ] Setup project structure for frontend & backend
- [ ] Initialize `package.json` and install dependencies

---

### Task 2: Feature Development

---

### 🔐 Authentication

- [ ] JWT-based login & registration
- [ ] Role-based access control

**Steps:**

1. Create registration & login forms (React)
2. Create `/register` and `/login` API routes (Node.js)
3. Hash passwords using bcrypt and issue JWT tokens
4. Store user info in MySQL `users` table
5. Enforce role-based route access

---

### 👥 User Management

- [ ] Handle different roles: Admin, Pharmacist, Patient, Doctor
- [ ] Define role hierarchy and permissions

## 🗄️ Database Schema (MySQL)

```sql
users(id, name, email, password, role)
medicines(id, name, category, price, stock, expiry_date)
orders(id, user_id, status, total_price, created_at)
order_items(id, order_id, medicine_id, quantity, price)
prescriptions(id, user_id, file_path, status, uploaded_at)
```

---

## ✅ Setup Steps

1. Design Entity Relationship (ER) Diagram
2. Create MySQL tables from the schema
3. Create backend folder structure (Node.js + Express)
4. Initialize project using `npm init -y`
5. Seed database with sample data

---

## 💊 Medicine Inventory Module

### Features

- Admin: Add, Edit, Delete, and View Medicines (CRUD)
- Patient: Browse available medicines
- Automatically subtract stock when an order is placed
- Restock when new deliveries arrive
- Alert on low stock levels

### Implementation Steps

1. Backend APIs for CRUD operations (Node.js + Express)
2. Admin UI for inventory control (React/Next.js)
3. Patient UI to browse medicines (React/Next.js)

---

## 📄 Prescription Upload Module

### Features

- Patients can upload prescriptions (PDF or Image)
- Pharmacists/Admins can approve or reject them

### Implementation Steps

1. Setup file upload using **Multer** (Node.js)
2. Store file path and metadata in the `prescriptions` table
3. Admin/Pharmacist UI to view and approve/reject files

---

## 🛒 Cart & Order Module

### Features

- Patients can add medicines to cart
- Checkout process to place orders
- View order history and track statuses

### Implementation Steps

1. Implement cart system (Frontend state management + backend persistence)
2. Checkout API to insert into `orders` and `order_items` tables

---

## 🔮 Future Features (Extended)

- [ ] Admin Dashboard for full system analytics
- [ ] Advanced search & filtering on medicines
- [ ] Payment integration (Stripe/PayPal)
- [ ] Invoice generator on order confirmation
- [ ] Multi-store management for chain pharmacies
- [ ] Doctor module for digital prescription issuance
- [ ] Email notifications for orders and approvals
- [ ] Real-time chat support for patient queries
