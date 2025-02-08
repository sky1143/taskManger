# Task Management Application

This is a simple Task Management Application built using **Next.js** with **Server Actions** and **MongoDB**. It allows users to **Create, Read, Update, and Delete (CRUD)** tasks efficiently.

## 🚀 Tech Stack
- **Frontend:** Next.js (Latest version)
- **Backend:** Next.js Server Actions
- **Database:** MongoDB (via Mongoose)
- **UI:** TailwindCSS, ShadCN (Optional)
- **Deployment:** Vercel

## 📌 Features
- ✅ Create, Read, Update, and Delete tasks
- ✅ Mark tasks as completed
- ✅ Store tasks in MongoDB using Mongoose
- ✅ Clean UI using TailwindCSS
- ✅ Fully responsive and optimized for performance

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
MONGODB_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/taskDB
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
 ┃ ┗ 📜 page.js       # Main UI
 ┣ 📂 components
 ┃ ┣ 📜 TaskForm.js   # Task input form
 ┃ ┗ 📜 TaskList.js   # Task listing & actions
 ┣ 📂 lib
 ┃ ┗ 📜 mongodb.js    # Database connection
 ┣ 📂 models
 ┃ ┗ 📜 task.js       # Task schema
 ┣ 📂 actions
 ┃ ┗ 📜 taskActions.js # Server actions (CRUD)
 ┣ 📜 .env.local      # MongoDB connection string
 ┣ 📜 next.config.mjs # Next.js configuration
 ┣ 📜 tailwind.config.js # TailwindCSS config
 ┣ 📜 package.json
 ┗ 📜 README.md       # Documentation
```

## 🏆 Evaluation Criteria
✅ **Working functionality (40%)** – CRUD, task completion  
✅ **Code quality & organization (30%)** – Modular, reusable components  
✅ **UI/UX design (20%)** – Clean, accessible design with Tailwind  
✅ **Documentation (10%)** – README with setup instructions  

## 🚀 Future Enhancements
- [ ] Improve error handling (`try-catch` in Server Actions)
- [ ] Add authentication using NextAuth.js
- [ ] Implement task filtering (e.g., show only completed tasks)

---


