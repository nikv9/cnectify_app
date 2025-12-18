import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql-db.js";

const Quote = sequelize.define(
  "Quote",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "quotes",
    timestamps: true,
  }
);

export default Quote;
