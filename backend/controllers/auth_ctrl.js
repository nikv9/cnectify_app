import {
  comparePass,
  genToken,
  getResetPasswordToken,
} from "../utils/index.js";
import bcrypt from "bcryptjs";
import cloudinary from "cloudinary";
import User from "../models/user_model.js";
import ErrHandler from "../middlewares/err_handler.js";
import { resetPassMail } from "../utils/send_email.js";
import crypto from "crypto";

// signup user
export const signupUser = async (req, res, next) => {
  try {
    const { name, email, password, profileImg } = req.body;

    let myCloud;
    if (profileImg) {
      myCloud = await cloudinary.v2.uploader.upload(profileImg, {
        folder: "social_verse/profile_imgs",
      });
    }

    const hashPass = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name,
      email: email,
      password: hashPass,
      profileImg: {
        imgId: profileImg ? myCloud.public_id : "",
        imgUrl: profileImg ? myCloud.secure_url : "",
      },
    });

    // generate token
    const tokenId = genToken({ id: user._id });

    res.status(200).send({ ...user._doc, tokenId });
  } catch (error) {
    return next(error);
  }
};

// signin user
export const signinUser = async (req, res, next) => {
  try {
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;

    if (!inputEmail || !inputPassword) {
      return next(new ErrHandler(400, "Please fill all the fields!"));
    }

    const userExist = await User.findOne({ email: inputEmail });
    if (!userExist) {
      return next(new ErrHandler(401, "Invalid email or password!"));
    }
    const userPassword = await comparePass(inputPassword, userExist.password);

    if (!userPassword) {
      return next(new ErrHandler(401, "Invalid email or password!!"));
    }
    // generate token
    const tokenId = genToken({ id: userExist._id });

    //  prevent password to send in response
    const { password, ...user } = userExist._doc;
    res.status(200).send({ ...user, tokenId });
  } catch (error) {
    return next(error);
  }
};

// signin user with google
export const signinWithGoogle = async (req, res, next) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      const tokenId = genToken({ id: userExist._id });

      res.status(200).send({ ...userExist._doc, tokenId });
    } else {
      const newUser = await User.create({
        ...req.body,
        fromGoogle: true,
      });

      const tokenId = genToken({ id: newUser._id });

      res.status(200).send({ ...newUser._doc, tokenId });
    }
  } catch (error) {
    return next(error);
  }
};

// logout user
export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("tokenId");
    res.status(200).send("user logged out!");
  } catch (error) {
    return next(error);
  }
};

// forgot password
export const forgotPass = async (req, res, next) => {
  let user;

  try {
    user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrHandler(404, "user not found"));
    }

    // get reset password token
    // const resetToken = getResetPasswordToken();
    const { resetToken, resetPasswordToken, resetPasswordExpire } =
      getResetPasswordToken();

    // Update user object with the new reset token data
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = resetPasswordExpire;

    await user.save({ validateBeforeSave: false });

    // for deploying
    // const resetPassUrl = `${req.protocol}://${req.get(
    //   "host"
    // )}/reset-pass/${resetToken}`;

    // if you change your url then you have to some changes in mail-msg that can help code to run better
    // for testing
    const resetPassUrl = `${process.env.client_url}/reset_pass/${resetToken}`;

    const mailMsg = `<h1> Your reset password token is :- </h1> 
       <p> ${resetPassUrl} </p>
     <p> If you have not requested this email then please ignore it! </p>`;

    await resetPassMail({
      email: user.email,
      subject: `Password recovery mail from ecommerce app`,
      html: mailMsg,
    });
    res.status(200).send(`email send to ${user.email} successfully!`);
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(error);
  }
};

// reset password
export const resetPass = async (req, res, next) => {
  try {
    // creating token hash
    const resetToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new ErrHandler(
          400,
          "reset password token is invalid or has been expired!"
        )
      );
    }
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrHandler(400, "password does not match!"));
    }

    const hashPass = await bcrypt.hash(req.body.password, 12);

    user.password = hashPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

// change password
export const changePass = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    const isPassMatched = await comparePass(req.body.oldPass, user.password);

    if (!isPassMatched) {
      return next(new ErrHandler(400, "Old password is incorrect"));
    }

    if (req.body.newPass.length <= 3) {
      return next(
        new ErrHandler(400, "password must be at least 4 charactes!")
      );
    }
    if (req.body.newPass !== req.body.confirmPass) {
      return next(new ErrHandler(400, "password does not match"));
    }
    const hashPass = await bcrypt.hash(req.body.newPass, 12);

    user.password = hashPass;
    await user.save();

    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};
