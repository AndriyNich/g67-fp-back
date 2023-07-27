const { Notice } = require("../../models/notice");

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

  res.json(result);
};

module.exports = getList;
