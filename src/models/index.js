const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const tasks = sequelize.define("tasks", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    due_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: "Pending",
    },
    completed_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: true,
    createdAt: "created_at",  // Custom column name
    updatedAt: "updated_at",  // Custom column name
}
);

module.exports = { tasks };