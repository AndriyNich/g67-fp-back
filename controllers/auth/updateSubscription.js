const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
    select: "email subscription",
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = updateSubscription;
