const express = require("express")
const app = express()
app.use(express.json())
const PORT = process.env.PORT

let messages = [{id:0,text:"tere"}]



app.post("/api/messages", (req, res) =>{
    let msg = {}
    msg.text = req.body.text
    msg.id = messages.length
    messages.push(msg)
    res.status(201).json(msg)
})
app.get("/api/messages", (req, res) =>{
    res.json(messages)
})











app.listen(PORT, ()=>{
    console.log(`Example app listening on port ${PORT}!`)
})