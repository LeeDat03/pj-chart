import jwt from "jsonwebtoken";
import { Response } from "express";

interface JWTPayload {
  id: string;
  email: string;
  role: string;
}

class JWTUtil {
  private readonly secret: string;
  private readonly expiresIn: number;
  private readonly cookieExpire: number;
  private readonly cookieName: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || "secret-key-here";
    this.expiresIn = parseInt(process.env.JWT_EXPIRE || "1");
    this.cookieExpire = parseInt(process.env.JWT_COOKIE_EXPIRE || "1");
    this.cookieName = process.env.JWT_COOKIE_NAME || "pj-chart-token";
  }

  generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, this.secret, {
      algorithm: "HS256",
      expiresIn: this.expiresIn * 24 * 60 * 60 * 1000,
    });
  }

  verifyToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, this.secret) as JWTPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }

  sendTokenResponse(
    res: Response,
    statusCode: number,
    token: string,
    user: any
  ): Response {
    const options = {
      expires: new Date(Date.now() + this.cookieExpire * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
    };

    return res.status(statusCode).cookie(this.cookieName, token, options).json({
      success: true,
      token,
      data: user,
    });
  }

  clearTokenCookie(res: Response): void {
    res.cookie(this.cookieName, "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
  }

  extractToken(req: any): string | null {
    let token = null;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    return token;
  }
}

export default new JWTUtil();
