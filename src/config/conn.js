import mongoose from "mongoose";

const DBNAME = "db_learning";

try {
  await mongoose.connect(`mongodb://127.0.0.1:27017/${DBNAME}`);
} catch (error) {
  handleError(error);
}

process.on("Failed connection", (error) => {
  console.log("Failed connecting to server", error);
});

export default mongoose;
