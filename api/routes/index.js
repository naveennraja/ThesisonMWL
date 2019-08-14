var express = require("express");
var router = express.Router();
var taskCtrl = require("../controller/tasks_controller");
var worldDataCtrl = require("../controller/worldData_Controller");

router
    .route("/getWorldBankData")
    .get(worldDataCtrl.getWorldData);
router
    .route("/getWorldBankData/:Country_Code")
    .get(worldDataCtrl.getCountryData);
router
    .route("/webTasks/postTaskData")
    .post(taskCtrl.postTaskData);

module.exports = router;
