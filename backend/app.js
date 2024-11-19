const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const mysql = require('mysql2');
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const indexPage = fs.readFileSync('./index.ejs', 'utf8');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'asm17',
    database: 'db_dinner'
  });
  connection.connect((error) => {
	if (error) throw error;
  console.log('Successfully connected to MySQL! ');
});

app.get('/menu', (req, res) => {
    const selectQuery = `SELECT * FROM db_dinner`;
    connection.query(selectQuery, (error, result) => {
      if (error) throw error;
      res.json(result);
    });
});

app.put('/menu/:id', (req, res) => {
    const requestId = Number(req.params.id);
  const { menu, recipeurl} = req.body;
  const updateQuery = `
    UPDATE menu
    SET    menu='${menu}',
           recipeurl='${recipeurl}'
    WHERE  id=${requestId}
  `;
  connection.query(updateQuery, (error) => {
    if (error) throw error;
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});