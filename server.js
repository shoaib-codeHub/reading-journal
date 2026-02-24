import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import db from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const API = process.env.API_URL;

// View engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/* =========================
   HOME PAGE → SHOW BOOKS
========================= */
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY date_read DESC");

    res.render("index", {
      books: result.rows
    });
  } catch (err) {
    console.log(err);
    res.send("Error loading books");
  }
});

/* =========================
   SHOW ADD BOOK FORM
========================= */
app.get("/books/new", (req, res) => {
  res.render("addbook.ejs");
});

/* =========================
   CREATE BOOK
========================= */
app.post("/books", async (req, res) => {
  const { title, author, isbn, date_read } = req.body;

  try {
    let bookTitle = title;
    let authorName = author;
    let finalIsbn = isbn || null;
    let coverUrl = null;

    /* ⭐ Try API (but don’t depend on it) */
    const bookResponse = await axios.get(API, {
      params: { title, author }
    });

    const book = bookResponse.data.docs[0];

    if (book) {
      bookTitle = book.title || title;
      authorName = book.author_name ? book.author_name[0] : author;
      finalIsbn = book.isbn ? book.isbn[0] : isbn || null;

      const coverI = book.cover_i;

      if (finalIsbn) {
        coverUrl = `https://covers.openlibrary.org/b/isbn/${finalIsbn}-L.jpg`;
      } else if (coverI) {
        coverUrl = `https://covers.openlibrary.org/b/id/${coverI}-L.jpg`;
      }
    } else {
      console.log("No API result — inserting manual book");
    }

    const result = await db.query(
      `INSERT INTO books(title,author,isbn,cover_url,date_read)
       VALUES ($1,$2,$3,$4,$5)`,
      [bookTitle, authorName, finalIsbn, coverUrl, date_read || null]
    );

    console.log("Inserted rows:", result.rowCount);

    res.redirect("/");
  } catch (err) {
    console.log("CREATE BOOK ERROR:", err.message);
    res.redirect("/books/new");
  }
});

app.get("/book/:id/rating", (req, res) => {
  const bookId = req.params.id
  res.render("addrating.ejs", { bookId });
});
app.get("/books/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.query(
      `SELECT
         books.*,
         ratings.rating,
         ratings.review_text,
         notes.id AS note_id,
         notes.note_text,
         notes.page_number
       FROM books
       LEFT JOIN ratings ON ratings.book_id = books.id
       LEFT JOIN notes ON notes.book_id = books.id
       WHERE books.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.send("Book not found");
    }

    const rows = result.rows;

    const book = {
      id: rows[0].id,
      title: rows[0].title,
      author: rows[0].author,
      cover_url: rows[0].cover_url,
      rating: rows[0].rating,
      review_text: rows[0].review_text
    };

    const notes = rows
      .filter(r => r.note_id)
      .map(r => ({
        id: r.note_id,
        note_text: r.note_text,
        page_number: r.page_number
      }));

    res.render("book", { book, notes });

  } catch (err) {
    console.log(err);
    res.send("Error loading book");
  }
});

app.post("/ratings", async (req, res) => {
  const { book_id, rating, review_text } = req.body;

  try {
    await db.query(
      `INSERT INTO ratings(book_id, rating, review_text)
       VALUES ($1,$2,$3)`,
      [book_id, rating, review_text]
    );

    res.redirect(`/books/${book_id}`);
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.get("/book/:id/rating/update", async (req, res) => {
  const bookId = req.params.id;

  const result = await db.query(
    "SELECT * FROM ratings WHERE book_id=$1",
    [bookId]
  );

  res.render("updatingrating", {
    rating: result.rows[0],
    bookId
  });
});

app.post("/book/rating/update", async (req, res) => {
  const { book_id, rating, review_text } = req.body;

  const bookId = Number(book_id); // ⭐ convert text → number

  try {
    await db.query(
      `UPDATE ratings
       SET rating = $1,
           review_text = $2
       WHERE book_id = $3`,
      [rating, review_text, bookId]
    );

    res.redirect(`/books/${bookId}`);
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.get("/book/:id/note", (req, res) => {
  const bookId = req.params.id
  res.render("addnotes.ejs", { bookId });
});



app.post("/notes", async (req, res) => {
  const { book_id, note_text, page_number } = req.body;

  try {
    await db.query(
      `INSERT INTO notes(book_id, note_text, page_number)
       VALUES ($1,$2,$3)`,
      [book_id, note_text, page_number]
    );

    res.redirect(`/books/${book_id}`);
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.get("/book/:bookId/note/:noteId/edit", async (req, res) => {
  const { bookId, noteId } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM notes WHERE id=$1 AND book_id=$2",
      [noteId, bookId]
    );

    if (result.rows.length === 0) {
      return res.send("Note not found");
    }

    const note = result.rows[0];

    res.render("updatingnotes", {
      bookId,
      note
    });

  } catch (err) {
    console.log(err);
    res.send("Error loading note");
  }
});

app.get("/book/:bookId/note/:noteId/delete", async (req, res) => {
  const { bookId, noteId } = req.params;

  try {
    await db.query(
      "DELETE FROM notes WHERE id=$1 AND book_id=$2",
      [noteId, bookId]
    );

    res.redirect(`/books/${bookId}`);

  } catch (err) {
    console.log(err);
    res.send("Error deleting note");
  }
});

app.post("/book/note/update", async (req, res) => {
  const { note_id, book_id, note_text, page_number } = req.body;

  try {
    await db.query(
      "UPDATE notes SET note_text=$1, page_number=$2 WHERE id=$3",
      [note_text, page_number, note_id]
    );

    res.redirect(`/books/${book_id}`);

  } catch (err) {
    console.log(err);
    res.send("Error updating note");
  }
});


/* =========================
   SERVER START
========================= */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});