var worldBankData = require("../worldBankData/WorldBankData");
module.exports.getWorldData = function(req,res)
{
    var returnData;
    var offset = 0;
    var count = 5;
    console.log("Load the world bank data",req.query);
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count,10);
    }
    returnData = worldBankData.slice(offset,offset+count);
    res.status(200)
        .json(returnData);
};
module.exports.getCountryData = function(req,res)
{
    var countryName  = req.params.countryName;
    var currentCountry= worldBankData[countryName];
    console.log("Get current country data",countryName );
    res.status(200)
        .json(currentCountry);
};
module.exports.postSimpleTaskData = function(req,res)
{
    console.log("Post Task Datta ");
    console.log(req.body);
    res
        .status(200)
        .json(req.body);
};