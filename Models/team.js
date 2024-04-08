import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  member: [
    {
      type: mongoose.ObjectId,
      ref: "user",
    },
  ],
});
export const teamModel = new mongoose.model("team", teamSchema);
