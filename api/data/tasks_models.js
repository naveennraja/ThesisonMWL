console.log("--------------------------Inside Model------------------------------");
var mongoose = require("mongoose");
var taskSchema = new mongoose.Schema({
    "computer-user": String,
    "effort": {
        "effort-rating": Number,
        "effort-tally": Number,
        "effort-weight": Number,
        "effort-overall": Number,
},
    "frustration": {
        "frustration-rating": Number,
        "frustration-tally": Number,
        "frustration-weight": Number,
        "frustration-overall": Number
    },
    "irrelevant-checkbox-click": Number,
    "irrelevant-clicks": Number,
    "irrelevant-maps-click": Number,
    "mental-demand" : {
        "mental-demand-rating": Number,
        "mental-demand-tally": Number,
        "mental-demand-weight": Number,
        "mental-demand-overall": Number
    },
    "nasa-tlx-overall" : Number,
    "participant-gender" : String,
    "particpant-name" : String,
    "performance" : {
        "performance-rating" : Number,
            "performance-tally": Number,
            "performance-weight": Number,
            "performance-overall": Number
    },
    "physical-demand":{
        "physical-demand-rating": Number,
            "physical-demand-tally": Number,
            "physical-demand-weight": Number,
            "physical-demand-overall": Number
    },
    "relevant-checkbox-click": Number,
    "relevant-clicks": Number,
    "relevant-maps-click": Number,
    "self-report-measure-rating": Number,
    "task-type": String,
    "temporal-demand": {
        "temporal-demand-rating": Number,
        "temporal-demand-tally": Number,
        "temporal-demand-weight": Number,
        "temporal-demand-overall": Number,
    },
    "time-spent-on-map": Number,
    "time-spent-on-questionnaire": Number,
    "times-zoomed-in": Number,
    "times-zoomed-out": Number,
    "total-clicks": Number,
    "total-time-spent": Number,
    "total-time-taken-user": Number,
    "uniqueId": String,
    "userDetail": {
            "as": String,
            "city" : String,
            "country" :String,
            "countryCode": String,
            "isp": String,
            "lat": Number,
            "lon": Number,
            "org": String,
            "query": String,
            "region": String,
            "regionName": String,
            "status": String,
            "timezone": String,
            "zip": String
    },
    "userIp": String
});
mongoose.model('TaskModel', taskSchema);