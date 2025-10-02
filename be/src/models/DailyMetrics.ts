import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";

export interface IDailyMetrics extends Document {
  _id: mongoose.Types.ObjectId;
  date: Date;
  pos_revenue: number;
  eatclub_revenue: number;
  labour_cost: number;
  createdAt: Date;
  updatedAt: Date;
}

const DailyMetricsSchema = new Schema<IDailyMetrics>(
  {
    date: {
      type: Date,
      required: [true, "Date is required"],
      unique: true,
    },
    pos_revenue: {
      type: Number,
      required: [true, "POS revenue is required"],
      min: [0, "POS revenue cannot be negative"],
      default: 0,
    },
    eatclub_revenue: {
      type: Number,
      required: [true, "EatClub revenue is required"],
      min: [0, "EatClub revenue cannot be negative"],
      default: 0,
    },
    labour_cost: {
      type: Number,
      required: [true, "Labour cost is required"],
      min: [0, "Labour cost cannot be negative"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

DailyMetricsSchema.pre<IDailyMetrics>("save", function (next) {
  if (this.isModified("date")) {
    const normalizedDate = new Date(this.date);
    // Use UTC methods to avoid timezone shifts
    normalizedDate.setUTCHours(0, 0, 0, 0);
    this.date = normalizedDate;
  }
  next();
});

export const DailyMetrics = mongoose.model<IDailyMetrics>(
  "DailyMetrics",
  DailyMetricsSchema
);
