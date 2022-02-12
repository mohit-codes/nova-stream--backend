const Playlist = require("../models/playlist.model");
const Video = require("../models/video.model");
const getAllPlaylists = async (req, res) => {
  try {
    const user = req.user;
    let playlists = [];
    playlists = await Playlist.find({ _id: { $in: user.playlists } }).populate({
      path: "videos",
      model: Video,
    });
    return res.json({ success: true, playlists: playlists });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const addNewPlaylist = async (req, res) => {
  try {
    const user = req.user;
    const { name } = req.body;
    let playlist = new Playlist({ user: user._id, name: name });
    playlist = await playlist.save();
    user.playlists.push(playlist._id);
    await user.save();
    return res.json({ success: true, playlist: playlist });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const user = req.user;
    const { playlistId } = req.params;
    await Playlist.findByIdAndDelete(playlistId);
    user.playlists = user.playlists.filter(({ _id }) => _id !== playlistId);
    await user.save();
    return res.json({ success: true, message: "playlist deleted" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const addVideoToPlaylist = async (req, res) => {
  try {
    const { playlistId, videoId } = req.params;
    const playlist = await Playlist.findById(playlistId);

    if (!playlist.videos.some((id) => id !== videoId)) {
      playlist.videos.push(videoId);
      await playlist.save();
      return res.json({ success: true, message: "Video added to playlist" });
    }
    return res.json({
      success: false,
      message: "video already exist in playlist",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const removeVideoFromPlaylist = async (req, res) => {
  try {
    const { playlistId, videoId } = req.params;
    let playlist = await Playlist.findById(playlistId);
    if (playlist.videos.includes(videoId)) {
      playlist.videos = playlist.videos.filter((id) => id !== videoId);
      await playlist.save();
      return res.json({
        success: true,
        message: "Video removed from playlist",
      });
    }
    return res.json({
      success: false,
      message: "Video not exist in playlist",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllPlaylists,
  addNewPlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
};
