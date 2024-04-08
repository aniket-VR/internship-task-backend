import { Router } from "express";
import {
  getAllUser,
  getUserById,
  updateCurrentUser,
  createUser,
  deleteUser,
} from "../Controllers/user.js";

export const userRouter = new Router();
userRouter.get("/", getAllUser);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);
userRouter.put("/:id", updateCurrentUser);
userRouter.delete("/:id", deleteUser);
