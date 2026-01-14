import { ApiResponse } from "@/helper/ApiResponse";
import { asyncHandler } from "@/helper/asyncHandler";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const POST = asyncHandler(async (req: Request) => {
  await dbConnect();

  const { username, code } = await req.json();
  const decodedUsername = decodeURIComponent(username);

  const user = await UserModel.findOne({
    username: decodedUsername,
  });

  if (!user) {
    return ApiResponse(false, "User not found", 404);
  }

  const isCodeValid = user.verifyCode === code;
  const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

  if (isCodeValid && isCodeNotExpired) {
    user.isVerified = true;
    await user.save();
    return ApiResponse(true, "Account verified", 200);
  } else if (!isCodeNotExpired) {
    return ApiResponse(false, "Code expired", 400);
  } else {
    return ApiResponse(false, "Invalid code", 400);
  }
});
