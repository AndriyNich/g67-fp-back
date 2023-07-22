const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../../helpers');

const petSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    birthday: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    comments: {
      type: String,
      default: '',
    },
    avatarURL: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

petSchema.post('save', handleMongooseError);

const Pet = model('pet', petSchema);

module.exports = Pet;
