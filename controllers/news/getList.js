const { News } = require('../../models/news');

const getList = async (req, res) => {
  const { page = 1, limit = 20, title = '' } = req.query;
  const skip = (page - 1) * limit;

  let queryString = {};
  if (title) {
    queryString = { ...queryString, title: { $regex: title, $options: 'i' } };
  }

  const result = await News.aggregate([
    { $match: queryString },
    {
      $project: {
        imgUrl: '$imgUrl',
        title: '$title',
        text: '$text',
        date: '$date',
        url: '$url',
        id: '$id',
      },
    },
    {
      $facet: {
        totalCount: [{ $count: 'count' }],
        news: [{ $skip: Number(skip) }, { $limit: Number(limit) }],
      },
    },
    {
      $project: {
        totalCount: { $arrayElemAt: ['$totalCount.count', 0] },
        page: page,
        perPage: limit,
        news: 1,
      },
    },
  ]);

  res.json(result);
};

module.exports = getList;
