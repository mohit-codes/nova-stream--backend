const { Router } = require("express");
const router = Router();
const {
  getAllVideos,
  getVideoById,
} = require("../controllers/video.controller");

router.route("/all").get(getAllVideos);
router.route("/:videoId").get(getVideoById);

module.exports = router;
