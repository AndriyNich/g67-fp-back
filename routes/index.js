const { authRouter } = require("./auth");
const { friendsRouter } = require("./friends");
const { newsRouter } = require("./news");
const { noticesRouter } = require("./notices");
const { petsRouter } = require("./pets");

module.exports = {
  authRouter,
  friendsRouter,
  newsRouter,
  noticesRouter,
  petsRouter,
};
