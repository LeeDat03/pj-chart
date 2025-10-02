import { User, UserRole, IUser } from "../models/User";
import jwtUtil from "../utils/jwt";
import AppError from "../utils/appError";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

interface LoginInput {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt?: Date;
  };
}

class AuthService {
  async register(data: RegisterInput): Promise<AuthResponse> {
    const { name, email, password, role } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("User with this email already exists", 400);
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || UserRole.ADMIN,
    });

    const token = jwtUtil.generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  }

  async login(data: LoginInput): Promise<AuthResponse> {
    const { email, password } = data;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = jwtUtil.generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getUserById(userId: string): Promise<IUser | null> {
    const user = await User.findById(userId);
    return user;
  }

  async verifyTokenAndGetUser(token: string): Promise<IUser | null> {
    const payload = jwtUtil.verifyToken(token);
    if (!payload) {
      throw new AppError("Invalid token", 401);
    }

    const user = await User.findById(payload.id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}

export default new AuthService();
