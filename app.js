var express = require('express');
var app = express();

var route1 = require('./routes/route1');

app.use('/util', express.static('util'))
app.use('/public', express.static('public'))
app.use('/css', express.static('css'))
//view engine
app.engine('pug', require('pug').__express)
app.set('view engine', 'pug')
app.set('views', './views')

app.use('/route1', route1);

app.use('/*', function(req, res){
    res.send("The selected route doesn't exist")
})

var server = app.listen(8080, function(){
    var port = server.address().port;
    console.log('App listening on port ' + port)
})

