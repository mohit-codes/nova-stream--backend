const User = require("../models/user.model");

const getHistory = async (req, res) => {
  try {
    const user = req.user;
    const { history } = await User.findById(user._id).populate("history");
    return res.json({ success: true, history: history });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
const addToHistory = async (req, res) => {
  try {
    const user = req.user;
    const { videoId } = req.params;
    user.history.unshift(videoId);
    await user.save();
    return res.json({ success: true, message: "added to history" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
const removeFromHistory = async (req, res) => {
  try {
    const user = req.user;
    const { videoId } = req.params;
    user.history = user.history.filter((id) => id !== videoId);
    await user.save();
    return res.json({ success: true, message: "removed from history" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
const deleteHistory = async (req, res) => {
  try {
    const user = req.user;
    user.history = [];
    await user.save();
    return res.json({ success: true, message: "history deleted" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = { getHistory, addToHistory, removeFromHistory, deleteHistory };
