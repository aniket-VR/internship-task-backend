import mongoose from "mongoose";

export async function connectDatabase(url) {
  return await mongoose.connect(url);
}
