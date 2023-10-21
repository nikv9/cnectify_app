import Post from "../models/post_model.js";
import cloudinary from "cloudinary";
import ErrorHandler from "../middlewares/error_handler.js";

// // create a post
export const createPost = async (req, res, next) => {
  try {
    const { desc, media, mediaType } = req.body;

    if (!desc && !media) {
      return next(new ErrorHandler(400, "Please fill any field!"));
    }

    let mediaVal;
    if (media) {
      if (mediaType === "photo") {
        mediaVal = await cloudinary.v2.uploader.upload(media, {
          folder: "posts/photos",
        });
      } else if (mediaType === "video") {
        mediaVal = await cloudinary.v2.uploader.upload(media, {
          folder: "posts/videos",
        });
      } else {
        return next(new ErrorHandler(400, "Invalid media type"));
      }
    }

    // console.log(mediaVal);

    const post = await Post.create({
      userId: req.user._id,
      description: desc,
      mediaType: media ? mediaType : "",
      media: {
        public_id: media ? mediaVal.public_id : "",
        url: media ? mediaVal.secure_url : "",
      },
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
      return next(new ErrorHandler(404, "Post not found!"));
    }
    res.status(200).send(post);
  } catch (error) {
    return next(error);
  }
};

// get all posts from db
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("userId", "_id name profilePic")
      .populate("comments.userId", "_id name")
      .sort("-createdAt");

    if (!posts) {
      return next(new ErrorHandler(404, "Posts not found!"));
    }
    res.status(200).send(posts);
  } catch (error) {
    return next(error);
  }
};

// get my all posts
export const getMyAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ userId: req.user._id }).sort("-createdAt");

    if (!posts) {
      return next(new ErrorHandler(404, "Posts not found!"));
    }
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
      .populate("comments.userId", "_id name")
      .sort("-createdAt");

    if (!posts) {
      return next(new ErrorHandler(404, "Posts not found!"));
    }
    res.status(200).send(posts);
  } catch (error) {
    return next(error);
  }
};

// like the post
export const likePost = async (req, res, next) => {
  try {
    const postId = req.body.postId;
    const userId = req.user._id;

    const post = await Post.findById(postId).populate(
      "userId",
      "_id name profilePic"
    );

    if (!post) {
      return next(new ErrorHandler(404, "Post not found"));
    }
    if (post.likes.includes(userId)) {
      return next(new ErrorHandler(400, "You have already liked this post!"));
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).send(post);
  } catch (error) {
    return next(error);
  }
};

// dislike the post
export const dislikePost = async (req, res, next) => {
  try {
    const postId = req.body.postId;
    const userId = req.user._id;

    const post = await Post.findById(postId).populate(
      "userId",
      "_id name profilePic"
    );

    if (!post) {
      return next(new ErrorHandler(404, "Post not found"));
    }
    if (!post.likes.includes(userId)) {
      return next(
        new ErrorHandler(400, "You have already disliked this post!")
      );
    }

    post.likes.pull(userId);
    await post.save();

    res.status(200).send(post);
  } catch (error) {
    return next(error);
  }
};

// delete my post
export const deleteMyPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    // we are using toString() bcuz it would return id as a object
    if (post.userId.toString() !== req.user._id.toString()) {
      // console.log(post.userId);
      return next(new ErrorHandler(400, "You can delete only your post!"));
    }
    await post.deleteOne();
    res.status(200).send("Post has been deleted!");
  } catch (error) {
    return next(error);
  }
};

// comment on post
export const commentOnPost = async (req, res, next) => {
  try {
    if (!req.body.comment) {
      return next(new ErrorHandler(400, "Please add comment!"));
    }
    const post = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: {
          comments: { comment: req.body.comment, userId: req.user._id },
        },
      },
      {
        new: true,
      }
    )
      .populate("userId", "_id name profilePic")
      .populate("comments.userId", "_id name profilePic");

    res.status(200).send(post);
  } catch (error) {
    return next(error);
  }
};
