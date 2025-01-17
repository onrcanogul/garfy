import express from "express";
import {
  create,
  getByProfile,
  remove,
  update,
} from "../controllers/pet-controller";

const router = express.Router();

router.get("/", getByProfile);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
