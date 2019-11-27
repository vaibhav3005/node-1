var express = require("express");
var router = express();
var mysql = require("mysql");
var config = require("config");

var connection = mysql.createConnection({
    host: config.get("host"),
    database:config.get("database"),
    user:config.get("user"),
    password:config.get("password")
})
connection.connect();
router.use(express.json());

router.get("/",(request,response)=>{
    var queryText = "SELECT * FROM ElectionTb";
    connection.query(queryText,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err.message));
        }
    })
})
router.get("/last",(request,response)=>{
    var queryText = "SELECT * FROM ElectionTb order by ID desc limit 1;";
    connection.query(queryText,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err.message));
        }
    })
})
router.get("/:ID",(request,response)=>{
    var ID = request.params.ID;
    var queryText = `SELECT * FROM ElectionTb where ID=${ID}`;
    connection.query(queryText,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err.message));
        }
    })
})

router.post("/",(request,response)=>{
    var queryText = `SELECT * FROM ElectionTb where ID=${ID}`;
    connection.query(queryText,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err.message));
        }
    })
})

router.put("/:ID",(request,response)=>{
    var ID = request.params.ID;
    var State = request.body.State;
    var queryText = `UPDATE ElectionTb set State = '${State}' where ID=${ID}`;
    connection.query(queryText,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err.message));
        }
    })
})

router.post("/",(request,response)=>{
    var ID = request.params.ID;
    var Party = request.body.Party;
    var NoOfSeats = request.body.NoOfSeats;
    var State = request.body.State;
    var queryText = `INSERT into ElectionTb values(${ID},'${State}','${Party}',${NoOfSeats})`;
    connection.query(queryText,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err.message));
        }
    })
})


module.exports = router;