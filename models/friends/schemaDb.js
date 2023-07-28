const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../../helpers");

const friendSchema = new Schema(
  {
    title: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
    addressUrl: {
      type: String,
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    workDays: {
      type: Array,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

friendSchema.post("save", handleMongooseError);

const Friend = model("friend", friendSchema);

module.exports = Friend;
