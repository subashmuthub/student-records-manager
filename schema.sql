-- Create the database
CREATE DATABASE IF NOT EXISTS student_records;

-- Use the database
USE student_records;

-- Create the students table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  course VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert some sample data (optional)
INSERT INTO students (name, age, course, email) VALUES
('John Doe', 20, 'Computer Science', 'john@example.com'),
('Jane Smith', 21, 'Business Administration', 'jane@example.com'),
('Mike Johnson', 19, 'Engineering', 'mike@example.com');
