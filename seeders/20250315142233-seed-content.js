"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Contents", [
      {
        id: uuidv4(),
        userId: "550e8400-e29b-41d4-a716-446655440000",
        title: "How to Build a Full-Stack App",
        description:
          "A step-by-step guide to building a full-stack web application.",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      {
        id: uuidv4(),
        userId: "550e8400-e29b-41d4-a716-446655440000",
        title: "Understanding Sequelize ORM",
        description:
          "A tutorial explaining how to use Sequelize with PostgreSQL.",
        youtubeUrl: "https://www.youtube.com/watch?v=5aVZ8XR0jbg",
      },
      {
        id: uuidv4(),
        userId: "550e8400-e29b-41d4-a716-446655440000",
        title: "Learn Node.js in One Hour",
        description: "A crash course on Node.js for beginners.",
        youtubeUrl: "https://www.youtube.com/watch?v=fBNz5xF-Kx4",
      },
      {
        id: uuidv4(),
        userId: "550e8400-e29b-41d4-a716-446655440000",
        title: "Mastering React Hooks",
        description: "Deep dive into React Hooks with real-world examples.",
        youtubeUrl: "https://www.youtube.com/watch?v=LlvBzyy-558",
      },
      {
        id: uuidv4(),
        userId: "550e8400-e29b-41d4-a716-446655440000",
        title: "Advanced JavaScript Concepts",
        description: "Understanding closures, promises, and async/await.",
        youtubeUrl: "https://www.youtube.com/watch?v=0m2uLbP3oYc",
      },
      {
        id: uuidv4(),
        userId: "550e8400-e29b-41d4-a716-446655440000",
        title: "Docker for Developers",
        description: "How to use Docker to containerize your applications.",
        youtubeUrl: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
      },
      {
        id: uuidv4(),
        userId: "550e8400-e29b-41d4-a716-446655440000",
        title: "GraphQL vs REST API",
        description:
          "Comparing GraphQL and REST APIs with practical use cases.",
        youtubeUrl: "https://www.youtube.com/watch?v=ed8SzALpx1Q",
      },
      {
        id: uuidv4(),
        userId: "550e8400-e29b-41d4-a716-446655440000",
        title: "Building a REST API with Express",
        description:
          "A step-by-step tutorial on creating a REST API with Express.js.",
        youtubeUrl: "https://www.youtube.com/watch?v=pKd0Rpw7O48",
      },
      {
        id: uuidv4(),
        userId: "550e8400-e29b-41d4-a716-446655440000",
        title: "Next.js for Beginners",
        description: "Learn how to build fast web applications using Next.js.",
        youtubeUrl: "https://www.youtube.com/watch?v=mTz0GXj8NN0",
      },
      {
        id: uuidv4(),
        userId: "550e8400-e29b-41d4-a716-446655440000",
        title: "Building an Authentication System",
        description:
          "Learn how to implement JWT authentication in a Node.js app.",
        youtubeUrl: "https://www.youtube.com/watch?v=7Q17ubqLfaM",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Contents", null, {});
  },
};
