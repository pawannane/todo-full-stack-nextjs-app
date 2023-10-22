import { asyncError, errorHandler } from "@/middlewares/error";
import { checkAuth, connectDB } from "@/utils/features";
import { NextResponse } from "next/server";

export const GET = asyncError(async (req) => {
  await connectDB();

  const user = await checkAuth(req)

  if (!user) return errorHandler(401, "Login first")

  const response = NextResponse.json({
    user,
    success: true
  }, { status: 200 });

  return response;
})