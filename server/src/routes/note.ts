const express = require("express");
const Note = require("../models/Note").default;
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const note = await Note.create({ user: req.user.id, content: req.body.content });
  res.json(note);
});

router.get("/", authMiddleware, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: "Note deleted" });
});

module.exports = router;
