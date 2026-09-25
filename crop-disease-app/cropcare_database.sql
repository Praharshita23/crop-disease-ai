CREATE DATABASE cropcare;
USE cropcare;

CREATE TABLE analyses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    crop VARCHAR(100),
    disease VARCHAR(255),
    confidence FLOAT,
    location VARCHAR(100),
    temperature FLOAT,
    humidity FLOAT,
    rainfall FLOAT,
    risk_level VARCHAR(50),
    disease_type VARCHAR(100),
    treatment TEXT,
    prevention TEXT,
    image_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
USE cropcare;

SHOW TABLES;
DESCRIBE analyses;