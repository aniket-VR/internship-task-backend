import { Router } from "express";
import { createTeam, getTeamDetails } from "../Controllers/team.js";

export const teamRouter = new Router();
teamRouter.get("/:id", getTeamDetails);
teamRouter.post("/", createTeam);
