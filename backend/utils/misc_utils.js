import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const genToken = (id) => {
  return jwt.sign(id, process.env.jwt_key, {
    expiresIn: "3d",
  });
};

export const comparePass = (inputPass, dbPass) => {
  return bcrypt.compare(inputPass, dbPass);
};

export const getResetPasswordToken = () => {
  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return { resetToken, resetPasswordToken, resetPasswordExpire };
};
