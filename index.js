var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require("fs");
var mysql = require('mysql');
var request = require('request');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "socket_io_db"
});

var username;
var password;
var users;

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected DB!");  
});

app.get('/login', function(req, res){
  //fs.createReadStream(__dirname + '/login.html').pipe(res);
   res.sendFile(__dirname + '/login.html');
});
app.get('/message', function(req, res){
  fs.createReadStream(__dirname + '/message.php').pipe(res);
  username=req.query.username;
  password=req.query.pass;  
  con.query("SELECT * FROM kullanicilar", function (err, result, fields) {
    if (err) throw err;
    console.log(result);  
    users=result;
  });
   //res.sendFile(__dirname + '/message.html');
});
/*

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});


*/

/*io.on('connection', function(socket){
  console.log('a user connected');
});*/

/*io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});*/
/*io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});*/
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
  msg.customId = username;
 // if(msg.destination=="k2"){
    io.emit('chat message', msg);
    io.emit('chat users', users);  

    console.log('message: ' + JSON.stringify(msg));  
    var sql = "INSERT INTO mesajlar (kullanici_adi,kullanici_sifre,mesaj) VALUES ('"+username+"','"+password+"','"+msg+"')";  
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
 // }
});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});