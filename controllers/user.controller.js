const User = require("../models/User");
const { getPagination, getPagingData } = require("../utils/pagination");
const db = require("../models");

const getUserById = async (req, res) => {
  const userId = req.params?.id;
  try {
    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "email", "image", "role", "createdAt"],
      include: [
        {
          model: db.Content,
          as: "contents",
          attributes: ["id", "title", "description", "youtubeUrl", "createdAt"],
        },
      ],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { offset, limit: pageSize, pageNumber } = getPagination(page, limit);

    const users = await User.findAndCountAll({
      where: {},
      limit: pageSize,
      offset,
      include: [
        {
          model: db.Content,
          as: "contents",
          attributes: ["id", "title", "description", "youtubeUrl", "createdAt"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({
      message: "User fetched successfully",
      success: true,
      ...getPagingData(users, pageNumber, pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error, success: false });
  }
};

module.exports = { getUserById, getUsers };
