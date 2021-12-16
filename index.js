const express = require('express')
const path = require('path')

// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '56d4b471086f4f46962ef71679a582f6',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

let students = []

const app = express()

app.use(rollbar.errorHandler())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file serverd successfully')
})

app.post('/api/student', (req, res) => {
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('Student added succesfully', {author: "Samuelito", type: "manual"})
    res.status(200).send(students)
})

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`A cowboy rode into town on port ${port}`))