const { Notice } = require("../../models/notices");
const { User } = require("../../models/users");

const { getPaginationFields, getQueryString } = require("../../helpers");

const getNoticeListByUserId = async (req, res) => {
  const { page, skip, limit } = getPaginationFields(req);
  const { queryString } = Object.create(getQueryString)
    .setRequest(req)
    .addTitle()
    .addCategory()
    .addOwner();

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

module.exports = getNoticeListByUserId;
