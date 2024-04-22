
const controller = {};

controller.resources = require('./resources.controller.js');
controller.join = require('./join.controller.js');
controller.departments = require('./departments.controller.js');
controller.users = require('./users.controller.js');
controller.courses = require('./courses.controller.js');
controller.resourceSetups = require('./resourceSetups.controller.js');
controller.categories = require('./categories.controller.js');



module.exports = controller;
