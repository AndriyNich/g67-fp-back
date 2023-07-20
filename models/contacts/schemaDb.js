const { Schema, model } = require("mongoose");

const emailRegexp = require("../../constants");
const { handleMongooseError } = require("../../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "set email for contact"],
      mathc: emailRegexp,
    },
    phone: {
      type: String,
      default: "",
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
