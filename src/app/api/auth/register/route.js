import { asyncError, errorHandler } from "@/middlewares/error";
import User from "@/models/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export const POST = asyncError(async (req) => {
  const { name, email, password } = await req.json();
  if (!name || !email || !password)
    return errorHandler(400, "Please enter all fields")

  await connectDB();

  let user = await User.findOne({ email })
  if (user)
    return errorHandler(400, "User already registered with this email")

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  const token = generateToken(user._id);

  const response = NextResponse.json({
    message: "User created successfully",
    user,
    success: true
  }, { status: 201 });

  cookieSetter(response, token, true);
  return response;
});