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
    res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

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
        .json({ user: loggedinUser, msg: "User unfollowed successfully" });
    } else {
      loggedinUser.followings.push(targetUserId);
      await loggedinUser.save();

      targetUser.followers.push(loggedinUserId);
      await targetUser.save();

      res
        .status(200)
        .json({ user: loggedinUser, msg: "User followed successfully" });
    }
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
