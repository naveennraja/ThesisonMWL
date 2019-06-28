var express = require("express");
var router = express.Router();
var taskCtrl =require("../controller/tasks_controller");
router
    .route("/getWorldBankData")
    .get(taskCtrl.getWorldData);
router
    .route("/getWorldBankData/:countryName")
    .get(taskCtrl.getCountryData);
router
    .route("/webTasks/simpleTask")
    .post(taskCtrl.postSimpleTaskData);

// router
//     .route("/simpleTask")
//     .post(taskCtrl.postSimpleTaskData);
// router
//     .route("/simpleTask")
//     .post(taskCtrl.postSimpleTaskData);
module.exports = router;
