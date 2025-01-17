import express from "express";
import { create, get, remove, update } from "../controllers/profile-controller";

const router = express.Router();

router.get("/", get);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
