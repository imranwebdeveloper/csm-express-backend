const express = require("express");
const {
  login,
  register,
  getProfile,
  updateProfile,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;
