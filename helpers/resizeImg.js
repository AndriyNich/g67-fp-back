const Jimp = require("jimp");

const HttpError = require("./HttpError");

const resizeImg = async (file, sizeX, sizeY) => {
  try {
    const result = await Jimp.read(file);
    await result.resize(sizeX, sizeY).quality(75).writeAsync(file);
  } catch (error) {
    throw HttpError(415, error.message);
  }
};

module.exports = resizeImg;
