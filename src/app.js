const express = require("express");
const sequelize = require("./config/config");

const app = express();

app.use(express.json());

app.use("/", require("./routes/tasks"));

sequelize
    .authenticate()
    .then(() => console.log("DB is connected"))
    .catch((err) => {
        console.error(err.message);
        process.exit(1);
    });

(async () => {
    try {
        await sequelize.sync();
        console.log("Sequelize synchronization completed.");
    } catch (error) {
        console.error("Sequelize synchronization failed:", error.message);
    }
})();

module.exports = app;