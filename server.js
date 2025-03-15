const app = require("./app");
const db = require("./utils/db");

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await db.sequelize.sync({ force: false });
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (error) {
    console.log("Failed to sync db: " + err.message);
  }
});
