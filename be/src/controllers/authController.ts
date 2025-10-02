import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import authService from "../services/authService";
import jwtUtil from "../utils/jwt";

class AuthController {
  register = catchAsync(async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    const result = await authService.register({ name, email, password, role });
    return jwtUtil.sendTokenResponse(res, 201, result.token, result.user);
  });

  login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    return jwtUtil.sendTokenResponse(res, 200, result.token, result.user);
  });

  logout = catchAsync(async (req: Request, res: Response) => {
    jwtUtil.clearTokenCookie(res);
    return res.json({
      success: true,
      message: "User logged out successfully",
    });
  });
}

export default new AuthController();
