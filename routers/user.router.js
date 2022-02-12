const { Router } = require("express");
const router = Router();
const {
  loginUserAndSendCredentials,
  signupUserAndSendCredentials,
  fetchUserData,
} = require("../controllers/user.controller");
const {
  getAllLikedVideos,
  addToLikedVideos,
  removeFromLikedVideos,
} = require("../controllers/like.controller");
const {
  getHistory,
  addToHistory,
  removeFromHistory,
  deleteHistory,
} = require("../controllers/history.controller");
const authenticate = require("../middleware/authenticate");

router.route("/login").post(loginUserAndSendCredentials);
router.route("/signup").post(signupUserAndSendCredentials);
router.route("/user-data").get(authenticate, fetchUserData);

router.route("/liked").get(authenticate, getAllLikedVideos);
router.route("/liked/add/:videoId").post(authenticate, addToLikedVideos);
router.route("/liked/remove/:videoId").put(authenticate, removeFromLikedVideos);

router.route("/history").get(authenticate, getHistory);
router.route("/history/add/:videoId").post(authenticate, addToHistory);
router.route("/history/remove/:videoId").put(authenticate, removeFromHistory);
router.route("/history/delete").delete(authenticate, deleteHistory);

module.exports = router;
