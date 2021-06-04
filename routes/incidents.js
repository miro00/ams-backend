const express = require("express");
const router = express.Router();

const incident_controller = require("../controllers/incidentsController");

router.get("/", incident_controller.index);

module.exports = router;
