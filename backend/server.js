const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'game_catalog'
});

db.connect((err) => {
    if (err) {
        console.log('Database connection error:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

app.get('/games', (req, res) => {
    db.query('SELECT * FROM games', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.post('/games', (req, res) => {
    const {
  title,
  genre,
  platform,
  release_year,
  rating,
  image_url
} = req.body;

    const sql = `
    INSERT INTO games (
        title,
        genre,
        platform,
        release_year,
        rating,
        image_url
    )
    VALUES (?, ?, ?, ?, ?, ?)
`;

    db.query(
        sql,
        [title, genre, platform, release_year, rating, image_url],
        (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json({
                    message: 'Game added successfully'
                });
            }
        }
    );
});

app.put('/games/:id', (req, res) => {
    const { id } = req.params;
    const { title, genre, platform, release_year, rating, image_url } = req.body;

    const sql = `
        UPDATE games
        SET title=?, genre=?, platform=?, release_year=?, rating=?, image_url=?
        WHERE id=?
    `;

    db.query(
        sql,
        [title, genre, platform, release_year, rating, image_url, id],
        (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json({
                    message: 'Game updated successfully'
                });
            }
        }
    );
});

app.delete('/games/:id', (req, res) => {
    const { id } = req.params;

    db.query(
        'DELETE FROM games WHERE id=?',
        [id],
        (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json({
                    message: 'Game deleted successfully'
                });
            }
        }
    );
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});