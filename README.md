# 📝 Task Management App (MERN Stack)

A full-stack task manager application built using the **MERN** (MongoDB, Express.js, React, Node.js) stack. This app lets users register, log in, and manage their tasks — including creating, editing, marking as important/complete, and filtering.

---

## 🚀 Features

- ✅ User Registration and Login (JWT Auth)
- ✅ Create / Update / Delete Tasks
- ✅ Toggle Important / Complete Status
- ✅ Filter Tasks: All / Important / Completed / Incomplete
- ✅ Responsive UI with Tailwind CSS
- ✅ MongoDB Database with Mongoose

---

## 📁 Project Structure

task-manager/
├── client/ # React Frontend
├── server/ # Express + MongoDB Backend
├── README.md
└── .gitignore


---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, JWT, Mongoose
- **Database**: MongoDB

---

## ⚙️ Setup Instructions

### 📌 Prerequisites

- Node.js & npm
- MongoDB (Local or Atlas)
- Git

---

### 📦 Backend Setup

```bash
cd server
npm install
Create a .env file inside the server directory with the following variables:


PORT=5001
MONGO_URL=
JWT_SECRET=your_secret_key
Run the backend server:


npm run dev
💻 Frontend Setup



cd client
npm install
npm run dev
Make sure Axios requests match your backend base URL.

🔐 API Endpoints
All routes require a valid JWT token in the Authorization header as:
Authorization: Bearer <token>

✅ Auth
POST /api/v2/register → Register a new user

POST /api/v2/login → Log in and receive JWT token

📌 Tasks (Protected)
POST /api/v2/createTask → Create new task

GET /api/v2/getallTask → Get all tasks

PUT /api/v2/updateTask/:id → Update task

DELETE /api/v2/deleteTask/:id → Delete task

PUT /api/v2/updateImpTask/:id → Toggle important

PUT /api/v2/updateCompleteTask/:id → Toggle complete

GET /api/v2/getImpTask → Get only important tasks

GET /api/v2/getCompleteTask → Get completed tasks

GET /api/v2/getInCompleteTask → Get incomplete tasks

📸 Screenshots
(Add screenshots of your UI here if available)

🔒 Environment Variables
📄 .env.example



PORT=5001
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key


📄 .gitignore
gitignore
Copy
Edit
node_modules/
.env
dist/
build/
.DS_Store
🙌 Contribution
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

📜 License
This project is licensed under the MIT License.



Let me know if you want this saved to a downloadable file or want to include **screenshots or badges** (like GitHub stars, forks, etc.).








