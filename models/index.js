const { sequelize, Sequelize } = require("../utils/db");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.User = require("./User");
db.Content = require("./Content");

module.exports = db;
