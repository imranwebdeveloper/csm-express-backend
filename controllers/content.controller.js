const Content = require("../models/Content");
const { formatJoiErrors } = require("../utils/errorFormatter");
const { getPagination, getPagingData } = require("../utils/pagination");
const { contentValidation } = require("../validations/contentValidation");

// Get all Contents
exports.getContents = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { offset, limit: pageSize, pageNumber } = getPagination(page, limit);

    const contents = await Content.findAndCountAll({
      where: {},
      limit: pageSize,
      offset,
    });

    res.json({
      message: "Contents fetched successfully",
      success: true,
      ...getPagingData(contents, pageNumber, pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error, success: false });
  }
};

exports.getUserContents = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { offset, limit: pageSize, pageNumber } = getPagination(page, limit);

    const userId = req.user.id;
    const where = userId ? { userId } : {};

    const contents = await Content.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      message: "Contents fetched successfully",
      success: true,
      ...getPagingData(contents, pageNumber, pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error, success: false });
  }
};

// Get a single Content by ID
exports.getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findByPk(id);

    if (!content) {
      return res
        .status(404)
        .json({ message: "Content not found", success: false });
    }

    res.json({
      message: "Content fetched successfully",
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error, success: false });
  }
};

// Create a new Content
exports.createContent = async (req, res) => {
  try {
    const { error } = contentValidation(req.body);

    if (error) {
      return res.status(400).json({
        message: "validation error",
        success: false,
        errors: formatJoiErrors(error),
      });
    }

    const { title, description, youtubeUrl } = req.body;

    if (!title || !youtubeUrl) {
      return res.status(400).json({
        message: "Title and YouTube URL are required",
        success: false,
      });
    }

    const content = await Content.create({
      title,
      description,
      youtubeUrl,
      userId: req.user.id,
    });

    res.status(201).json({
      message: "Content created successfully",
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error, success: false });
  }
};

// Update Content
exports.updateContent = async (req, res) => {
  try {
    const { error } = contentValidation(req.body);

    if (error) {
      return res.status(400).json({
        message: "validation error",
        success: false,
        errors: formatJoiErrors(error),
      });
    }
    const { id } = req.params;
    const { title, description, youtubeUrl } = req.body;
    const content = await Content.findByPk(id);

    if (!content) {
      return res
        .status(404)
        .json({ message: "Content not found", success: false });
    }

    await content.update({ title, description, youtubeUrl });
    res.json({
      message: "Content updated successfully",
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error, success: false });
  }
};

// Delete Content
exports.deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findByPk(id);

    if (!content) {
      return res
        .status(404)
        .json({ message: "Content not found", success: false });
    }

    await content.destroy();

    res.json({ message: "Content deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error, success: false });
  }
};
