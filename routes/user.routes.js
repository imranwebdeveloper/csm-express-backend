const express = require("express");
const { getUserById, getUsers } = require("../controllers/user.controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);

module.exports = router;
