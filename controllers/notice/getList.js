const { Notice } = require("../../models/notice");

// const { categoryNoticeList } = require("../../constants");

const getList = async (req, res) => {
  console.log(req.query);
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const queryString = { ...req.query };

  console.log(`page: ${page}, limit: ${limit}`);
  console.log(queryString);

  //   if (req?.user?._id) {
  //     const { _id: owner } = req.user;
  //     queryString = { owner, ...queryString };
  //   }

  const result = await Notice.find(queryString, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  const data = JSON.parse(JSON.stringify(result)).map((e) => {
    return { ...e, favorite: false };
  });

  res.json(data);
};

module.exports = getList;
