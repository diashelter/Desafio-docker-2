const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'node'
});

app.listen(port, async () => {
    console.log(`listening on port ${port}!`);
    await createTablePeople(connection);
    await insertPeople(connection);
});

app.get('/', async (req, res) => {
    connection.query(`SELECT * FROM people`, (error, results) => {
        if (error) {
            return console.log(error);
        }
        let string = '';
        results.map((person) => {
            string += `<h2>${person.id} - ${person.name}</h2>`;
        });
        res.send('<h1>Full Cycle Rocks!</h1><br>' + string); 
    });
});

async function createTablePeople(connection) {
    await connection.query(`CREATE TABLE IF NOT EXISTS people(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255));`, (error) => {
        if (error) {
            return console.log(error);
        }
        console.log('Table created!');
    });
}

async function insertPeople(connection) {
    if (!connection) {
        return;
    }
    await connection.query(`INSERT INTO people (name) VALUES ('John')`, (error) => {
        if (error) {
            return console.log(error);
        }
        console.log('Inserted!');
    });
}