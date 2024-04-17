const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
require('dotenv').config()


const todoRouter = require('./route/todo.route')
const userRouter = require('./route/user.route')
const expenseRouter = require('./route/expense.route')
const studentRouter = require('./route/studentData.route')

const app = express()

app.use(bodyParser.json())
app.use(cors({
    origin: '*',
}));

const PORT = process.env.PORT || 3000 // Setting a default port if PORT environment variable is not set

app.use('/todo', todoRouter)
app.use('/user', userRouter)
app.use('/expense', expenseRouter)
app.use('/studentdata', studentRouter)

app.get('/', async (req, res) => {
    res.send('<h1>Hi Guys,</h1>')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
