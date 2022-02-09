const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    owner: { type: String, required: true },
    description: { type: String, required: true },
    isLatest: { type: Boolean, required: true },
    videoId: { type: String, required: true },
  },
  { timestamps: true }
);

const Video = mongoose.model("videos", videoSchema);

module.exports = Video;
