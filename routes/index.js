var express = require('express');
var router = express.Router();

var db = require('../api/user');

router.get('/api/users', db.getAll);
router.get('/api/users/create', db.create);
router.get('/api/users/update', db.update);
router.get('/api/users/destroy', db.remove);

// router.route('/*')
// .get(function(req, res) {
//   res.sendfile(router.get('appPath') + '/index.html');
// });

module.exports = router;