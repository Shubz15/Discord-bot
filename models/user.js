import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        discordId: {
            type: String,
            required: true,
            unique: true,
        },

        username: {
            type: String,
            required: true,
        },

        avatar: {
            type: String,
            default: "",
        },

        xp: {
            type: Number,
            default: 0,
        },

        level: {
            type: Number,
            default: 1,
        },

        coins: {
            type: Number,
            default: 100,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);