const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../../helpers');
const { categoryNoticeList, sexPetList } = require('../../constants');

const noticeSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    category: {
      type: String,
      enum: categoryNoticeList,
      required: [true, 'Category is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    birthday: {
      type: String,
      default: '',
      required: [true, 'Birthday is required'],
    },
    type: {
      type: String,
      required: [true, 'Type is required'],
    },
    avatarURL: {
      type: String,
      default: '',
    },
    title: {
      type: String,
    },
    sex: {
      type: String,
      enum: sexPetList,
      required: [true, 'Sex is required'],
    },
    price: {
      type: Number,
      default: 0,
    },
    comments: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

noticeSchema.post('save', handleMongooseError);

const Notice = model('notice', noticeSchema);

module.exports = Notice;
