const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
const jwt = require("jsonwebtoken")

const App = express()
App.use(cors())
App.use(express.json())

const secretKeys = "cream"

const db = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"cream0164",
    database:"linear_re"
})

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });


App.get("/gettoken/:name", (req,res)=>{
    console.log(req.params.name);
    const token = jwt.sign({ user:req.params.name }, secretKeys);
    console.log("get token succesfully");
    res.send(token);
})

App.get("/getalldata",authorization , (req,res)=>{
  console.log(req.body)
  const q = `SELECT * FROM inputdata`
  db.query(q, (err, data)=>{
      if(err) return res.send(err)
      console.log(data)
      res.send(data)
  })
})

App.get("/equation", (req,res)=>{
  console.log(req.body)
  const q = `SELECT * FROM inputdata`
  db.query(q, (err, data)=>{
      if(err) return res.send(err)
      console.log(data)
      res.send(data)
  })
})

App.post("/getdata",authorization, (req,res)=>{
    console.log(req.body)
    const q = `SELECT * FROM inputdata WHERE num = ${req.body.num}`
    db.query(q, (err, data)=>{
        if(err) return res.send(err)
        res.send(data)
    })
})

App.post("/insertdata", (req,res)=>{
    let d = JSON.stringify(req.body)
    console.log(d)
    const q = `SELECT * FROM inputdata WHERE alldata = '${d}'`
    console.log(req.body.x)
    db.query(q, (err,data)=>{
        if(err) return res.send(err)
        if(data.length > 0){
            console.log("have data")
            res.send("have data")
        }
        else{
            console.log("no have data")
            const q1 = `INSERT INTO inputdata(alldata, num) VALUES(?,?)`;
            db.query(q1, [d,req.body.numgen], (err)=>{
                if(err) return res.send(err)
                console.log("add data success")
            })
        }

    })
})

App.get("/", (req,res)=>{
    console.log("1111")
    res.send("2222")
})

function authorization(req, res, next) {
    let token = req.headers["authorization"];
    console.log(req.headers)
    console.log(token)
    if (token === undefined) {
      res.send("don't have authorization");
    } else {
      try {
        //console.log(token1 = ${token});
        token = token.split(" ")[1];
        console.log(token);
        let decode = jwt.verify(token, secretKeys);
        console.log(decode);
        if (decode.user === "cream") {
          next();
        } else {
          res.send("pls authen");
        }
      } catch {
        res.send("no correct");
      }
    }
  }

App.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
 
App.listen(4000,()=>{
    console.log("connect port")
})

module.exports = App