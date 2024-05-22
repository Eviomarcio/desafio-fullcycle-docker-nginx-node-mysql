
const express = require('express');
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
    insecureAuth: true
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);

const INSERT_NAME_SQL = `INSERT INTO people (first_name, last_name, age)
SELECT * FROM (SELECT 'EVIOMARCIO' AS first_name, 'JOAQUIM' AS last_name, 33 AS age
               UNION ALL
               SELECT 'PATRICIA', 'GOES', 33
               UNION ALL
               SELECT 'RENATA', 'LEAL', 36
               UNION ALL
               SELECT 'DIEGO', 'SANTANA', 21
               UNION ALL
               SELECT 'SANDOKAN', 'ALVES', 38) AS tmp
WHERE NOT EXISTS (
    SELECT 1 
    FROM people 
    WHERE people.first_name = tmp.first_name 
    AND people.last_name = tmp.last_name 
    AND people.age = tmp.age
);`;
const SELECT_NAMES_SQL = `SELECT * FROM people`;
const CREATE_TABLE_SQL = `CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(150), last_name VARCHAR(150), age INT, PRIMARY KEY (id))`;

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados::', err);
        process.exit(1);
    }
    console.log('Conectado ao banco de dados');

    connection.query(CREATE_TABLE_SQL, err => {
        if (err) {
            console.error('Erro ao criar tabela:', err);
            process.exit(1);
        }
        console.log('Tabela criada ou já existe');

        connection.query(INSERT_NAME_SQL, err => {
            if (err) {
                console.error('EErro ao inserir dados:', err);
                process.exit(1);
            }
            console.log('Dados inseridos');
        });
    });
});

app.get('/', (req, res) => {
    let listHTML = '<h1>Full Cycle</h1>';

    connection.query(SELECT_NAMES_SQL, (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao consultar banco de dados');
        }

        const interable = results ? results : [];
        for (const item of interable) {
            listHTML += `<h2> Id: ${item.id} - Nome: ${item.first_name} ${item.last_name}, Idade: ${item.age}</h2>`;
        }

        return res.send(listHTML);
    });
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});

