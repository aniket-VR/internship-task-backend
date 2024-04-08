import express from "express";
import { userRouter } from "./Routes/user.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDatabase } from "./Config/database.js";
import { teamRouter } from "./Routes/team.js";
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
dotenv.config();
connectDatabase(process.env.DB_URL).then(() => {
  console.log("database connected");
});
app.use("/api/users", userRouter);
app.use("/api/team", teamRouter);
app.listen(process.env.PORT || 8000, () => {
  console.log("server started");
});
