import {Database} from './database.js'
import express from 'express'
const PORT = 5000
const app = express()
app.use(express.json())

let db = new Database()

//let data = [{id:0,text:"tere"}]

app.get('/api/parking', (req,res)=>{
    let data = {}//db.getParkingData()
    res.json(data)

})
app.put('/api/parking/addrow',(req,res)=>{
  let row = req.body
})

app.listen(PORT, ()=>{
  console.log(`Example app listening on port ${PORT}!`)
})
/*
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
*/
