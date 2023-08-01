const { Notice } = require("../../models/notices");
const { User } = require("../../models/users");

const { getPaginationFields, getQueryString } = require("../../helpers");
const { PER_PAGE } = require("../../constants");

const getList = async (req, res) => {
  const { page, skip, limit } = getPaginationFields(req);
  const { queryString } = Object.create(getQueryString)
    .setRequest(req)
    .addTitle()
    .addCategory();

  const result = await Notice.aggregate([
    { $match: queryString },
    { $sort: { updatedAt: -1 } },
    { $addFields: { favorite: false, allowDelete: false } },
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
        perPage: {
          $cond: {
            if: { $eq: [limit, PER_PAGE] },
            then: PER_PAGE,
            else: limit,
          },
        },
        notices: 1,
      },
    },
  ]);

  if (req?.user?._id) {
    const owner = String(req.user._id);

    const { favorites } = await User.findById(req.user._id, "favorites");

    result[0].notices.forEach((e) => {
      if (favorites.includes(e._id)) {
        e.favorite = true;
      }
      if (String(e.owner) === owner) {
        e.allowDelete = true;
      }
    });
  }

  res.json(result);
};

module.exports = getList;
