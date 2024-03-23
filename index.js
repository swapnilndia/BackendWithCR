const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const todoRouter = require('./route/todo.route')
const userRouter = require('./route/user.route')
const studentRouter = require('./route/studentData.route')


const app = express()


app.use(bodyParser.json())
app.use(cors())


const PORT = (process.env.PORT)

app.use('/todo', todoRouter)
app.use('/user', userRouter)
app.use('/studentdata',studentRouter)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});