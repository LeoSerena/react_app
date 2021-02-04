var express = require('express');
var route1 = express.Router();

const csv = require('csv-parser');
const fs = require('fs')

route1.get('/index', function(req,res){

    const rdm = Math.random()
    res.render(
        'index')
})

route1.get('/table/:id([0-9]+$)', function(req, res){
    filename = 'some_data.csv'
    var array = []
    fs.createReadStream('public/' + filename)
        .pipe(csv())
        .on('data', (row) => {
            array.push(row)
        }).on('end', () => {
            array.sort( (a,b) => a.author > b.author )
            res.send({
                id : req.params.id,
                table : array
            })
        })
})

module.exports = route1