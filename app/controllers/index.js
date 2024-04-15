
const controller = {};

controller.resources = require('./resources.controller.js');
controller.join = require('./join.controller.js');
controller.departments = require('./departments.controller.js');
controller.users = require('./users.controller.js');
controller.courses = require('./courses.controller.js');



module.exports = controller;
