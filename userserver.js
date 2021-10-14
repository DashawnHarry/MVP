const path = require('path')
const express = require('express')
const { config } = require('dotenv')
const { Pool } = require('pg')
var cors = require('cors')
const app = express()
config()

const port = process.env.PORT

app.use(express.json())
app.use(express.static(path.join(__dirname, '/src')))



const pool = new Pool({

    connectionString: process.env.DATABASE_URL

    ssl: {
        rejectUnauthorized: false
    }
})

app.post('/user', (req, res) => {
    let userInput = req.body
    const { name, usersearches, title } = userInput

    pool.query('INSERT INTO siteusers VALUES (default,$1,ARRAY[$2],$3) RETURNING *', [name, usersearches, title])

        .then(data => res.send(console.log(userInput)))
        .catch(err => res.status(500).send(console.log(req.body)))
})




//PET GET
app.get('/users', (req, res) => {
    pool.query('SELECT * FROM siteusers',)

        .then(data => res.send(data.rows
        ))
        .catch(err => res.status(500).send(console.log(err)))
})

app.get('/', (req, res) => {
    pool.query('SELECT * FROM siteusers',)

        .then(data => res.send(data.rows
        ))
        .catch(err => res.status(500).send(console.log(err)))
    res.sendFile(path.join(__dirname, 'src/index.html'));
})

// //PETS UPDATE
// app.patch('/pets/:id', (req, res) => {
//     let userInput = req.body
//     const { name, age, kind } = userInput

//     let valueChange
//     let properySet
//     let queryInsert
//     if (userInput.hasOwnProperty('name')) {
//         queryInsert = 'UPDATE pets SET name=$1 WHERE id=$2 RETURNING *'
//         properySet = name
//     } else if (userInput.hasOwnProperty('age')) {
//         queryInsert = 'UPDATE pets SET age=$1 WHERE id=$2 RETURNING *'
//         properySet = age
//     } else if (userInput.hasOwnProperty('kind')) {
//         queryInsert = 'UPDATE pets SET kind=$1 WHERE id=$2 RETURNING *'
//         properySet = kind
//     }


//     pool.query(`${queryInsert}`, [properySet, req.params.id,])

//         .then(data => res.send(data.rows))
//         .catch(err => {
//             console.log(err);

//             res.status(500).send("Error")
//         })
// }
// )

// //PETS DELETE
// app.delete('/pets/:id', (req, res) => {
//     pool.query('DELETE from pets WHERE id = $1 RETURNING *', [req.params.id])

//         .then(data => res.send(data.rows))
//         .catch(err => res.status(500).send("Error"))

// })



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

