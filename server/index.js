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
    const sqlSelect = 'SELECT longUrl FROM url WHERE code = ?';
    db.query(sqlSelect, [req.params.code], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            return res.redirect(result[0].longUrl);
        }
    })
})

app.post('/api/shortener', (req, res) => {
    const code = shortId.generate();
    const shortUrl = 'http://localhost:3001/' + code;
    const sqlInsert = `INSERT INTO url (code, longUrl, shortUrl) VALUES ('${code}', '${req.body.longUrl}', '${shortUrl}');`;
    db.query(sqlInsert, (err, result) => {
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