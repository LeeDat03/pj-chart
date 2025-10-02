import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";
import AppError from "../utils/appError";
import { UserRole } from "../models/User";

export const restrictTo = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError(
        "You are not logged in. Please log in to get access.",
        401
      );
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError(
        "You do not have permission to perform this action",
        403
      );
    }

    next();
  };
};

export const adminOnly = restrictTo(UserRole.ADMIN);
