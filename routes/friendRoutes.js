const {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriends,
  getPendingRequests,
  getExploreUsers,
} = require("../controllers/friendController");
const { protect } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/send/:id", protect, sendFriendRequest);
router.post("/accept/:id", protect, acceptFriendRequest);
router.post("/reject/:id", protect, rejectFriendRequest);
router.get("/all", protect, getFriends);
router.get("/requests", protect, getPendingRequests);
router.get("/explore", protect, getExploreUsers);

module.exports = router;
