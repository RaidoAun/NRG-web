import {Database} from './database.js'
import express, { query } from 'express'
const PORT = 5001
const app = express()
app.use(express.json())

let db = new Database()

//let data = [{id:0,text:"tere"}]

app.get('/api/parking', (req,res)=>{
  let userid = req.query.id
  let user
  db.getUserById(userid,(data)=>{
    if (data.length === 0){
      res.status(200).send(data)
      return
    }
    
    user = data[0]
    if (user.is_admin === 1){
      db.getParkingData((data)=>{
        res.send(data)
      })
    }
    if (user.is_admin === 0){
      db.getUserParkingData(user,(data)=>{
        res.send(data)
      })
    }
  })
})
app.put('/api/parking/addrow',(req,res)=>{
  let row = req.body
  db.addParkingRow(row)
  res.status(200).send("OK")
})

app.get('/api/users', (req,res)=>{
  let userid = req.query.id
  let user
  db.getUserById(userid,(data)=>{
    if (data.length === 0){
      res.sendStatus(200)
      return
    }
    user = data[0]
    res.send(user)
  })
})
app.put('/api/parking/deleterow',(req,res)=>{
  let userid = req.body.user_id
  let rowid = req.body.row_id
  let user
  db.getUserById(userid,(data)=>{
    if (data.length === 0){
      res.status(200).send(data)
      return
    }

    user = data[0]
    if (user.is_admin === 1){
      db.deleteParkingRowById(rowid)
      res.status(200).send("OK")
    }
    if (user.is_admin === 0){
      db.getParkingDataByRowId(rowid, (data)=>{
        if (data[0] === undefined) {
          res.status(200).send(data)
          return
        } 
        if (data[0].user_id === userid){
          db.deleteParkingRowById(rowid)
          res.status(200).send("OK")
        }else{
          res.status(401).send("")
        }
      })
    }
  })
})
app.put('/api/parking/editrow',(req,res)=>{
  let row = req.body
  db.editParkingRowById(row.id)
  res.status(200).send("OK")
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
