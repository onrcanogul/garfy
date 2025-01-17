import { Pet } from "./Pet";
import { Document } from "mongoose";

export interface IProfile extends Document {
  id: string;
  userId: string;
  name: string;
  pets: Pet[];
}
