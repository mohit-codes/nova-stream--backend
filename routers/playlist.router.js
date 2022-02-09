const { Router } = require("express");
const router = Router();
const {
  addNewPlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  getAllPlaylists,
} = require("../controllers/playlist.controller");

router.get("/", getAllPlaylists);
router.post("/new", addNewPlaylist);
router.delete("/delete/:playlistId", deletePlaylist);
router.post("/:playlistId/add/:videoId", addVideoToPlaylist);
router.post("/:playlistId/remove/:videoId", removeVideoFromPlaylist);

module.exports = router;
