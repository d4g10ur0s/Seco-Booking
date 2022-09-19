var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors')

var http = require('http');
var util = require('util');
var mysql = require('mysql');
const url = require('url');
var formidable = require('formidable');

//to connection se db
const con = mysql.createConnection({//sundesh se vash
  host: "localhost",
  user: "root",
  password: "Den8aKsexasw",
  database: "SecoBooking",
  multipleStatements: true
});

var app = express();


// view engine setup
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'ejs');
app.use(cors());

//add Service in db
app.all('/addService',function (req, res) {
  console.log('Request received: ');
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
  if(req.method==='OPTIONS'){
          res.writeHead(200);
          res.end();
    }else if(req.method==='POST'){
      var body = [];
      //h katallhlh kefalida
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      });
      //diavase data
      req.on("data", (chunk) => {
        console.log(chunk);
        body.push(chunk);
        console.log(body)
      });
      //otan exeis diavasei olo to data
      req.on("end", () => {
        var mdata = Buffer.concat(body).toString();
        mdata = JSON.parse(mdata);//parsing json
        console.log(mdata);

        con.connect(function(err) {
          console.log("Connected");
          const query = util.promisify(con.query).bind(con);//g9ia na exw promises

          var tQuery = "INSERT INTO service (title,duration,cost,myCost,description) VALUES ( " +
                        "\'"+mdata.title +"\'" + "," +
                        mdata.duration + "," +
                        mdata.cost+ "," +
                        mdata.myCost + "," +
                        "\'"+mdata.description+"\'"
                        + " );";
          query(tQuery);
        });//telos query gia info

        res.write(JSON.stringify({a:'a'}));
        res.end();
      });//telos connect

      res.on('error', (err) => {
        console.error(err);
      });
  }//end if
});

//retrieve Service from db
app.all('/retrieveService',function (req, res) {
  console.log('Request received: ');
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
  if(req.method==='OPTIONS'){
          res.writeHead(200);
          res.end();
    }else if(req.method==='POST'){
      var body = [];
      //h katallhlh kefalida
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      });
      //diavase data
      req.on("data", (chunk) => {
        console.log(chunk);
        body.push(chunk);
        console.log(body)
      });
      //otan exeis diavasei olo to data
      req.on("end", async () => {
        var mdata = Buffer.concat(body).toString();
        mdata = JSON.parse(mdata);//parsing json
        console.log(mdata);

        await con.connect(async function(err) {
          console.log("Connected");
          const query = util.promisify(con.query).bind(con);
          var tQuery = "SELECT * FROM service ;";
          mdata = await query(tQuery);

          res.write(JSON.stringify({serv : mdata}));
          res.end();
        });//telos query

      });//telos connect

      res.on('error', (err) => {
        console.error(err);
      });
  }//end if
});

app.listen(8080, function() {
  console.log('Node app is running on port 8080');
});
module.exports = app;
