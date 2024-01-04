import express from "express";
import cors from "cors";

import roleRoutes from "./src/routes/role.js";
import userRoutes from "./src/routes/user.js";

// SEEDING
import seed from "./src/utils/seed.js";

const app = express();

// setup CORS
app.use(cors());

// setup body parser
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

// SEEDING
await seed();

// ROUTES
app.use("/api/v1", roleRoutes);
app.use("/api/v2", userRoutes);

app.listen(3001, () => console.log("Service running on http://localhost:3001"));
