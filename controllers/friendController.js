const User = require("../models/userModel");

module.exports.sendFriendRequest = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.params.id;

    if (senderId === receiverId) {
      return res.json({ msg: "Cannot send request to yourself", status: false });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.json({ msg: "User not found", status: false });
    }

    // Check if they are already friends
    if (receiver.friends.includes(senderId)) {
      return res.json({ msg: "Already friends", status: false });
    }

    // Check if request already sent
    if (receiver.receivedRequests.includes(senderId)) {
      return res.json({ msg: "Request already sent", status: false });
    }

    // Add to receiver's receivedRequests
    await User.findByIdAndUpdate(receiverId, {
      $push: { receivedRequests: senderId },
    });

    // Add to sender's sentRequests
    await User.findByIdAndUpdate(senderId, {
      $push: { sentRequests: receiverId },
    });

    return res.json({ msg: "Friend request sent", status: true });
  } catch (ex) {
    next(ex);
  }
};

module.exports.acceptFriendRequest = async (req, res, next) => {
  try {
    const userId = req.user.id; // The one who received the request
    const senderId = req.params.id; // The one who sent the request

    const user = await User.findById(userId);
    if (!user.receivedRequests.includes(senderId)) {
      return res.json({ msg: "No pending request from this user", status: false });
    }

    // Add to each other's friends array
    await User.findByIdAndUpdate(userId, {
      $pull: { receivedRequests: senderId },
      $push: { friends: senderId },
    });

    await User.findByIdAndUpdate(senderId, {
      $pull: { sentRequests: userId },
      $push: { friends: userId },
    });

    return res.json({ msg: "Friend request accepted", status: true });
  } catch (ex) {
    next(ex);
  }
};

module.exports.rejectFriendRequest = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const senderId = req.params.id;

    await User.findByIdAndUpdate(userId, {
      $pull: { receivedRequests: senderId },
    });

    await User.findByIdAndUpdate(senderId, {
      $pull: { sentRequests: userId },
    });

    return res.json({ msg: "Friend request rejected", status: true });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getFriends = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "friends",
      "username email avatarImage isAvatarImageSet _id"
    );
    return res.json(user?.friends || []);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getPendingRequests = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "receivedRequests",
      "username email avatarImage isAvatarImageSet _id"
    );
    return res.json(user?.receivedRequests || []);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getExploreUsers = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Exclude self, already friends, sent requests, and received requests
    const excludedIds = [
      userId,
      ...(user.friends || []),
      ...(user.sentRequests || []),
      ...(user.receivedRequests || []),
    ];

    const users = await User.find({ _id: { $nin: excludedIds } }).select([
      "email",
      "username",
      "avatarImage",
      "isAvatarImageSet",
      "_id",
    ]);

    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
