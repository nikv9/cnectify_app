import User from "../models/user_model.js";
import cloudinary from "cloudinary";
import ErrHandler from "../middlewares/err_handler.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res, next) => {
  try {
    if (req.query.isAdmin === "true" && req.user.role === "admin") {
      const { userName, sort = "asc", page = 1, limit = 5 } = req.query;

      // searching
      const filter = userName
        ? { name: { $regex: userName, $options: "i" } } // case-insensitive
        : {};

      // sorting
      const sortOrder = sort === "asc" ? 1 : -1;

      // pagination
      const skip = (Number(page) - 1) * Number(limit);

      const users = await User.find(filter)
        .collation({ locale: "en", strength: 2 })
        .sort({ name: sortOrder })
        .skip(skip)
        .limit(Number(limit));

      const totalUsers = await User.countDocuments(filter);

      return res.status(200).json({
        users,
        totalUsers,
        currentPage: Number(page),
        totalPages: Math.ceil(totalUsers / limit),
      });
    }

    const currentUserId = req.query.userId;
    const userName = req.query.userName;
    const searchType = req.query.searchType;

    let filter = {};

    if (searchType === "userSuggestions") {
      filter._id = { $ne: currentUserId };
    } else if (searchType === "followers") {
      const currentUser = await User.findById(currentUserId).populate(
        "followers"
      );
      const followers = currentUser.followers.map((user) => user._id);
      filter._id = { $in: followers };
    } else {
      const currentUser = await User.findById(currentUserId).populate(
        "followings"
      );
      const followings = currentUser.followings.map((user) => user._id);
      filter._id = { $nin: [currentUserId, ...followings] };
    }

    if (userName) {
      filter.name = { $regex: userName, $options: "i" };
    }

    const users = await User.find(filter).sort({ _id: -1 });

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    let user;

    if (req.query.isAdmin === "true" && req.user.role === "admin") {
      user = await User.findById(req.params.id);
    } else {
      user = await User.findById(req.user._id)
        .populate("followings", "name profileImg")
        .populate("followers", "name profileImg");
    }

    if (!user) {
      return next(new ErrHandler(404, "User not found!"));
    }

    res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let { name, email, profileImg } = req.body;
    const newUserData = {
      name: name,
      email: email,
    };
    if (profileImg !== "") {
      const user = await User.findById(req.user._id);

      const imageId = user.profileImg.imgId;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(profileImg, {
        folder: "cnectify/profile_imgs",
      });

      newUserData.profileImg = {
        imgId: myCloud.public_id,
        imgUrl: myCloud.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
        profileImg,
      },
      newUserData,
      {
        new: true,
      }
    );
    if (!user) {
      return next(new ErrHandler(400, "user profile is not updated!"));
    }
    res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(new ErrHandler(404, "User not found!"));
    }

    if (user.profileImg && user.profileImg.imgId) {
      await cloudinary.v2.uploader.destroy(user.profileImg.imgId);
    }

    res.status(200).json("User is deleted!");
  } catch (error) {
    return next(error);
  }
};

export const createOrUpdateUser = async (req, res, next) => {
  try {
    const { id, name, email, password, role, profileImg } = req.body;

    let myCloud;
    let user;

    if (id) {
      user = await User.findById(id);
      if (!user) return next(new ErrHandler(404, "User not found for update!"));
    }

    if (profileImg && !profileImg.startsWith("https")) {
      if (user?.profileImg?.imgId) {
        await cloudinary.v2.uploader.destroy(user.profileImg.imgId);
      }

      myCloud = await cloudinary.v2.uploader.upload(profileImg, {
        folder: "cnectify/profile_imgs",
      });
    }

    const updateData = {
      name, // required
      email, // required
      ...(role && { role }), // optional
      ...(password && { password: await bcrypt.hash(password, 12) }), // optional
      ...(myCloud && {
        profileImg: {
          imgId: myCloud.public_id,
          imgUrl: myCloud.secure_url,
        },
      }), // optional
    };

    if (id) {
      user = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
    } else {
      user = await User.create(updateData);
    }

    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    return next(error);
  }
};

export const sendFollowReq = async (req, res, next) => {
  try {
    const { loggedinUserId, targetUserId } = req.body;

    if (loggedinUserId === targetUserId)
      return next(new ErrHandler(400, "You cannot follow yourself!"));

    const loggedinUser = await User.findById(loggedinUserId);
    const targetUser = await User.findById(targetUserId);

    // if already following
    if (loggedinUser.followings.includes(targetUserId))
      return res.status(400).json({ msg: "Already following this user." });

    // if already requested
    if (loggedinUser.followReqsSent.includes(targetUserId))
      return res.status(400).json({ msg: "Follow request already sent." });

    // add to both sides
    loggedinUser.followReqsSent.push(targetUserId);
    targetUser.followReqsReceived.push(loggedinUserId);

    await loggedinUser.save();
    await targetUser.save();

    res.status(200).json({ msg: "Follow request sent successfully." });
  } catch (error) {
    next(error);
  }
};

export const respondToFollowReq = async (req, res, next) => {
  try {
    const { loggedinUserId, targetUserId, action } = req.body;

    const loggedinUser = await User.findById(loggedinUserId);
    const requesterUser = await User.findById(targetUserId);

    if (action === "withdraw") {
      if (!loggedinUser.followReqsSent.includes(targetUserId))
        return res.status(400).json({ msg: "No follow request to withdraw." });

      loggedinUser.followReqsSent.pull(targetUserId);
      requesterUser.followReqsReceived.pull(loggedinUserId);

      await loggedinUser.save();
      await requesterUser.save();

      return res
        .status(200)
        .json({ msg: "Follow request withdrawn successfully." });
    }

    if (!loggedinUser.followReqsReceived.includes(targetUserId))
      return res.status(400).json({ msg: "No follow request from this user." });

    loggedinUser.followReqsReceived.pull(targetUserId);
    requesterUser.followReqsSent.pull(loggedinUserId);

    if (action === "accept") {
      loggedinUser.followers.push(targetUserId);
      requesterUser.followings.push(loggedinUserId);
    }

    await loggedinUser.save();
    await requesterUser.save();

    res.status(200).json({
      msg:
        action === "accept"
          ? "Follow request accepted."
          : "Follow request rejected.",
    });
  } catch (error) {
    next(error);
  }
};

export const getFollowReqs = async (req, res, next) => {
  try {
    const userId = req.query.userId;

    const user = await User.findById(userId)
      .populate("followReqsSent", "name profileImg")
      .populate("followReqsReceived", "name profileImg");

    res.status(200).json({
      reqSent: user.followReqsSent,
      reqReceived: user.followReqsReceived,
    });
  } catch (error) {
    next(error);
  }
};

export const manageFollowRelation = async (req, res, next) => {
  try {
    const { loggedinUserId, targetUserId, action } = req.body;

    const loggedinUser = await User.findById(loggedinUserId);
    const targetUser = await User.findById(targetUserId);

    if (!loggedinUser || !targetUser)
      return next(new ErrHandler(404, "User not found."));

    if (action === "removeFollowing") {
      if (!loggedinUser.followings.includes(targetUserId))
        return next(new ErrHandler(400, "You are not following this user."));

      loggedinUser.followings.pull(targetUserId);
      targetUser.followers.pull(loggedinUserId);

      await loggedinUser.save();
      await targetUser.save();

      return res.status(200).json({ msg: "Unfollowed user successfully." });
    }

    if (action === "removeFollower") {
      if (!loggedinUser.followers.includes(targetUserId))
        return next(new ErrHandler(400, "User is not your follower."));

      loggedinUser.followers.pull(targetUserId);
      targetUser.followings.pull(loggedinUserId);

      await loggedinUser.save();
      await targetUser.save();

      return res.status(200).json({ msg: "Follower removed successfully." });
    }

    return next(new ErrHandler(400, "Invalid action."));
  } catch (error) {
    next(error);
  }
};
