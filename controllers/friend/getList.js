const { Friend } = require("../../models/friend");

const getList = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Friend.aggregate([
    { $match: {} },
    {
      $facet: {
        totalCount: [{ $count: "count" }],
        friends: [{ $skip: Number(skip) }, { $limit: Number(limit) }],
      },
    },
    {
      $project: {
        totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
        page: page,
        perPage: limit,
        friends: 1,
      },
    },
  ]);

  res.json(result);
};

module.exports = getList;
