"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("password", 10);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: "550e8400-e29b-41d4-a716-446655440000",
          username: "admin",
          email: "admin@example.com",
          password: hashedPassword,
          role: "admin",
          image: "https://example.com/admin-avatar.png",
        },
        {
          id: "550e8400-e29b-41d4-a716-446655440001",
          username: "john_doe",
          email: "john@example.com",
          password: hashedPassword,
          role: "user",
          image: "https://example.com/user-avatar.png",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
