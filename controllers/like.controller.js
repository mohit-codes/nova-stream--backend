const Video = require("../models/video.model");

const getAllLikedVideos = async (req, res) => {
  try {
    const user = req.user;
    const likedVideos = await Video.find({ _id: { $in: user.likedVideos } });
    return res.json({ success: true, videos: likedVideos });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const addToLikedVideos = async (req, res) => {
  try {
    const user = req.user;
    const { videoId } = req.params;
    user.likedVideos.push(videoId);
    await user.save();
    return res.json({ success: true, message: "video added to liked videos" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const removeFromLikedVideos = async (req, res) => {
  try {
    const user = req.user;
    const { videoId } = req.params;
    user.likedVideos = user.likedVideos.filter((id) => id !== videoId);
    await user.save();
    return res.json({
      success: true,
      message: "video removed from liked videos",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllLikedVideos,
  addToLikedVideos,
  removeFromLikedVideos,
};
