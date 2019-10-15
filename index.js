var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var app = express().use(cors());

var pool = mysql.createPool({
   connectionLimit: 1000,
  acquireTimeout: 1000,
  timeout: 1000,
  host: 'remotemysql.com',
  port: '3346',
  user: 'y9G2SwSWHG',
  password: '4O10mfJsBj',
  database: 'y9G2SwSWHG',
  debug: true,
  multipleStatements: true,
  connectTimeout: 1000
});

/*var connection = mysql.createConnection({
  host: 'remotemysql.com',
  database: 'y9G2SwSWHG',
  user: 'y9G2SwSWHG',
  password: '4O10mfJsBj'
});*/




function handle_database(req, res) {
  // connection will be acquired automatically
  // pool.query(`SELECT players.id, players.first_name, players.last_name, rankings.rank, rankings.points FROM players  LEFT JOIN rankings ON players.id=rankings.player`,function(err,rows){
  pool.query(`SELECT * FROM user`, function(err, rows) {
    if (err) {
      return res.json({ error: true, message: 'Error occurred' + err });
    }
    //connection will be released as well.
    res.json(rows);
  });
}

function queryRow(userId, res) {
  let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
  let query = mysql.format(selectQuery, ['user', 'fire_base_id', userId]);
  // query = SELECT * FROM `todo` where `user` = 'shahid'
  // pool.query(query,(err, data) => {
  //     if(err) {
  //       return res.json({'error': true, 'message': 'Error occurred'+err});
  //         return;
  //     }
  //     // rows fetch
  //     console.log(data);
  //     res.json(rows);
  // });

  pool.query(query, function(err, rows) {
    if (err) {
      return res.json({ error: true, message: 'Error occurred' + err });
    }
    // console.log(data);
    res.json(rows);
  });
}

// setTimeout(() => {
//   // call the function
//   // select rows
//   queryRow('shahid');
// },5000);

// app.get("/user/:id",function(req,res){
//   const id = parseInt(req.params.id);
//   queryRow(id);
// });

app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  queryRow(id, res);
//  let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
//  let query = mysql.format(selectQuery, ['user', 'fire_base_id', id]);
//  connection.query(query, function (error, results, fields) {
//   if (error) throw error;
//   res.json(results);
//   console.log('====================================');
//   console.log(results);
//   //console.log(fields);
//   console.log('====================================');
// });
// connection.end(function(){
//   // The connection has been closed
// });
});

//app.listen(3000);
app.listen(3000, err => {
  if (err) {
    return console.log(err);
  }
  return console.log('My Express App listening on port 3000');
});
