const multer = require("multer");
const path = require("path");
const { pathToFile } = require("../constants");

const tempDir = path.join(__dirname, "../", pathToFile.TEMP);

const multerConfig = multer.diskStorage({
  destination: tempDir,
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
