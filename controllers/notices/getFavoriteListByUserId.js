const { default: mongoose } = require("mongoose");

const { User } = require("../../models/users");
const { Notice } = require("../../models/notices");

const { getPaginationFields, getQueryString } = require("../../helpers");

const getFavoriteListByUserId = async (req, res) => {
  const { _id: id } = req.user;
  const { page, skip, limit } = getPaginationFields(req);
  let { queryString } = Object.create(getQueryString)
    .setRequest(req)
    .addTitle()
    .addCategory();

  const { favorites } = await User.findById(id, "favorites");

  const ids = favorites.map((el) => new mongoose.Types.ObjectId(el));

  queryString = { _id: { $in: ids }, ...queryString };

  const result = await Notice.aggregate([
    { $match: queryString },
    { $addFields: { favorite: true } },
    { $project: { createdAt: 0, updatedAt: 0 } },
    {
      $facet: {
        totalCount: [{ $count: "count" }],
        favorites: [{ $skip: Number(skip) }, { $limit: Number(limit) }],
      },
    },
    {
      $project: {
        totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
        page: { $cond: { if: { $eq: [page, 1] }, then: 1, else: page } },
        perPage: { $cond: { if: { $eq: [limit, 20] }, then: 20, else: limit } },
        favorites: 1,
      },
    },
  ]);

  res.status(200).json(result);
};

module.exports = getFavoriteListByUserId;
