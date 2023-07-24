const { User } = require('../../models/user');
const { Notice } = require('../../models/notice');

const { default: mongoose } = require('mongoose');

const getFavoriteListByUserId = async (req, res) => {
  const { _id: id } = req.user;

  const { page = 1, limit = 20, title = '', category = '' } = req.query;
  const skip = (page - 1) * limit;

  let queryString = {};
  if (title) {
    queryString = {
      ...queryString,
      title: { $regex: title, $options: 'i' },
    };
  }

  if (category) {
    queryString = { ...queryString, category };
  }

  const { favorites } = await User.findById(id, 'favorites');

  const ids = favorites.map((el) => new mongoose.Types.ObjectId(el));

  queryString = { _id: { $in: ids }, ...queryString };

  const result = await Notice.aggregate([
    { $match: queryString },
    {
      $facet: {
        totalCount: [{ $count: 'count' }],
        favorites: [{ $skip: Number(skip) }, { $limit: Number(limit) }],
      },
    },
    {
      $project: {
        totalCount: { $arrayElemAt: ['$totalCount.count', 0] },
        page: page,
        perPage: limit,
        favorites: 1,
      },
    },
  ]);

  res.status(200).json(result);
};

module.exports = getFavoriteListByUserId;
