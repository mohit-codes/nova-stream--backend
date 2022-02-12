const _ = require("lodash");
const User = require("../models/user.model");
const Playlist = require("../models/playlist.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUserAndSendCredentials = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).catch((err) =>
      console.log(err)
    );
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        return res.json({
          success: true,
          message: "Login Successful",
          user: _.pick(user, ["_id", "name", "email"]),
          token: token,
        });
      }
      return res.json({
        success: false,
        message: "Wrong Password!",
        user: null,
        token: null,
      });
    }
    return res.json({
      success: false,
      message: "User not found!",
      user: null,
      token: null,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const signupUserAndSendCredentials = async (req, res) => {
  try {
    const user = req.body;
    const isAlreadyExist = await User.findOne({ email: user.email }).catch(
      (err) => console.log(err)
    );
    if (isAlreadyExist) {
      return res.json({
        success: false,
        message: "Email already exist, try login instead",
      });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    let newUser = new User(user);
    newUser = await newUser.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res.json({
      success: true,
      user: _.pick(newUser, ["_id", "name", "email"]),
      token: token,
    });
  } catch (error) {
    console.trace(error);
    return res.json({ success: false, message: error.message });
  }
};

const fetchUserData = async (req, res) => {
  try {
    const user = req.user;
    const { playlists } = await User.findById(user._id).populate({
      path: "playlists",
      model: Playlist,
    });

    if (user) {
      return res.json({
        success: true,
        liked: user.liked || [],
        playlists: playlists,
        history: user.history,
      });
    }
    return res.json({
      success: false,
      message: "User not found!",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

module.exports = {
  fetchUserData,
  loginUserAndSendCredentials,
  signupUserAndSendCredentials,
};
