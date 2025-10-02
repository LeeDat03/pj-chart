import { Request, Response, NextFunction } from "express";
import jwtUtil from "../utils/jwt";
import authService from "../services/authService";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const protect = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | null = null;

    if (
      req.cookies &&
      req.cookies[process.env.JWT_COOKIE_NAME || "pj-chart-token"]
    ) {
      token = req.cookies[process.env.JWT_COOKIE_NAME || "pj-chart-token"];
    }

    if (!token) {
      throw new AppError(
        "You are not logged in. Please log in to get access.",
        401
      );
    }

    const decoded = jwtUtil.verifyToken(token);
    if (!decoded) {
      throw new AppError("Invalid token. Please log in again.", 401);
    }

    const user = await authService.getUserById(decoded.id);
    if (!user) {
      throw new AppError(
        "The user belonging to this token no longer exists.",
        401
      );
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    next();
  }
);
