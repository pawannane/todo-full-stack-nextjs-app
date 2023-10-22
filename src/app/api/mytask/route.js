import Task from "@/models/task";
import { checkAuth, connectDB } from "@/utils/features"
import { asyncError, errorHandler } from "@/middlewares/error"
import { NextResponse } from "next/server";

export const GET = asyncError(async (req) => {
  await connectDB();

  const user = await checkAuth(req)

  if (!user) return errorHandler(401, "Login first")

  const tasks = await Task.find({ user: user._id });

  return NextResponse.json({
    tasks,
    success: true
  })

})