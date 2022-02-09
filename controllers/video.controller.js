const Video = require("../models/video.model");

const getAllVideos = async (req, res) => {
  try {
    let videos = [];
    videos = await Video.find();
    return res.json({ success: true, videos: videos });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
const getVideoById = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);
    return res.json({ success: true, video: video });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = { getAllVideos, getVideoById };
