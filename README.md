# Pharmacy Management System

A simple online system for local pharmacies to manage medicines

## Task 1

* Purpose or intro for pharmacy app
* System Design
* Overview description with features and business case
* Tech Stack

### Introduction

Pharmacy management System is an web app for management of medicines and display inventory status exists or sold out (need to update). It also manages orders and pharmacists selling and approve or reject prescriptions.

### #1 User Flow Diagram

![Pharmacy Flow Diagram](./imgs/pharmacy_flow_diagram.png)


### #2 Core Modules/Functions

* [ ] User Management
* [ ] Authentication
* [ ] Inventory Management
* [ ] Prescription
* [ ] Orders Management

#### Tech Stack

* Backend: Nodejs + Express
* Database: MySQL
* FrontEnd: React or Next.js
* Auth: JWT + Role-based Access

## Task 2

1. Each main task should be described with points
2. steps for implement these tasks

### User Management

* [ ] Users' Roles and Permissions (Admins, Pharmacists, Patients, Doctors) <br>
* [ ] Role hierarchy with permissions <br>

#### Steps

step 1: Design a ER Model/Diagram for all app <br>
step 2: Create relational DB Tables <br>
step 3: Create Backend folders and files structure <br>
step 4: Create package.json file using "npm init --y" <br>
step 5: fill tables with metadata

### Authentication

* [ ] JWT (LogIn/SignUp)

### Medicine Inventory Module

* [ ] CRUD Operations

* Automatically subtracts sold medicines

* Adds new stock when deliveries arrive

* Shows warnings when stock is low

### Prescription Upload Module

* [ ] Customer uploads prescription
* [ ] Pharmacist/Admin can approve or reject

### Cart & Order Module

* [ ] Add to Cart
* [ ] Checkout

## #3 Future Features

* [ ] Admin Dashboard
* [ ] Search & Filters
* [ ] Payment Integration
* [ ] Approve & Manage Prescription
* [ ] Email Notification
* [ ] Invoice Generator
* [ ] Multi-Store Support
* [ ] Doctor Module
* [ ] Chat Support
