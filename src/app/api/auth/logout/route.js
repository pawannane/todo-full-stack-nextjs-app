import { asyncError } from "@/middlewares/error";
import { cookieSetter } from "@/utils/features";
import { NextResponse } from "next/server";

export const GET = asyncError(async (req) => {
  const response = NextResponse.json({
    message: "Logout successful!",
    success: true
  }, { status: 200 });

  cookieSetter(response, null, false);
  return response;
})