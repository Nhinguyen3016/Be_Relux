const { getLatestServices } = require("../services/curen.service");

const router = require("express").Router();

router.get("/latest", getLatestServices);

module.exports = router;
