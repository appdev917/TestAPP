const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/userdata_db', { dialect: 'postgres', protocol: 'postgres'});
const url = require('url')

const User = sequelize.define('user', {
  firstname: {
    type: Sequelize.STRING
  },
  lastname: {
    type: Sequelize.STRING
  },
  displayname: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  active: {
    type: Sequelize.INTEGER
  },
  role: {
    type: Sequelize.STRING
  }
},{
  timestamps: false // timestamps will now be true
});

// add query functions

function getAll(req, res, next) {
  User.findAll().then(users => {
    res.status(200)
    .jsonp(users);
  })
}


function getSingle(req, res, next) {
  var userID = parseInt(req.params.id);
  User.findOne({
    where: {
      id: userID
    }
  }).then(users => {
    res.status(200)
    .jsonp(users);
  });
}

function create(req, res, next) {
  users = JSON.parse(req.query.models);
  user = users[0];
  active = user.active ? 1 : 0;
  user.active = active;
  User.create(user)
  .then(() => User.findOne())
  .then(users => {
    res.status(200)
    .jsonp(users);
  });
}

function update(req, res, next) {
  users = JSON.parse(req.query.models);
  user = users[0];
  active = user.active ? 1 : 0;
  user.active = active;
  var userID = parseInt(user.id);
  User.update(user, {
    where: {
      id: userID
    }
  }).then(users => {
    res.status(200)
    .jsonp(users);
  });
}

function remove(req, res, next) {
  users = JSON.parse(req.query.models);
  user = users[0];
  var userID = parseInt(user.id);
  User.destroy({
    where: {
      id: userID
    }
  }).then(users => {
    res.status(200)
    .jsonp(users);
  });
}

module.exports = {
  getAll: getAll,
  getSingle: getSingle,
  create: create,
  update: update,
  remove: remove
};