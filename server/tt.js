const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")

const a = express()
a.use(cors())
a.use(express.json())

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    database:"linear_re"
})


a.listen(5000,()=>{
    console.log("connect port2")
})

a.get("/",(req,res)=>{
    console.log("connect")
    res.send("connect33333")
})

a.post("/getdata", (req,res)=>{
    console.log(req.body)
    const q = `SELECT * FROM inputdata WHERE num = ${req.body.num}`
    db.query(q, (err,data)=>{
        if(err) return res.send(err)
        res.send(data)
        
    })

})
