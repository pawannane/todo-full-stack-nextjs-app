import { asyncError, errorHandler } from "@/middlewares/error";
import User from "@/models/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

export const POST = asyncError(async (req) => {
  const { email, password } = await req.json();
  if (!email || !password)
    return errorHandler(400, "Please enter all fields")

  await connectDB();

  let user = await User.findOne({ email }).select("+password")
  if (!user)
    return errorHandler(400, "Invalid email")

  let validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return errorHandler(400, "Invalid password")

  const token = generateToken(user._id);

  const response = NextResponse.json({
    message: `Welcome back, ${user.name}`,
    success: true,
    user
  }, { status: 200 });

  cookieSetter(response, token, true);
  return response;
})