const { News } = require("../../models/news");

const { getPaginationFields, getQueryString } = require("../../helpers");

const getList = async (req, res) => {
  const { page, skip, limit } = getPaginationFields(req);
  const { queryString } = Object.create(getQueryString)
    .setRequest(req)
    .addTitle();

  const result = await News.aggregate([
    { $match: queryString },
    { $project: { createdAt: 0, updatedAt: 0 } },
    {
      $facet: {
        totalCount: [{ $count: "count" }],
        news: [{ $skip: Number(skip) }, { $limit: Number(limit) }],
      },
    },
    {
      $project: {
        totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
        page: { $cond: { if: { $eq: [page, 1] }, then: 1, else: page } },
        perPage: { $cond: { if: { $eq: [limit, 20] }, then: 20, else: limit } },
        news: 1,
      },
    },
  ]);

  res.json(result);
};

module.exports = getList;
