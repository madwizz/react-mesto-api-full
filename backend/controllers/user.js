const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../utils/classErrors/BadRequestError');
const MatchedError = require('../utils/classErrors/MatchedError');
const NotFoundError = require('../utils/classErrors/NotFoundError');
const { MONGO_DB_CODE } = require('../utils/errors');

const { JWT } = require('../utils/JWT');

module.exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('User with that id is not found');
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Invalid user id format'));
    }
    return next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      name, about, avatar, email, password: hash,
    });
    res.send({
      name, about, avatar, email,
    });
  } catch (err) {
    if (err.code === MONGO_DB_CODE) {
      next(new MatchedError('User with that email already exists'));
    } else if (err.name === 'ValidationError') {
      next(new BadRequestError('Invalid data is received: validation error'));
    } else {
      next(err);
    }
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUser(email, password);
    const key = JWT();
    const token = jwt.sign({ _id: user._id }, key, { expiresIn: '7d' });
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserInfo = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const userInfoUpdate = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    res.send(userInfoUpdate);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

module.exports.updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const avatarUpdate = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    res.send(avatarUpdate);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

module.exports.getMyInfo = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};
