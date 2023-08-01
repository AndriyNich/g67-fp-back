const getCurrent = async (req, res) => {
  const { _id, name, email, phone, birthday, city, avatarURL } = req.user;

  res.json({
    user: { _id, name, email, phone, birthday, city, avatarURL },
  });
};

module.exports = getCurrent;
