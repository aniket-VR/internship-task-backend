import { teamModel } from "../Models/team.js";

export async function getTeamDetails(req, res) {
  try {
    const id = req.params.id;
    const result = await teamModel.findById(id).populate("member");
    if (result) {
      res.status(200).send({
        data: result,
        message: "team found",
      });
    } else {
      res.status(404).send({
        message: "team not found",
      });
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
}
export async function createTeam(req, res) {
  try {
    const { name, member } = req.body;
    const result = await teamModel.create({
      name: name,
      member: member,
    });
    if (result) res.status(200).send("team created");
    else res.status(404).send("team not created");
  } catch (error) {
    res.status(500).send("internal server error");
  }
}
