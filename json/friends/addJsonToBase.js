const fs = require('fs').promises;
const path = require('path');

const { Friend } = require('../../models/friend');

const friendsPath = path.join(__dirname, 'friendList.json');

const addJsonToBase = async () => {
  const fileText = await fs.readFile(friendsPath);
  const data = JSON.parse(fileText);
  await Friend.create(data);
};

module.exports = addJsonToBase;
