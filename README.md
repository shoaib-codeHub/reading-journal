# 📚 Reading Journal

Reading Journal is a full-stack web application that allows students to track the books they read, add ratings, write notes, and view their reading history in an organized way. The app integrates the Open Library API to fetch book information and covers, and uses Node.js with Express for server-side logic, EJS for templating, and PostgreSQL for persistent relational data storage.

---

## ✨ Features

- ➕ Add books using Open Library API  
- ⭐ One rating per book (update anytime)  
- 📝 Multiple notes per book  
- 📖 Book details page with rating and notes  
- 🖼 Automatic book cover fetching  
- 🔎 Sort books by recency  
- 🧠 Persistent PostgreSQL database  
- 🎨 Responsive UI with EJS  

---

## 🏗 Tech Stack

**Frontend**
- HTML
- CSS
- EJS

**Backend**
- Node.js
- Express.js

**Database**
- PostgreSQL
- pg

**API**
- Open Library API

**Other**
- Axios
- dotenv

---

## 📁 Folder Structure

reading-journal/
│
├── config/
│   └── db.js                 # PostgreSQL connection
│
├── public/
│   ├── images/
│   │   └── defaultBook.jpg
│   └── style.css             # Global styles
│
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   │
│   ├── addbook.ejs
│   ├── addnotes.ejs
│   ├── addrating.ejs
│   ├── book.ejs
│   ├── index.ejs
│   ├── updatingnotes.ejs
│   └── updatingrating.ejs
│
├── .env                      # Environment variables
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js                 # Main Express server
---

## 🔌 Installation

### Clone repo
git clone https://github.com/yourusername/reading-journal.git

cd reading-journal

### Install dependencies
### Run server


---

## 🔄 Core Learning Concepts

- RESTful routing  
- MVC architecture  
- SQL JOIN queries  
- One-to-one vs one-to-many relationships  
- UPSERT pattern  
- API integration  
- Server-side rendering  
- CRUD operations  
- Error handling  

---

## 🚀 Future Improvements

- Authentication  
- Reading analytics dashboard  
- Tags / categories  
- Pagination  
- Dark mode  
- Average rating badges  
- Rich text notes  
- Deployment  

---

## 👨‍💻 Author

Made with 💖 by Shoaib

---

## 📜 License

Open source for learning purposes.

