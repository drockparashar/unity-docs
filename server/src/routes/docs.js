import { DocModel } from "../models/Document.js";
import express from "express";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { title, author } = req.body;
    const newDoc = new DocModel({ title, author });
    await newDoc.save();

    res.status(201).json({ message: "Document Created" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/update", async (req, res) => {
  try {
    const { _id, content } = req.body;

    // Find the document by ID and update its content
    const updatedDoc = await DocModel.findByIdAndUpdate(
      _id,
      { content },
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json({ message: "Document updated", document: updatedDoc });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to update document", error: err.message });
  }
});

export { router as docRouter };
