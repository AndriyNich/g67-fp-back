const getCurrent = async (req, res) => {
  const { name, email, phone, birthday, city, avatarURL } = req.user;

  res.json({ user: { name, email, phone, birthday, city, avatarURL } });
};

module.exports = getCurrent;
