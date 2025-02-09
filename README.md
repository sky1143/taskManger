# Task Management Application

This is a **Task Management Application** built using **Next.js** with **Server Actions** and **MongoDB**. It allows users to **Create, Read, Update, and Delete (CRUD)** tasks efficiently while maintaining a **clean UI with TailwindCSS**.

## 🚀 Tech Stack
- **Frontend:** Next.js (Latest version)
- **Backend:** Next.js Server Actions
- **Database:** MongoDB (via Mongoose)
- **UI:** TailwindCSS
- **Deployment:** Vercel

## 📌 Features
- ✅ Create, Read, Update, and Delete tasks
- ✅ Mark tasks as completed
- ✅ Store tasks in MongoDB using Mongoose
- ✅ Clean UI using TailwindCSS
- ✅ Fully responsive and optimized for performance
- ✅ Instant UI updates after task actions (no page reload required)

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone your_repo_link
cd task-manager
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env.local` file in the root directory and add your MongoDB connection string:
```
MONGODB_URI='mongodb string'
```

### 4️⃣ Run the Development Server
```sh
npm run dev
```
Now open [http://localhost:3000](http://localhost:3000) to see the app in action.

## 🛠️ Deployment on Vercel
1. Install Vercel CLI
```sh
npm install -g vercel
vercel login
```
2. Deploy the project
```sh
vercel
```
3. Set environment variables in Vercel Dashboard:
   - `MONGODB_URI`: Your MongoDB connection string

4. Vercel will provide a live URL to access your application.

## 📜 Folder Structure
```
📂 task-manager
 ┣ 📂 app
 ┃ ┗ 📂 api
 ┃    ┣ 📂 tasks
 ┃    ┃  ┗ 📜 route.js       # Handles GET (fetch all) & POST (create)
 ┃    ┗ 📂 tasks/[id]
 ┃       ┗ 📜 route.js       # Handles PATCH (update) & DELETE (remove)
 ┃ ┗ 📜 page.js       # Main UI
 ┣ 📂 components
 ┃ ┣ 📜 TaskForm.js   # Task input form
 ┃ ┗ 📜 TaskList.js   # Task listing & actions
 ┣ 📂 lib
 ┃ ┗ 📜 mongodb.js    # Database connection
 ┣ 📂 models
 ┃ ┗ 📜 task.js       # Task schema
 ┣ 📂 public
 ┃ ┗ 📜 favicon.ico   # App icon
 ┣ 📂 server.js       # Node.js server file
 ┣ 📂 vercel.json     # Vercel configuration file
 ┣ 📜 .env.local      # MongoDB connection string
 ┣ 📜 next.config.mjs # Next.js configuration
 ┣ 📜 tailwind.config.js # TailwindCSS config
 ┣ 📜 package.json
 ┗ 📜 README.md       # Documentation
```

## 🔧 Server Configuration

### 📌 `server.js`
```javascript
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Node.js App is running on Vercel!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
```

### 📌 `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

## 🔧 API Endpoints

### 📌 Create a Task
**Endpoint:** `POST /api/tasks`
```json
{
  "title": "Shopping",
  "description": "Buy groceries",
  "dueDate": "2025-12-30T00:00:00.000Z",
  "completed": false
}
```

### 📌 Fetch All Tasks
**Endpoint:** `GET /api/tasks`
```json
[
  {
    "id": "67a83ae2af12f8539b24c4b4",
    "title": "Shopping",
    "description": "Buy groceries",
    "dueDate": "2025-12-30T00:00:00.000Z",
    "completed": false
  }
]
```

### 📌 Update a Task
**Endpoint:** `PATCH /api/tasks/{id}`
```json
{
  "completed": true
}
```

### 📌 Delete a Task
**Endpoint:** `DELETE /api/tasks/{id}`
```json
{
  "message": "Task deleted successfully"
}
```

## 🚀 Future Enhancements
- [ ] Improve error handling (`try-catch` in Server Actions)
- [ ] Add authentication using NextAuth.js
- [ ] Implement task filtering (e.g., show only completed tasks)
- [ ] Add due date sorting feature
- [ ] Improve deployment efficiency with optimized caching
- [ ] Implement a dark mode toggle for UI
- [ ] Add unit tests for API endpoints

---

💡 **Contributions & Feedback**: Feel free to submit pull requests or raise issues! 🎉

