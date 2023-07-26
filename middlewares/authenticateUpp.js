const { SECRET_KEY } = process.env;

const authenticateUpp = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer' || !token) {
    next();
    return;
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next();
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    next();
  }
};

module.exports = authenticateUpp;
