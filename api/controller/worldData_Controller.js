console.log("-----------------------Inside World Data Controller---------------------------------------");
var mongoose = require("mongoose");
var worldData = mongoose.model("worldData");

module.exports.getWorldData = function(req,res) {
    console.log("Get World Data ");
    console.log(req.query);
    var offset = 0;
    var count = 0;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if(isNaN(offset) || isNaN(count)){
        res.status(400)
            .json({"message":"Querystring should be numbers"});
        return;
    }
    worldData
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, data) {
            var response = {
                status :200,
                message : data
            };
            if(err){
                console.log("Error retriving data");
                response.status = 500;
                response.message = err;
            } else if(!data) {
                response.status = 404;
                response.message = "Country code not found";
            }
            console.log("Total Length of Data----------------", data.length);
            res.status(response.status)
                .json(response.message);
        });
};
module.exports.getCountryData = function(req,res)  {
    console.log("Get Data By Country Code",req.params);
    var offset = 0;
    var count = 0;
    var countryCode = req.params;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if(isNaN(offset) || isNaN(count)) {
        res.status(400)
            .json({"message":"Querystring should be numbers"});
        return;
    }
    worldData
        .find(countryCode)
        .exec(function( err, data ){
            var response = {
                status :200,
                message : data
            };
            if(err) {
                console.log("Error retriving data");
                response.status = 500;
                response.message = err;
            } else if(!data) {
                response.status = 404;
                response.message = "Country code not found";
            }
            console.log("Total Length of Data----------------", data.length);
                res.status(response.status)
                    .json(response.message);
        });
};