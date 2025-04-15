SHOW DATABASES;

-- Database: pharmacy_management
CREATE DATABASE pharmacy_system;

USE pharmacy_system;

-- Table: address	(DONE)
CREATE TABLE address (
  address_id INT PRIMARY KEY AUTO_INCREMENT,
  street_no VARCHAR(100),
  city VARCHAR(50),
  state VARCHAR(50)
);

-- Table: user
CREATE TABLE user (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  address_id INT NOT NULL,
  phone_no VARCHAR(20) UNIQUE,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NUll,
  dof DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (address_id) REFERENCES address(address_id)
);

-- profile (Admin, pharmacist, Patient)
-- Table: admin_profile
CREATE TABLE admin_profile (
  admin_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- Table: pharmacist_profile
CREATE TABLE pharmacist_profile (
  pharmacist_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNIQUE NOT NULL,
  license_no VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- Table: customer_profile
CREATE TABLE customer_profile (
  customer_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- Table: drug
CREATE TABLE drug (
  drug_id INT PRIMARY KEY AUTO_INCREMENT,
  drug_name VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

-- Table: inventory
CREATE TABLE inventory (
  inventory_id INT PRIMARY KEY AUTO_INCREMENT,
  drug_id INT NOT NULL,
  quantity INT NOT NULL,
  expiry_date DATE NOT NULL,
  FOREIGN KEY (drug_id) REFERENCES drug(drug_id)
);

-- Table: prescription
CREATE TABLE prescription (
  prescription_id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  prescribing_doctor VARCHAR(100) NOT NULL,
  doctor_license VARCHAR(50),
  issue_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES cutomer_profile(customer_id)
);

-- Table: prescription_drug
CREATE TABLE prescription_drug (
  prescription_drug_id INT PRIMARY KEY AUTO_INCREMENT,
  prescription_id INT NOT NULL,
  drug_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (prescription_id) REFERENCES Prescription(prescription_id) ON DELETE CASCADE,
  FOREIGN KEY (drug_id) REFERENCES Drug(drug_id)
);

-- Table: order
CREATE TABLE `order` (
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(10, 2) NOT NULL,
  order_status ENUM(
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
  ) DEFAULT 'pending',
  pharmacist_id INT,
  FOREIGN KEY (customer_id) REFERENCES Customer_Profile(customer_id),
  FOREIGN KEY (pharmacist_id) REFERENCES pharmacist_profile(pharmacist_id)
);

-- Table: order_item
CREATE TABLE order_item (
  order_item_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  drug_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  inventory_id INT,
  prescription_drug_id INT,
  FOREIGN KEY (order_id) REFERENCES `order`(order_id),
  FOREIGN KEY (drug_id) REFERENCES drug(drug_id),
  FOREIGN KEY (inventory_id) REFERENCES inventory(inventory_id),
  FOREIGN KEY (prescription_drug_id) REFERENCES prescription_drug(prescription_drug_id)
);