import User from "../models/user_model.js";
import cloudinary from "cloudinary";
import ErrHandler from "../middlewares/err_handler.js";
import bcrypt from "bcryptjs";

// get my profile details
export const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new ErrHandler(404, "user is not found!"));
    }
    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

// get profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("followings", "name profileImg")
      .populate("followers", "name profileImg");
    if (!user) {
      return next(new ErrHandler(404, "user not found!"));
    }
    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

// update my profile details
export const updateMyProfile = async (req, res, next) => {
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
        folder: "social_verse/profile_imgs",
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
    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

// get users by search methods
export const getUsers = async (req, res, next) => {
  try {
    const currentUserId = req.query.userId;
    const userName = req.query.userName;
    const searchMethod = req.query.searchMethod;

    let filter = {};

    if (searchMethod === "searchingFriends") {
      filter._id = { $ne: currentUserId };
    } else if (searchMethod === "followers") {
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

    res.status(200).send(users);
  } catch (error) {
    return next(error);
  }
};

// follow/unfollow a user
export const followUnfollowUser = async (req, res, next) => {
  try {
    const { loggedinUserId, targetUserId } = req.body;

    const loggedinUser = await User.findById(loggedinUserId);
    const targetUser = await User.findById(targetUserId);

    if (loggedinUser.followings.includes(targetUserId)) {
      loggedinUser.followings.pull(targetUserId);
      await loggedinUser.save();

      targetUser.followers.pull(loggedinUserId);
      await targetUser.save();

      res
        .status(200)
        .send({ user: loggedinUser, msg: "User unfollowed successfully" });
    } else {
      loggedinUser.followings.push(targetUserId);
      await loggedinUser.save();

      targetUser.followers.push(loggedinUserId);
      await targetUser.save();

      res
        .status(200)
        .send({ user: loggedinUser, msg: "User followed successfully" });
    }
  } catch (error) {
    return next(error);
  }
};

// (b) admin role

// get a user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new ErrHandler(404, "user is not found!"));
    }
    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

// get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ _id: -1 });
    res.status(200).send(users);
  } catch (error) {
    return next(error);
  }
};

// delete user profile
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

// update user role
export const updateUserRole = async (req, res, next) => {
  console.log(req);
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        role: req.body.role,
      },
      {
        new: true,
      }
    );
    if (!user) {
      return next(new ErrHandler(400, "user role is not updated!"));
    }

    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

//create or update user
export const createOrUpdateUser = async (req, res, next) => {
  try {
    const { id, name, email, password, role, profileImg } = req.body;

    let myCloud;
    if (profileImg) {
      myCloud = await cloudinary.v2.uploader.upload(profileImg, {
        folder: "social_verse/profile_imgs",
      });
    }

    // Prepare update fields
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (password) {
      updateData.password = await bcrypt.hash(password, 12);
    }
    if (profileImg) {
      updateData.profileImg = {
        imgId: myCloud.public_id,
        imgUrl: myCloud.secure_url,
      };
    }

    let user;
    console.log("hello", id);
    if (id) {
      // Update existing user
      user = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return next(new ErrHandler(404, "User not found for update!"));
      }
    } else {
      // Create new user
      user = await User.create(updateData);
    }

    // prevent password from being sent
    const { password: pass, ...rest } = user._doc;

    res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};
