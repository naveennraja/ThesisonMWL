var worldBankData = require("../worldBankData/WorldBankData");
module.exports.getWorldData = function(req,res)
{
    console.log("Load the world bank data");
    res.status(200)
        .json(worldBankData);
};
module.exports.getCountryData = function(req,res)
{
    var countryName  = req.params.countryName;
    var currentCountry= worldBankData[countryName];
    console.log("Get current country data",countryName );
    res.status(200)
        .json(currentCountry);
};