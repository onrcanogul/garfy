import mongoose from "mongoose";
const { Schema } = mongoose;

const PetSchema = new Schema({
  id: {
    type: String,
    default: () => require("uuid").v4(),
  },
  name: { type: String, required: true },
  species: { type: String, required: true }, // Örn. "Kedi", "Köpek"
  age: { type: Number, required: true },
  profileId: { type: String, default: () => require("uuid").v4() },
});

export default mongoose.model("Pet", PetSchema);
