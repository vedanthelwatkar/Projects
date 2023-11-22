import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (req, res, next) => {
  const { desc, videoId, userId } = req.body;
  try {
    const newComment = new Comment({
      desc,
      videoId,
      userId,
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
      const result = await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment Deleted");
      console.log("deleted",result)
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
    .sort({ createdAt: -1 })
    .exec();
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
