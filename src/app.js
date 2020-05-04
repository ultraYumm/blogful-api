require('dotenv').config()
const knex = require('knex')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const articlesRouter = require('./articles/articles-router')
const app = express()
const usersRouter = require('./users/users-router')
const commentsRouter = require('./comments/comments-router')

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

  const knexInstance = knex({
    client: 'pg',
   connection: process.env.DB_URL
  })  

console.log('knex and driver installed correctly')


app.use(morgan(morganOption))
app.use(cors())

app.use(helmet())


app.use('/api/articles', articlesRouter)
app.use('/api/users', usersRouter)
app.use('/api/comments', commentsRouter)


app.get("/", (req, res) =>{
  res.send ('Hello, world!')
})

app.get('/xss', (req, res) => {
  res.cookie('secretToken', '1234567890');
  res.sendFile(__dirname + '/xss-example.html');
});

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app