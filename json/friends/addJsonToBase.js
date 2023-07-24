const fs = require("fs").promises;
const path = require("path");

const { Friend } = require("../../models/friend");

const contactsPath = path.join(__dirname, "friendList.json");

const addJsonToBase = async () => {
  const fileText = await fs.readFile(contactsPath);
  console.log(fileText);
  const data = JSON.parse(fileText);
  console.log(data);

  await Friend.create(data);
};

module.exports = addJsonToBase;
