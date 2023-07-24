const { Notice } = require('../../models/notice');

const getNoticeListByUserId = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, title = '', category = '' } = req.query;
  const skip = (page - 1) * limit;

  let queryString = { owner };

  if (title) {
    queryString = { ...queryString, title: { $regex: title, $options: 'i' } };
  }

  if (category) {
    queryString = { ...queryString, category };
  }

  const result = await Notice.aggregate([
    { $match: queryString },
    {
      $facet: {
        totalCount: [{ $count: 'count' }],
        notices: [{ $skip: Number(skip) }, { $limit: Number(limit) }],
      },
    },
    {
      $project: {
        totalCount: { $arrayElemAt: ['$totalCount.count', 0] },
        page: page,
        perPage: limit,
        notices: 1,
      },
    },
  ]);

  res.json(result);
};

module.exports = getNoticeListByUserId;
