const { Router } = require("express");
const router = Router();
const {
  addNewPlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  getAllPlaylists,
} = require("../controllers/playlist.controller");

router.route("/").get(getAllPlaylists);
router.route("/new").post(addNewPlaylist);
router.route("/delete/:playlistId").delete(deletePlaylist);
router.route("/:playlistId/add/:videoId").post(addVideoToPlaylist);
router.route("/:playlistId/remove/:videoId").post(removeVideoFromPlaylist);

module.exports = router;
