var express = require("express");
var app = express();
var path = require("path");
var routes = require("./api/routes");

//Setting the port to load
app.set('port',3000);
// Reading the files which has to be loaded
app.use(function(req,res,next){
    console.log(req.method, req.url);
    next();
});
// Setting the static directory to load
app.use(express.static(path.join(__dirname,"public")));
//Adding the routes
app.use("/api",routes);
app.get("/",function(req,res){
    console.log("Get to the homepage");
    res
         .status(200)
        .sendFile(path.join(__dirname,'public','index.html'));
    console.log("Go to the homepage");
});


var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log("This app is using port",port);
});
