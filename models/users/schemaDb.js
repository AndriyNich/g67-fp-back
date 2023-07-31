const { Schema, model } = require("mongoose");

const { emailRegexp } = require("../../constants");

const {
  handleMongooseError,
  handleMongooseCheckDate,
} = require("../../helpers");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    phone: {
      type: String,
      default: "",
    },
    birthday: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      default: "",
    },
    favorites: {
      type: Array,
      default: [],
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", handleMongooseCheckDate);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
