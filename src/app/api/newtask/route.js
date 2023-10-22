import Task from "@/models/task";
import { checkAuth, connectDB } from "@/utils/features"
import { asyncError, errorHandler } from "@/middlewares/error"
import { NextResponse } from "next/server";

export const POST = asyncError(async (req) => {
  await connectDB();

  const user = await checkAuth(req)
  if (!user) return errorHandler(401, "Login first")


  const { title, description } = await req.json();

  const task = await Task.create({
    title,
    description,
    user: user._id
  });

  return NextResponse.json({
    message: "Task added successfully",
    task,
    success: true
  })

})