import { UserModel } from "../../../pkg/Model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const findUser = await UserModel.findOne({ email });
    if (findUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        email,
        fullName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return res
      .status(201)
      .json({ message: "user created successfully", token });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", log: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await UserModel.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "Email does not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    const token = jwt.sign(
      {
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    res.status(200).json({ message: "user logged in successfully", token });
  } catch (err) {
    res.status(500).json({ message: "Server Error", log: err.message });
  }
};

// export const forgotPassword = async (req, res) => {
//   try {
//     const user = await UserModel.findOne({ email: req.body.email });

//     if (!user) {
//       return res.status(404).json({ message: "User does not exist" });
//     }

//     const resetToken = crypto.randomBytes(32).toString("hex");
//     const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

//     user.passwordResetToken = hashedToken;
//     user.passwordResetExpired = Date.now() + 30 * 60 * 1000;

//     await user.save({ validateBeforeSave: false });

//     const resetUrl = `${req.protocol}://${req.get("host")}/resetPassword/${resetToken}`;
//     const message = `You have requested to reset your password. Please click on the link to reset your password: ${resetUrl}`;

//     // await sendMailGun({
//     //   email: user.email,
//     //   subject: "Your password reset token (30 min valid)",
//     //   message: message,
//     // });

//     await sendEmail({
//       email: user.email,
//       subject: "Your password reset token (30 min valid)",
//       message: message,
//     });

//     res.status(200).json({
//       status: "success",
//       message: "Token sent to email!",
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send(err);
//   }
// };

// export const resetPassword = async (req, res) => {
//   try {
//     const userToken = req.params.token;
//     if (!userToken) {
//       return res.status(400).json({ message: 'Token is missing' });
//     }

//     const hashedToken = crypto.createHash('sha256').update(userToken).digest('hex');

//     const user = await UserModel.findOne({
//       passwordResetToken: hashedToken,
//       passwordResetExpired: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({ message: 'Token is invalid or expired' });
//     }

//     user.password = req.body.password;
//     user.passwordResetExpired = undefined;
//     user.passwordResetToken = undefined;

//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRES,
//     });

//     res.cookie('jwt', token, {
//       expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
//       secure: false,
//       httpOnly: true,
//     });

//     res.status(201).json({
//       status: 'success',
//       token,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send(err);
//   }
// };


