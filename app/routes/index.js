module.exports = (app) => {
    const { check, validationResult } = require('express-validator');

    const controllers = require('../controllers');
    const middleware = require('../middleware');

    const resourcesController = controllers.resources;
    const joinController = controllers.join;
    const departmentsController = controllers.departments;
    const usersController = controllers.users;

    app.get(['/api/v1/get/resources/pdf'], resourcesController.pdf);
    app.post(['/api/get/departments-by-organization'], departmentsController.getDepartmentsByOrganization);
    app.post(['/api/post/registration'], usersController.registration);


    // app.get(['/api/v1/get/resources/transfering'], joinController.transfering);
    // app.get(['/api/v1/get/resources/updateResourceSetup'], joinController.updateResourceSetup);


    // app.get('/api/get/course/:id', languages.getLanguageNameByCode);
};