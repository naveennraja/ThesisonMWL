console.log("-----------------------Inside Task Controller---------------------------------------");
var mongoose = require("mongoose");
var task = mongoose.model("TaskModel");
module.exports.postTaskData = function(req,res)
{
        task.create({
            "computer-user": req.body["computer-user"],
            "effort": {
                "effort-rating": req.body["effort"]["effort-rating"],
                "effort-tally": req.body["effort"]["effort-tally"],
                "effort-weight": req.body["effort"]["effort-weight"],
                "effort-overall": req.body["effort"]["effort-overall"]
            },
            "frustration": {
                "frustration-rating": req.body["frustration"][" frustration-rating"],
                "frustration-tally": req.body["frustration"]["frustration-tally"],
                "frustration-weight": req.body["frustration"][ "frustration-weight"],
                "frustration-overall": req.body["frustration"]["frustration-overall"]
            },
            "irrelevant-checkbox-click": req.body["irrelevant-checkbox-click"],
            "irrelevant-clicks": req.body["irrelevant-clicks"],
            "irrelevant-maps-click": req.body["irrelevant-maps-click"],
            "mental-demand" : {
                "mental-demand-rating": req.body["mental-demand"]["mental-demand-rating"],
                "mental-demand-tally": req.body["mental-demand"]["mental-demand-rating"],
                "mental-demand-weight": req.body["mental-demand"]["mental-demand-rating"],
                "mental-demand-overall": req.body["mental-demand"]["mental-demand-rating"]
            },
            "nasa-tlx-overall" : req.body["nasa-tlx-overall"],
            "participant-gender" : req.body["participant-gender"],
            "participant-name" : req.body["participant-name"],
            "performance" : {
            "performance-rating" : req.body["performance"]["performance-rating"],
                "performance-tally": req.body["performance"]["performance-tally"],
                "performance-weight": req.body["performance"]["performance-weight"],
                "performance-overall": req.body["performance"]["performance-overall"],
            },
            "physical-demand":{
            "physical-demand-rating": req.body["physical-demand"]["physical-demand-rating"],
                "physical-demand-tally": req.body["physical-demand"]["physical-demand-tally"],
                "physical-demand-weight": req.body["physical-demand"]["physical-demand-weight"],
                "physical-demand-overall": req.body["physical-demand"]["physical-demand-overall"]
            },
            "relevant-checkbox-click": req.body["relevant-checkbox-click"],
            "relevant-clicks": req.body["relevant-clicks"],
            "relevant-maps-click": req.body["relevant-maps-click"],
            "self-report-measure-rating": req.body["self-report-measure-rating"],
            "task-type": req.body["task-type"],
            "temporal-demand": {
                "temporal-demand-rating": req.body["temporal-demand"]["temporal-demand-rating"],
                "temporal-demand-tally": req.body["temporal-demand"]["temporal-demand-tally"],
                "temporal-demand-weight": req.body["temporal-demand"]["temporal-demand-weight"],
                "temporal-demand-overall": req.body["temporal-demand"]["temporal-demand-overall"]
            },
            "time-spent-on-map": req.body["time-spent-on-map"],
            "time-spent-on-questionnaire": req.body["time-spent-on-questionnaire"],
            "times-zoomed-in": req.body["times-zoomed-in"],
            "times-zoomed-out": req.body["times-zoomed-out"],
            "total-clicks": req.body["total-clicks"],
            "total-time-spent": req.body["total-time-spent"],
            "total-time-taken-user": req.body["total-time-taken-user"],
            "uniqueId": req.body["uniqueId"],
            "userDetail": {
            "as": req.body["userDetail"]["as"],
                "city" : req.body["userDetail"]["uniqueId"],
                "country" :req.body["userDetail"]["city"],
                "countryCode": req.body["userDetail"]["countryCode"],
                "isp": req.body["userDetail"]["isp"],
                "lat": req.body["userDetail"]["lat"],
                "lon": req.body["userDetail"]["lon"],
                "org": req.body["userDetail"]["org"],
                "query": req.body["userDetail"]["query"],
                "region": req.body["userDetail"]["region"],
                "regionName": req.body["userDetail"]["regionName"],
                "status": req.body["userDetail"]["status"],
                "timezone": req.body["userDetail"]["timezone"],
                "zip": req.body["userDetail"]["zip"]
            },
            "userIp": req.body["zip"]
            },function(err,data){
            if(err) {
                console.log("-----------Error Adding the data-----------");
                res.status(400).json(err);
            } else {
                console.log("-----------Data added------------");
                res.status(201).json(data);
            }
        });
    console.log("Posted Data---------------------------------");
};
