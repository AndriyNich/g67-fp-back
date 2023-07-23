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

  const result = await Notice.find(queryString, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  const maxHits = await Notice.find(queryString).count();

  // const ddd = await Notice.aggregate([
  //   { $match: { title: { $regex: "dog", $options: "i" } } },
  //   { $group: { _id: { $sum: 1 } } },
  // ]);

  const data = JSON.parse(JSON.stringify(result)).map((e) => {
    return { ...e, favorite: false };
  });

  const responseData = { notices: data, maxHits };

  res.json(responseData);
};

module.exports = getList;
