const { Notice } = require("../../models/notice");
const { User } = require("../../models/user");

const getList = async (req, res) => {
  const { page = 1, limit = 20, title = "", category = "" } = req.query;
  const skip = (page - 1) * limit;

  let queryString = {};
  if (title) {
    queryString = { ...queryString, title: { $regex: title, $options: "i" } };
  }

  if (category) {
    queryString = { ...queryString, category };
  }

  const result = await Notice.aggregate([
    { $match: queryString },
    { $addFields: { favorite: false } },
    { $project: { createdAt: 0, updatedAt: 0 } },
    {
      $facet: {
        totalCount: [{ $count: "count" }],
        notices: [{ $skip: Number(skip) }, { $limit: Number(limit) }],
      },
    },
    {
      $project: {
        totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
        page: { $cond: { if: { $eq: [page, 1] }, then: 1, else: page } },
        perPage: { $cond: { if: { $eq: [limit, 20] }, then: 20, else: limit } },
        notices: 1,
      },
    },
  ]);

  if (req?.user?._id) {
    const { favorites } = await User.findById(req.user._id, "favorites");

    result[0].notices.forEach((e) => {
      if (favorites.includes(e._id)) {
        e.favorite = true;
      }
    });
  }

  res.json(result);
};

module.exports = getList;
