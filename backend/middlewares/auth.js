import jwt from "jsonwebtoken";
import User from "../models/user_model.js";

export const authenticated = async (req, res, next) => {
  try {
    const token = req.cookies.tokenId;
    // console.log(token);
    if (!token) {
      return res.status(400).send("token not found");
    }
    const decode = jwt.verify(token, process.env.jwt_key);
    // console.log(decode);
    req.user = await User.findById(decode.id);
    next();
  } catch (error) {
    return next(error);
  }
};

// alternative for authToken function (for this you have to add authorization headers for bearer token in protected apis on frontend)
// export const authenticated = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(400).send("Token not found");
//     }
//     const token = authHeader.split(" ")[1];
//     const decode = jwt.verify(token, process.env.jwt_key);
//     req.user = await User.findById(decode.id);
//     next();
//   } catch (error) {
//   return next(error);
//   }
// }

export const authRole = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return res.status(400).send("only admin can do that!");
      }
      next();
    } catch (error) {
      return next(error);
    }
  };
};
