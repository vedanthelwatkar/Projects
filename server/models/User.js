import mongoose from "mongoose";

const Userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
      default:"https://icons.iconarchive.com/icons/icons8/windows-8/128/Users-Name-icon.png",
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedUsers: {
      type: [String],
    },
    fromGoogle:{
      type:Boolean,
      default:false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", Userschema);
