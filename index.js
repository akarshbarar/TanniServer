var express = require("express");
var bodyParser = require("body-parser");
var mysql = require('mysql');
var cors = require('cors');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var server = app.listen(3000, function() {

    console.log("Listening on port %s...", server.address().port);
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tannni"

});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

var whitelist = ['http://localhost:4200'];
var corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

//! CORPORATE
app.get("/corporate/getItems", cors(corsOptions), function(req, res) {

    var data = [];
    con.query("SELECT * FROM coroprateitem", function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        data = result;
        console.log(data);
        res.status(200).send(data);
    });

});


app.get("/corporate/getOrderDetails", cors(corsOptions), function(req, res) {

    var data = [];
    con.query("SELECT * FROM corporateorderdetails", function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        data = result;
        console.log(data);
        res.status(200).send(data);
    });

});
app.get("/corporate/getOrderDetailsHistory", cors(corsOptions), function(req, res) {

    var data = [];
    con.query("SELECT * FROM historycorporateorderdetails", function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        data = result;
        console.log(data);
        res.status(200).send(data);
    });

});

app.post("/corporate/addItems", cors(corsOptions), function(req, res) {

    // if(!req.body.username || !req.body.password || !req.body.twitter) {
    //     return res.send({"status": "error", "message": "missing a parameter"});
    // } else {
    //     return res.send(req.body);
    // }
    console.log(req.body);
    console.log(req.body.Price);
    console.log(req.body.NuberOfBottles);
    var sql = "INSERT INTO coroprateitem  VALUES ('" + req.body.NuberOfBottles + "', '" + req.body.Price + "')";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    return res.send(req.body);
});



//rest api to delete record from mysql database
app.post('/item', function(req, res) {
    console.log(req.body.NumberOfBottles);
    con.query('DELETE FROM `coroprateitem` WHERE `NumberOfBottles`=?', [req.body.NumberOfBottles], function(error, results, fields) {
        if (error) throw error;
        return res.send(req.body);
    });
});

//rest api to delete record from mysql database
app.post('/corporateItemUpdate', function(req, res) {
    console.log(req.body);


    var sql = "UPDATE coroprateitem SET Price = " + req.body.Price + " WHERE NumberOfBottles = " + req.body.NumberOfBottle + "";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });
});

//!Commercial

app.get("/commercial/getItems", cors(corsOptions), function(req, res) {

    var data = [];
    con.query("SELECT * FROM commercialitem", function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        data = result;
        console.log(data);
        res.status(200).send(data);
    });

});


app.get("/commercial/getOrderDetails", cors(corsOptions), function(req, res) {

    var data = [];
    con.query("SELECT * FROM commercialorderdetials", function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        data = result;
        console.log(data);
        res.status(200).send(data);
    });

});
app.get("/commercial/getOrderDetailsHistory", cors(corsOptions), function(req, res) {

    var data = [];
    con.query("SELECT * FROM historycommercialorderdetails", function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        data = result;
        console.log(data);
        res.status(200).send(data);
    });

});

app.post("/commercial/addItems", cors(corsOptions), function(req, res) {

    // if(!req.body.username || !req.body.password || !req.body.twitter) {
    //     return res.send({"status": "error", "message": "missing a parameter"});
    // } else {
    //     return res.send(req.body);
    // }
    console.log(req.body);
    console.log(req.body.Price);
    console.log(req.body.NuberOfBottles);
    var sql = "INSERT INTO commercialitem  VALUES ('" + req.body.NuberOfBottles + "', '" + req.body.Price + "')";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    return res.send(req.body);
});



//rest api to delete record from mysql database
app.post('/commercial/deleteItem', function(req, res) {
    console.log(req.body.NumberOfBottles);
    con.query('DELETE FROM `commercialitem` WHERE `NumberOfBottles`=?', [req.body.NumberOfBottles], function(error, results, fields) {
        if (error) throw error;
        return res.send(req.body);
    });
});

//rest api to delete record from mysql database
app.post('/commercialItemUpdate', function(req, res) {
    console.log(req.body);


    var sql = "UPDATE commercialitem SET Price = " + req.body.Price + " WHERE NumberOfBottles = " + req.body.NumberOfBottle + "";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });
});

//!RESEDENTIAL
app.get("/residential/getOrderDetails", cors(corsOptions), function(req, res) {

    var data = [];
    con.query("SELECT * FROM residentialorderdetails", function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        data = result;
        console.log(data);
        res.status(200).send(data);
    });

});

app.get("/residential/getOrderDetailsHistory", cors(corsOptions), function(req, res) {

    var data = [];
    con.query("SELECT * FROM historyresidentialorderdetails", function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        data = result;
        console.log(data);
        res.status(200).send(data);
    });

});