import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    discordId: {
      type: String,
      required: true,
    },

    originalUrl: {
      type: String,
      required: true,
    },

    shortId: {
      type: String,
      required: true,
      unique: true,
    },

    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Url", urlSchema);