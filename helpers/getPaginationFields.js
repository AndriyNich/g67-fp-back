const getPaginationFields = (req) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  return { page, skip, limit };
};

module.exports = getPaginationFields;
