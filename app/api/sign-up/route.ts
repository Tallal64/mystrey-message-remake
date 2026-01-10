import { ApiResponse } from "@/helper/ApiResponse";
import { asyncHandler } from "@/helper/asyncHandler";
import { SendEmailVerification } from "@/helper/sendEmailVerification";
import dbConnect from "@/db/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcrypt";

export const POST = asyncHandler(async (req: Request) => {
  await dbConnect();

  const { username, email, password } = await req.json();

  const userExistWithUsername = await UserModel.findOne({
    username,
    isVerified: true,
  });

  if (userExistWithUsername) {
    return ApiResponse(
      false,
      "User already exists with this name and is also verified",
      400
    );
  }

  const userExistWithEmail = await UserModel.findOne({ email });

  const verifyCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP

  const verifyCodeExpiry = new Date(); // verifyCodeExpiry
  verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);

  const hashPassword = await bcrypt.hash(password, 10); // hashing the password

  if (userExistWithEmail) {
    if (userExistWithEmail.isVerified) {
      return ApiResponse(
        false,
        "User already exists with this email and is also verified ",
        400
      );
    } else {
      userExistWithEmail.password = hashPassword;
      userExistWithEmail.verifyCode = verifyCode;
      userExistWithEmail.verifyCodeExpiry = verifyCodeExpiry;

      await userExistWithEmail.save();
    }
  } else {
    // create a new user from scratch
    const user = new UserModel({
      username,
      email,
      password: hashPassword,
      isAcceptingMessage: true,
      isVerified: false,
      verifyCode,
      verifyCodeExpiry,
      messages: [],
    });

    await user.save();
  }

  // Email Verification
  const emailResponse = await SendEmailVerification({
    email,
    username,
    OTP: verifyCode,
  });

  if (!emailResponse.success) {
    return ApiResponse(false, emailResponse.message, 500);
  }

  return ApiResponse(
    true,
    "User registered successfully, please verify your email",
    200
  );
});
