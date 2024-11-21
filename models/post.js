const db = require('../database/db');

class Post {
    static create({ title, content, category, tags }, callback) {
        const timestamp = new Date().toISOString();
        const sql = `INSERT INTO posts (title, content, category, tags, createdAt, updatedAt)
                 VALUES (?, ?, ?, ?, ?, ?)`;
        db.run(sql, [title, content, category, JSON.stringify(tags), timestamp, timestamp], function (err) {
            callback(err, { id: this.lastID, title, content, category, tags, createdAt: timestamp, updatedAt: timestamp });
        });
    }

    static update(id, { title, content, category, tags }, callback) {
        const timestamp = new Date().toISOString();
        const sql = `UPDATE posts SET title = ?, content = ?, category = ?, tags = ?, updatedAt = ? WHERE id = ?`;
        db.run(sql, [title, content, category, JSON.stringify(tags), timestamp, id], function (err) {
            callback(err, this.changes > 0 ? { id, title, content, category, tags, updatedAt: timestamp } : null);
        });
    }

    static delete(id, callback) {
        db.run(`DELETE FROM posts WHERE id = ?`, [id], function (err) {
            callback(err, this.changes > 0);
        });
    }

    static findById(id, callback) {
        db.get(`SELECT * FROM posts WHERE id = ?`, [id], (err, row) => callback(err, row));
    }

    static findAll(callback) {
        db.all(`SELECT * FROM posts`, [], (err, rows) => callback(err, rows));
    }

    static search(term, callback) {
        const sql = `SELECT * FROM posts WHERE title LIKE ? OR content LIKE ? OR category LIKE ?`;
        const wildcardTerm = `%${term}%`;
        db.all(sql, [wildcardTerm, wildcardTerm, wildcardTerm], (err, rows) => callback(err, rows));
    }
}

module.exports = Post;
