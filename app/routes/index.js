module.exports = (app) => {
    const { check, validationResult } = require('express-validator');

    const controllers = require('../controllers');
    const middleware = require('../middleware');

    const resourcesController = controllers.resources;
    const joinController = controllers.join;
    const departmentsController = controllers.departments;
    const usersController = controllers.users;
    const coursesController = controllers.courses;
    const resourceSetupsController = controllers.resourceSetups;
    const categoriesController = controllers.categories;
    const organizationsController = controllers.organizations;
    const subjectsController = controllers.subjects;

    app.get(['/api/v1/get/resources/pdf'], resourcesController.pdf);
    app.post(['/api/get/resources-order-by-latest'], resourcesController.resourcesOrderByLatest);
    app.post(['/api/get/resources-by-id'], resourcesController.getResourcesById);
    app.post(['/api/get/departments-by-organization'], departmentsController.getDepartmentsByOrganization);
    app.post(['/api/post/registration'], usersController.registration);
    app.post(['/api/post/login'], usersController.login);
    app.post(['/api/get/courses-by-department'], coursesController.getCoursesByDepartment);
    app.post(['/api/get/courses-by-department-id'], coursesController.getCoursesByDepartmentId);
    app.post(['/api/get/resources-by-course'], resourceSetupsController.getResourcesByCourse);
    app.post(['/api/post/resource-setup'], resourceSetupsController.resourceSetup);
    app.post(['/api/get/categories-by-course'], categoriesController.getCategoriesByCourse);
    app.post(['/api/get/categories-by-course-id'], categoriesController.getCategoriesByCourseId);
    app.post(['/api/get/search-resources'], joinController.search);
    app.get(['/api/get/organizations'], organizationsController.getAll);
    app.get(['/api/get/departments'], departmentsController.getAll);
    app.post(['/api/get/subjects-by-category-id'], subjectsController.getSubjectsByCategoryId);
    



    // app.get(['/api/v1/get/resources/transfering'], joinController.transfering);
    // app.get(['/api/v1/get/resources/updateResourceSetup'], joinController.updateResourceSetup);


    // app.get('/api/get/course/:id', languages.getLanguageNameByCode);
};