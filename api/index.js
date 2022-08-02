const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:postgres@127.0.0.1:5432/api')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', async (req, res) => {
  const data = await db.query(`
    SELECT * FROM books ;
  `)
  console.log(data)
  return res.json(data)
})
app.post('/', async (req, res) => {
  // return res.json(req.body)
  const data = await db.query(`
  INSERT INTO books(title, writer) VALUES ($1, $2) RETURNING id
  `, [req.body.title, req.body.writer])
  console.log(data)
  return res.json(data)
})

app.put('/:id', async (req, res) => {
  // return res.json(req.body)
  const data = await db.query(`
  UPDATE books SET title=$1, writer=$2 WHERE id=$3
  `, [req.body.title, req.body.writer, req.params.id])
  console.log(data)
  return res.json(data)
})
app.delete('/:id', async (req, res) => {
  // return res.json(req.body)
  const data = await db.query(`
  DELETE FROM books  WHERE id=$1
  `, [req.params.id])
  console.log(data)
  return res.json(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

