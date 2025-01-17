import mongoose from "mongoose";
const { v4: uuidv4 } = require("uuid");
import PetSchema from "./Pet";

const ProfileSchema = new mongoose.Schema({
  userId: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    validate: {
      validator: (v) => v % 1 !== 0 || Number.isInteger(v),
      message: "Rating must be a float or integer value",
    },
  },
  pets: { type: [PetSchema], default: [] },
});

export default mongoose.model("Profile", ProfileSchema);
