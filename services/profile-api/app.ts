import express from "express";
import connectDb from "./db/db";
import profileRouter from "./routes/profile-routes";
import petRouter from "./routes/pet-routes";

connectDb();

const app = express();
const PORT = 9030;

app.use(express.json());

app.use("/api/profile", profileRouter);
app.use("/api/pet", petRouter);

app.listen(PORT, () => {
  console.log("Server is running at PORT: " + PORT);
});
