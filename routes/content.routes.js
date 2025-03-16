const express = require("express");
const {
  createContent,
  deleteContent,
  getContentById,
  getContents,
  updateContent,
  getUserContents,
} = require("../controllers/content.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getContents);
router.get("/users", authMiddleware, getUserContents);
router.get("/:id", authMiddleware, getContentById);
router.post("/", authMiddleware, createContent);
router.put("/:id", authMiddleware, updateContent);
router.delete("/:id", authMiddleware, deleteContent);

module.exports = router;
