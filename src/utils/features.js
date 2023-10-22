import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import User from "@/models/user";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "NextTodo"
    });

    console.log(`MongoDB connected to ${connection.host} successfully.`);

    connection.on('error', (err) => {
      console.log(`MongoDB connection error. ${err}`);
      process.exit();
    })
  } catch (error) {
    console.error(`MongoDB connection failed! ${error}`)
  }
}

export const cookieSetter = (res, token, set) => {
  res.cookies.set("token", set ? token : "", {
    path: "/",
    httpOnly: true,
    maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0
  })
}

export const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET)
}

export const checkAuth = async (req) => {
  const token = req.cookies.get("token")?.value || "";

  if (token === "")
    return null;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return await User.findById(decoded._id);
}