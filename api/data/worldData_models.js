var mongoose = require("mongoose");
var collectionName = "worldData";
var worldDataSchema = new mongoose.Schema({
    "Country_Name": String,
    "Country_Code": String,
    "Series_Name": String,
    "Series_Code": String,
    "2018_[YR2018]": String,
    "2003_[YR2003]": String,
    "2002_[YR2002]": String,
    "2001_[YR2001]": String,
    "2017_[YR2017]": String,
    "2016_[YR2016]": String,
    "2015_[YR2015]": String,
    "2014_[YR2014]": String,
    "2013_[YR2013]": String,
    "2012_[YR2012]": String,
    "2011_[YR2011]": String,
    "2010_[YR2010]": String,
    "2009_[YR2009]": String,
    "2008_[YR2008]": String,
    "2007_[YR2007]": String,
    "2006_[YR2006]": String,
    "2005_[YR2005]": String,
    "2000_[YR2000]": String,
});
mongoose.model('worldData', worldDataSchema, collectionName);