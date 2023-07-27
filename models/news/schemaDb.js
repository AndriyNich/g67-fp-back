const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../../helpers');

const newsSchema = new Schema(
  {
    imgUrl: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

newsSchema.post('save', handleMongooseError);

const News = model('news', newsSchema);

module.exports = News;
