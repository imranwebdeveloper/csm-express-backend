const { sequelize, Sequelize } = require("../utils/db");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User");
db.Content = require("./Content");

db.User.hasMany(db.Content, {
  foreignKey: "userId",
  as: "contents",
  onDelete: "CASCADE",
});

db.Content.belongsTo(db.User, { foreignKey: "userId", as: "user" });

module.exports = db;
