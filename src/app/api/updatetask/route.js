import { asyncError, errorHandler } from "@/middlewares/error";
import Task from "@/models/task";
import { checkAuth, connectDB } from "@/utils/features";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const PUT = asyncError(async (req) => {

  await connectDB();

  const user = await checkAuth(req)
  if (!user) return errorHandler(401, "Login first")

  const taskId = req.url.split('?')[1];
  const checkId = mongoose.Types.ObjectId.isValid(taskId);
  if (checkId === false) return errorHandler(404, "Invalid task id");

  const task = await Task.findById(taskId);
  if (!task) return errorHandler(404, "Task not found");

  task.isCompleted = !task.isCompleted;
  await task.save();

  const response = NextResponse.json({
    message: "Task updated successfully",
    success: true
  }, { status: 200 });

  return response;
})