import Post from "../models/post_model.js";
import cloudinary from "cloudinary";
import ErrHandler from "../middlewares/err_handler.js";
import User from "../models/user_model.js";

// // create a post
export const createPost = async (req, res, next) => {
  try {
    const { desc, media, mediaType } = req.body;

    if (!desc && !media) {
      return next(new ErrHandler(400, "Please fill any field!"));
    }

    let mediaVal;
    if (media) {
      if (mediaType === "photo") {
        mediaVal = await cloudinary.v2.uploader.upload(media, {
          folder: "social_verse/posts/photos",
        });
      } else if (mediaType === "video") {
        mediaVal = await cloudinary.v2.uploader.upload(media, {
          folder: "social_verse/posts/videos",
          resource_type: "video",
          chunk_size: 6000000,
        });
      } else {
        return next(new ErrHandler(400, "Invalid media type"));
      }
    }

    const post = await Post.create({
      userId: req.user._id,
      description: desc,
      media: {
        mediaId: media ? mediaVal.public_id : "",
        mediaUrl: media ? mediaVal.secure_url : "",
      },
      mediaType: media ? mediaType : "",
    });

    res.status(200).send(post);
  } catch (error) {
    return next(error);
  }
};

// get a post details
export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(new ErrHandler(404, "Post not found!"));
    }
    res.status(200).send(post);
  } catch (error) {
    return next(error);
  }
};

// get all posts
export const getAllPosts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const skip = (page - 1) * limit;

  try {
    const posts = await Post.find()
      .populate("userId", "_id name profilePic")
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    });
  } catch (error) {
    return next(error);
  }
};

// get all posts for admin dashboard
export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    return next(error);
  }
};

// get my all posts
export const getAllPostsByUser = async (req, res, next) => {
  try {
    const posts = await Post.find({ userId: req.params.userId }).sort(
      "-createdAt"
    );
    res.status(200).send(posts);
  } catch (error) {
    return next(error);
  }
};

// get following user's posts
export const getFollowingUserPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ userId: { $in: req.user.followings } })
      .populate("userId", "_id name profilePic")
      .sort("-createdAt");

    if (!posts) {
      return next(new ErrHandler(404, "Posts not found!"));
    }
    res.status(200).send(posts);
  } catch (error) {
    return next(error);
  }
};

export const likeDislikePost = async (req, res, next) => {
  try {
    const { postId, userId, action } = req.body;

    const post = await Post.findById(postId).populate(
      "userId",
      "_id name profilePic"
    );

    if (action === "like") {
      post.likes.push(userId);
    } else {
      post.likes.pull(userId);
    }

    await post.save();
    res.status(200).send(post);
  } catch (error) {
    return next(error);
  }
};

// delete post
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    const user = await User.findById(req.params.userId);

    if (
      user.role === "admin" ||
      post.userId.toString() === user._id.toString()
    ) {
      await post.deleteOne();
      if (post.media && post.media.mediaId) {
        await cloudinary.v2.uploader.destroy(post.media.mediaId);
      }
      res.status(200).send("Post has been deleted!");
    }
  } catch (error) {
    return next(error);
  }
};
