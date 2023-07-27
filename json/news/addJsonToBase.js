const fs = require('fs').promises;
const path = require('path');

const { News } = require('../../models/news');

const newsPath = path.join(__dirname, 'newsList.json');

const addJsonToBase = async () => {
  const fileText = await fs.readFile(newsPath);
  const data = JSON.parse(fileText);
  await News.create(data);
};

module.exports = addJsonToBase;
