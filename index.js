const express = require('express')
const app = express()
const PORT = 8000

app.get('/', (req, res) =>{
    return res.send('Hello World')
})
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})
