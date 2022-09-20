const express = require('express')
const app = express()
const mysql = require('mysql')
const shortId = require('shortid');
const cors = require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'URLShortenerDB',
})

app.use(cors());
app.use(express.json());

app.get('/:code', (req, res) => {
    const sqlSelect = 'SELECT count, id, longUrl FROM url WHERE code = ?';
    db.query(sqlSelect, [req.params.code], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            const count = result[0].count + 1;
            const sqlUpdate = 'UPDATE url SET count = ? WHERE id = ?';
            db.query(sqlUpdate, [count, result[0].id], (err, result) => {
                if (err) {
                    console.log(err);
                }
            })
            return res.redirect(result[0].longUrl);
        }
    })
})

app.post('/get-most-popular', (req, res) => {
    const sqlReorder = 'SELECT shortUrl, count FROM url ORDER BY count DESC LIMIT 3;'
    db.query(sqlReorder, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });

})

app.post('/api/shortener', (req, res) => {
    const code = shortId.generate();
    const shortUrl = 'http://localhost:3001/' + code;
    const sqlInsert = `INSERT INTO url (code, longUrl, shortUrl, count) VALUES (?, ?, ?, 0);`;
    db.query(sqlInsert, [code, req.body.longUrl, shortUrl], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(shortUrl);
        }
    })
})

app.listen(3001, () => {
    console.log("Server is running!")
})