const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Ошибка подключения к БД:', err.message);
    } else {
        console.log('Подключено к базе данных SQLite.');
        
        db.run(`CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT,
            amount REAL,
            category TEXT,
            date TEXT
        )`);
    }
});

app.get('/api/transactions', (req, res) => {
    db.all("SELECT * FROM transactions ORDER BY id DESC", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows); 
    });
});

app.post('/api/transactions', (req, res) => {
    const { type, amount, category, date } = req.body;
    
    const sql = `INSERT INTO transactions (type, amount, category, date) VALUES (?, ?, ?, ?)`;

    db.run(sql, [type, amount, category, date], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, type, amount, category, date });
    });
});
app.delete('/api/transactions/:id', (req, res) => {
    const id = req.params.id;
    
    db.run(`DELETE FROM transactions WHERE id = ?`, id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Успішно видалено", changes: this.changes });
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});