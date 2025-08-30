import { Router } from "express";
import Note from "../models/Note";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  const note = await Note.create({ user: req.user.id, content: req.body.content });
  res.json(note);
});

router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

router.delete("/:id", authMiddleware, async (req: AuthRequest, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: "Note deleted" });
});

export default router;
