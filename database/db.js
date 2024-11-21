const sqlite3 = require('sqlite3').verbose();

// Initialize database
const db = new sqlite3.Database('./blogging_platform.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database');
    }
});

// Create the posts table
db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT,
      tags TEXT,
      createdAt TEXT,
      updatedAt TEXT
    )
  `);
});

module.exports = db;
