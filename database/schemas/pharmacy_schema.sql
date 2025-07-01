SHOW DATABASES;

-- Database: pharmacy_management_system
CREATE DATABASE pharmacy_app;

USE pharmacy_app;

SHOW TABLES;

-- DESCRIBE <table_name>;    show datatype of a table
DESCRIBE user;

-- Table: address
CREATE TABLE address (
	address_id INT PRIMARY KEY AUTO_INCREMENT,
    street_address VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(50)
);

INSERT INTO address
    (street_address, city, state)
VALUES
    ('742 Evergreen Terrace', 'Springfield', 'Illinois'),
    ('221B Baker Street', 'London', 'Greater London'),
    ('10 Sheikh Zayed Road', 'Dubai', 'Dubai');

-- ALTER TABLE <tbl_name>
-- 							MODIFY <col_name>
-- 							MODIFY <col_name>
ALTER TABLE address
                    MODIFY city VARCHAR(50) NOT NULL,
                    MODIFY state VARCHAR(50) NOT NULL;

DESCRIBE address;

-- Table: user
CREATE TABLE user (
	user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    address_id INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_type ENUM('admin', 'pharmacist', 'customer') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
								ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (address_id) REFERENCES address(address_id) ON DELETE CASCADE
);

INSERT INTO user
    (username, email, address_id, password, role_type)
VALUES
    ('admin_usa', 'admin.usa@example.com', 1, 'p@sswOrd@123', 'admin'),
    ('pharma_eu', 'pharma.eu@example.com', 2, 'PassWorD@123', 'pharmacist'),
    ('customer_gulf', 'customer.gulf@example.com', 3, 'password@456', 'customer');

ALTER TABLE user
        MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE user
        MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;


ALTER TABLE user
        MODIFY COLUMN role_type ENUM('admin', 'pharmacist', 'customer') NOT NULL DEFAULT 'customer';

DESCRIBE user;

-- profile (Admin, pharmacist, Patient)

-- Table: admin_profile
CREATE TABLE admin (
	admin_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- RENAME COLOUM a to b
ALTER TABLE admin
				RENAME COLUMN phone_no to phone;

DESCRIBE admin;

-- Table: pharmacist_profile
CREATE TABLE pharmacist (
	pharmacist_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

SHOW TABLES;
DESCRIBE pharmacist;

-- Table: customer_profile/patient_profile
CREATE TABLE customer (
	customer_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    birth_date DATE NOT NULL,
    gender ENUM('Male', 'Female'),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

DESCRIBE customer;
SHOW TABLES;

-- Table: medication/drug
CREATE TABLE medication (
	medication_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    quantity_in_stock INT NOT NULL DEFAULT 0,
    requires_prescription BOOLEAN DEFAULT FALSE,
    category VARCHAR(50),
    unit_price DECIMAL(10, 2) NOT NULL,
    expiry_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE medication;
SHOW TABLES;

-- Table: prescription
CREATE TABLE prescription (
	prescription_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL UNIQUE,
    pharmacist_id INT NOT NULL UNIQUE, -- To review the prescription
    prescribing_doctor VARCHAR(100) NOT NULL,
    doctor_license VARCHAR(50) UNIQUE,
    issue_date DATE NOT NULL, -- DATE is issue when the doctor write this prescription
    expiry_date DATE NOT NULL,
    status ENUM('uploaded', 'processing', 'filled', 'rejected') DEFAULT 'uploaded',
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- LIKE created_at NOT updated_at
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (pharmacist_id) REFERENCES pharmacist(pharmacist_id)
);

DESCRIBE prescription;

-- Table: prescription_drug
CREATE TABLE prescription_medication (
	pres_med_id INT PRIMARY KEY AUTO_INCREMENT,
    prescription_id INT NOT NULL,
    medication_id INT NOT NULL,
    dosage VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (prescription_id) REFERENCES prescription(prescription_id),
    FOREIGN KEY (medication_id) REFERENCES medication(medication_id)
);

DESCRIBE prescription_medication;

-- Table: order
CREATE TABLE  `order` (
	order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    prescription_id INT NULL,  -- NULL for OTC orders - Over-The-Counter(OTC) - remains NULL
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL,
    order_status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    pharmacist_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
								ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (pharmacist_id) REFERENCES pharmacist(pharmacist_id),
    FOREIGN KEY (prescription_id) REFERENCES prescription(prescription_id)
);

DROP TABLE `order`;
DESCRIBE `order`;

-- How to link order_item with inventory (medication) and its contents in "Pharmacy app"
-- Table: order_item
CREATE TABLE order_item (
	order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    medication_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    pres_med_id INT,
    FOREIGN KEY (order_id) REFERENCES `order`(order_id),
    FOREIGN KEY (medication_id) REFERENCES medication(medication_id),
    FOREIGN KEY (pres_med_id) REFERENCES prescription_medication(pres_med_id)
);

DROP TABLE order_item;
DESCRIBE order_item;
SHOW TABLES;