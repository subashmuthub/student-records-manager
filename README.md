# Student Records Manager

A simple full-stack CRUD web application for managing student records using Node.js, Express, EJS, and MySQL.

## Features

- **List Students**: View all students in a table with sorting and filtering
- **Add Student**: Create new student records with validation
- **Edit Student**: Update existing student information
- **View Details**: Display full information about a specific student
- **Delete Student**: Remove student records from the database
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Backend**: Node.js with Express.js
- **Frontend**: EJS templating engine
- **Database**: MySQL
- **Styling**: Pure CSS (responsive design)

## Project Structure

```
student-records-manager/
├── app.js                 # Main server file
├── package.json          # Dependencies and scripts
├── .env.example          # Environment variables template
├── .env                  # Environment variables (not tracked)
├── schema.sql            # Database schema
├── routes/
│   └── students.js       # Student routes and database queries
├── views/
│   ├── index.ejs         # Student list page
│   ├── form.ejs          # Add/Edit student form
│   ├── detail.ejs        # Student details page
│   ├── error.ejs         # Error page
│   ├── 404.ejs           # 404 page
│   └── layout.ejs        # Base layout (optional)
└── public/
    └── style.css         # Application styles
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm (comes with Node.js)

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up MySQL Database

1. **Start MySQL Server**:
   - On Windows: Open MySQL Command Line or MySQL Workbench
   - On macOS: `mysql.server start`
   - On Linux: `sudo service mysql start`

2. **Create Database and Tables**:
   ```bash
   mysql -u root -p < schema.sql
   ```
   (Enter your MySQL root password when prompted)

3. **Verify the database**:
   ```bash
   mysql -u root -p
   mysql> USE student_records;
   mysql> SHOW TABLES;
   mysql> SELECT * FROM students;
   ```

### 3. Configure Environment Variables

1. **Copy the example file**:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file** with your database credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=student_records
   DB_PORT=3306
   PORT=3000
   ```

### 4. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

### 5. Access the Application

- Open your browser and go to: **http://localhost:3000**
- The app will redirect to the student list page

## Available Scripts

```bash
# Start the server
npm start

# Start with nodemon (auto-restart on file changes) - requires nodemon to be installed
npm run dev
```

## API Routes

### Student Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/students` | Get all students |
| GET | `/students/add` | Show add student form |
| GET | `/students/:id` | Get student details |
| GET | `/students/:id/edit` | Show edit student form |
| POST | `/students` | Create new student |
| POST | `/students/:id` | Update student |
| GET | `/students/:id/delete` | Delete student |

## Database Schema

### Students Table

```sql
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  course VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Features Explained

### 1. Student List Page (`/students`)
- Displays all students in a table
- Shows: Name, Age, Course, Email
- Action buttons: View, Edit, Delete
- "Add New Student" button at the top
- Empty state message if no students exist

### 2. Add/Edit Form (`/students/add` and `/students/:id/edit`)
- Reusable form for both adding and editing
- Validation on all fields (required)
- Email uniqueness validation
- Error messages for duplicate emails
- Cancel button to go back

### 3. Student Details Page (`/students/:id`)
- Read-only view of student information
- Shows all fields including ID and timestamps
- Edit, Delete, and Back buttons
- Confirmation dialog before deletion

## Error Handling

- **404 Page**: Shows when a route doesn't exist
- **Error Page**: Shows when something goes wrong in the database
- **Form Validation**: Client and server-side validation
- **Database Constraints**: Email uniqueness enforced

## Security Considerations

- **SQL Injection Prevention**: Using parameterized queries with mysql2
- **Input Validation**: All inputs are validated on the server side
- **Environment Variables**: Sensitive data stored in `.env` file (excluded from git)

## Troubleshooting

### Issue: "Connection refused" error
- **Solution**: Make sure MySQL Server is running
  ```bash
  mysql.server start  # macOS
  net start MySQL80   # Windows (or your version)
  sudo service mysql start  # Linux
  ```

### Issue: "Access denied for user 'root'"
- **Solution**: Check your password in `.env` file
- Reset MySQL password:
  ```bash
  mysql -u root --skip-password
  ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
  FLUSH PRIVILEGES;
  ```

### Issue: "Database student_records doesn't exist"
- **Solution**: Run the schema.sql file:
  ```bash
  mysql -u root -p < schema.sql
  ```

### Issue: "Port 3000 is already in use"
- **Solution**: Change the PORT in `.env` file to another port (e.g., 3001)

## Development Tips

### Install Nodemon for Development
```bash
npm install --save-dev nodemon
npm run dev
```

### View MySQL Data in Terminal
```bash
mysql -u root -p student_records
SELECT * FROM students;
```

### Test the Application
1. Add a new student
2. View the student details
3. Edit the student information
4. Delete the student
5. Verify the changes in MySQL

## Future Enhancements

- Add authentication and user login
- Add pagination to student list
- Add search and filter functionality
- Add export to CSV/PDF
- Add student profile pictures
- Add class/batch management
- Add grades and performance tracking

## License

ISC

## Support

For issues or questions, please check the error messages in the browser and terminal console for debugging information.
