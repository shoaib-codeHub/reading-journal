# 📚 Reading Journal

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.2.1-lightgrey.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-pg--8.18.0-blue.svg)](https://www.postgresql.org/)
[![EJS](https://img.shields.io/badge/EJS-Templating-yellow.svg)](https://ejs.co/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Reading Journal is a full-stack web application designed for avid readers and students to track the books they read. It allows users to log books, rate them, write detailed reviews, and keep track of specific notes by page number. 

The app seamlessly integrates with the **Open Library API** to automatically fetch book information and cover images, keeping your journal visually appealing and organized.

---

## ✨ Features

- **➕ Smart Book Addition:** Add books manually or let the app fetch details and covers using the Open Library API.
- **⭐ Ratings & Reviews:** Leave a 1-5 star rating and a detailed review for each book. Update them anytime.
- **📝 Detailed Notes:** Save multiple notes per book, linked directly to specific page numbers for easy referencing.
- **🖼️ Automatic Covers:** Fetches high-quality book covers automatically (falls back to a default cover if unavailable).
- **🔎 Organized Dashboard:** View your entire reading history on the home page, sorted by the date you read them.
- **🧠 Persistent Storage:** All data is securely stored in a relational PostgreSQL database.
- **🎨 Responsive UI:** Clean, modern, and mobile-friendly interface built with custom CSS and EJS templating.

---

## 🏗 Tech Stack

**Frontend**
- HTML5 & CSS3
- EJS (Embedded JavaScript Templating)

**Backend**
- Node.js
- Express.js
- Axios (for API requests)

**Database**
- PostgreSQL
- `pg` (Node-Postgres client)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/en/download/) (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/download/)

### 1. Clone the repository

```bash
git clone https://github.com/shoaib-codeHub/reading-journal.git
cd reading-journal
```
2. Install dependencies
```bash
npm install
```
3. Setup Environment Variables
Create a .env file in the root directory and add your database credentials and API URL:

# Server Configuration
PORT=3000
API_URL=[https://openlibrary.org/search.json](https://openlibrary.org/search.json)

# Database Configuration
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=reading_journal
DB_PASSWORD=your_postgres_password
DB_PORT=5432
---
4. Database Setup
Open your PostgreSQL command line (psql) or a GUI like pgAdmin, and run the following SQL commands to set up the necessary tables:
---
-- Create the database
---
```
CREATE DATABASE reading_journal;

-- Connect to the database
\c reading_journal;

-- Create Books table
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    isbn VARCHAR(20),
    cover_url TEXT,
    date_read DATE
);

-- Create Ratings table
CREATE TABLE ratings (
    book_id INTEGER PRIMARY KEY REFERENCES books(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT
);

-- Create Notes table
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    note_text TEXT NOT NULL,
    page_number INTEGER
);
```
---
5. Run the server
You can start the server in production mode or development mode (using nodemon).

For standard startup:
```bash
npm start
```

For development (auto-restarts on save):
```bash
npm run dev
```
Open your browser and navigate to: http://localhost:3000

📁 Folder structure
```
reading-journal/
│
├── config/
│   └── db.js                 # PostgreSQL connection setup
│
├── public/                   # Static assets
│   ├── images/
│   │   └── defaultBook.jpg   # Fallback book cover
│   └── style.css             # Global responsive CSS styles
│
├── views/                    # EJS Templates
│   ├── partials/
│   │   ├── header.ejs        # Global navigation header
│   │   └── footer.ejs        # Global footer
│   │
│   ├── addbook.ejs           # Form to add a new book
│   ├── addnotes.ejs          # Form to add a note
│   ├── addrating.ejs         # Form to add a rating/review
│   ├── book.ejs              # Individual book details page
│   ├── index.ejs             # Homepage / Book grid
│   ├── updatingnotes.ejs     # Form to edit an existing note
│   └── updatingrating.ejs    # Form to edit an existing rating
│
├── .env                      # Environment variables (ignored by git)
├── .gitignore
├── package.json
└── server.js                 # Main Express application & routes
```
🔄 Core Learning Concepts Demonstrated
```
RESTful Routing: Standardized HTTP methods (GET, POST) for resource management.

MVC Architecture Pattern: Separation of concerns using routing logic, database configurations, and EJS views.

Relational Database Design: Implementing LEFT JOIN queries and handling One-to-One (Ratings) vs One-to-Many (Notes) relationships.

API Integration: Using Axios to dynamically fetch external JSON data from the Open Library API.

Dynamic Templating: Server-side rendering with EJS for passing backend data to the frontend.
```

🔮 Future Improvements
```
[ ] Authentication: Add user login/signup to support multiple users.

[ ] Reading Analytics: A dashboard showing books read per month, favorite authors, etc.

[ ] Tagging System: Add tags/categories to books (e.g., Fiction, Tech, History).

[ ] Pagination: Add page numbers to the home page for users with large libraries.

[ ] Dark Mode Toggle: User-selectable light and dark themes.
```
---

## ✨ Author

-Made with 💖 by Shoaib - GitHub: @shoaib-codehub

## ✨ Licence 

-This project is open-source and available under the MIT License for learning and development purposes.


---



