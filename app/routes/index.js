module.exports = (app) => {
    const { check, validationResult } = require('express-validator');

    const controllers = require('../controllers');
    const middleware = require('../middleware');

    const resourcesController = controllers.resources;
    const joinController = controllers.join;

    app.get(['/api/v1/get/resources/pdf'], resourcesController.pdf);
    // app.get(['/api/v1/get/resources/transfering'], joinController.transfering);
    // app.get(['/api/v1/get/resources/updateResourceSetup'], joinController.updateResourceSetup);



};