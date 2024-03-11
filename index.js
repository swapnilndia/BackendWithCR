const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const todoRouter = require('./route/todo.route')


require('dotenv').config()
const app = express()


app.use(bodyParser.json())
app.use(cors())


const PORT = (process.env.PORT)

app.use('/todo', todoRouter)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});