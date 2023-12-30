// import db from "../config/connection.js";

// export default db.collection("roles");

import Mongoose from "../config/conn.js";
const { Schema, model } = Mongoose;

const rolesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default model("Roles", rolesSchema);
