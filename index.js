//import dependencies
const express = require('express')


//define variable
const app = express()
const port = 3000

//define response
app.get('/', (req, res) => {
    res.send('hello world')
})

//start server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})