const { Friend } = require("../../models/friend");

const getList = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Friend.aggregate([
    { $match: {} },
    {
      $project: {
        title: "$title",
        url: "$url",
        addressUrl: "$addressUrl",
        imageUrl: "$imageUrl",
        address: "$address",
        workDays: "$workDays",
        phone: "$phone",
        email: "$email",
      },
    },
    {
      $facet: {
        totalCount: [{ $count: "count" }],
        friends: [{ $skip: Number(skip) }, { $limit: Number(limit) }],
      },
    },
    {
      $project: {
        totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
        page: { $cond: { if: { $eq: [page, 1] }, then: "1", else: page } },
        perPage: {
          $cond: { if: { $eq: [limit, 20] }, then: "20", else: limit },
        },
        friends: 1,
      },
    },
  ]);

  res.json(result);
};

module.exports = getList;
