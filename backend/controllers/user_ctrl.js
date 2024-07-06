import User from "../models/user_model.js";
import { contactMail } from "../utils/send_email.js";
import cloudinary from "cloudinary";
import ErrHandler from "../middlewares/err_handler.js";

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

// delete my account
export const deleteMyProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
      return next(new ErrHandler(400, "user is not deleted!"));
    }
    res.status(200).send("user is deleted!");
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

// get friends
export const getFriends = async (req, res, next) => {
  try {
    const currentUserId = req.query.userId;
    const userName = req.query.userName;

    const currentUser = await User.findById(currentUserId).populate(
      "followings"
    );
    const followings = currentUser.followings.map((user) => user._id);

    let filter = {
      _id: { $nin: [currentUserId, ...followings] },
    };

    if (userName) {
      filter = {
        ...filter,
        name: { $regex: userName, $options: "i" },
      };
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

// search users
export const getUserBySearch = async (req, res, next) => {
  try {
    const userPattern = req.query.search
      ? {
          $or: [
            {
              name: { $regex: req.query.search, $options: "i" },
            },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const user = await User.find(userPattern)
      .find({
        _id: { $ne: req.user._id },
      })
      .select("_id name profileImg");

    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

// contact-us
export const contactUs = async (req, res, next) => {
  try {
    const { name, email, msg } = req.body;

    if (!name || !email || !msg) {
      return next(new ErrHandler(400, "Please enter all fields"));
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new ErrHandler(404, "user not found"));
    }

    await contactMail({ name, email, msg });
    res.status(200).send("Your message sent successfully!");
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
    const query = req.query.new;
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find().select("-password");
    if (!users) {
      return next(new ErrHandler(404, "users are not found!"));
    }
    res.status(200).send(users);
  } catch (error) {
    return next(error);
  }
};

// delete user profile
export const deleteUserProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(new ErrHandler(400, "user is not deleted!"));
    }
    const userPic = user.profileImg.public_id;
    await cloudinary.v2.uploader.destroy(userPic);
    res.status(200).send("user is deleted!");
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
