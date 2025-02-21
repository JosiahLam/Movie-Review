# 🎬 Movie Review App - Full Stack Web Application

## 🚀 Project Overview
This is my MSE245 (Databases and Software Design) course project. This is the final implementation of a **React / Node.js / MySQL** application for browsing, searching, and reviewing movies. The app allows users to explore movies, submit reviews, and interact with a personalized page featuring additional functionalities. This is my first ever Full-Stack Application, there more new and innovative implementation I want to add into this project. 

## 📅 Project Duration
May - August 2024

## 📂 Project Structure
```
📦 movie-review-app
├── 📂 client (React Frontend)
│   ├── 📂 src/components
│   │   ├── 📂 Landing
│   │   ├── 📂 Search
│   │   ├── 📂 Review
│   │   ├── 📂 MyPage
│   │   ├── 📜 App.js (Main App Component)
│   │   ├── 📜 index.js
├── 📂 server (Node.js Backend)
│   ├── 📜 server.js
│   ├── 📜 database.js
└── 📜 README.md
```

## 🌟 Features
### 🔹 Navigation
- **MUI Appbar** with buttons for easy navigation between pages
- **Client-side Routing** using React Router

### 🔹 Pages & Functionalities
| Component | Path | Description |
|-----------|------|-------------|
| Landing | `/` | Homepage with an introduction to the app |
| Search | `/Search` | Search for movies by title, actor, or director |
| Review | `/Review` | Submit and read reviews for movies |
| MyPage | `/MyPage` | Personalized page with extra movie-related features |

### 🔹 Search Page
- **Three Search Fields:** Movie Title, Actor, and Director
- **Search Button:** Retrieves matching movies from MySQL database
- **Displays Results:** Movie Title, Director(s), Average Rating, and User Reviews

### 🔹 Review Page
- **Fetch movies from MySQL** and display them
- **Submit user reviews** that get stored in the database

### 🔹 MyPage
- Custom functionality (e.g., movie recommendations, movie trailers, personal preferences)
- Reads/writes data to the MySQL database

## 🛠 Tech Stack
- **Frontend:** React, React Router, Material UI
- **Backend:** Node.js, Express
- **Database:** MySQL

## 🏗 Development Workflow
### 🌱 Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/movie-review-app.git
   ```
2. Install dependencies:
   ```sh
   cd client && npm install
   cd ../server && npm install
   ```

### 🏃 Run the Application
1. Start the backend server:
   ```sh
   cd server
   node server.js
   ```
2. Start the frontend client:
   ```sh
   cd client
   npm start
   ```

### 🔄 Git Workflow
- Create a new branch for development:
  ```sh
  git checkout -b your-branch-name
  ```
- Commit and push changes:
  ```sh
  git add .
  git commit -m "Implemented feature XYZ"
  git push origin your-branch-name
  ```
- Create a pull request and merge into `main`.
---

There are more feature such as chatbot and login, register pages to be implemented soon... 
👨‍💻 Developed by **Josiah Lam** | 🚀 Happy coding!
