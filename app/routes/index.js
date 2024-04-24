module.exports = (app) => {
    const { check, validationResult } = require('express-validator');

    const controllers = require('../controllers');
    const middleware = require('../middleware');

    const resourcesController = controllers.resources;
    const joinController = controllers.join;
    const departmentsController = controllers.departments;
    const usersController = controllers.users;
    const coursesController = controllers.courses;
    const resourceSetups = controllers.resourceSetups;
    const categories = controllers.categories;

    app.get(['/api/v1/get/resources/pdf'], resourcesController.pdf);
    app.post(['/api/get/departments-by-organization'], departmentsController.getDepartmentsByOrganization);
    app.post(['/api/post/registration'], usersController.registration);
    app.post(['/api/post/login'], usersController.login);
    app.post(['/api/get/courses-by-department'], coursesController.getCoursesByDepartment);
    app.post(['/api/get/resources-by-course'], resourceSetups.getResourcesByCourse);
    app.post(['/api/get/categories-by-course'], categories.getCategoriesByCourse);
    app.post(['/api/get/search-resources'], joinController.search);




    // app.get(['/api/v1/get/resources/transfering'], joinController.transfering);
    // app.get(['/api/v1/get/resources/updateResourceSetup'], joinController.updateResourceSetup);


    // app.get('/api/get/course/:id', languages.getLanguageNameByCode);
};