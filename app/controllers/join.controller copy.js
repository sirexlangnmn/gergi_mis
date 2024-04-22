const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Departments = db.departments;
const Courses = db.courses;
const Course_titles = db.course_titles

const Resource_setups = db.resource_setups
const Resources = db.resources

const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;


exports.search = async (req, res) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            return res.status(200).send({
                message: errors.array(),
            });
        }
    } catch (error) {
        return res.status(400).json({
            error: {
                message: error,
            },
        });
    }

    try {

        const { searchInput, categoryInput, resourceTypeInput } = req.body;

        console.log('join.controller searchInput : ', searchInput);
        console.log('join.controller categoryInput : ', categoryInput);
        console.log('join.controller resourceTypeInput : ', resourceTypeInput);
        const searchKeyword = searchInput ? searchInput : '';
        const categoryId = categoryInput ? categoryInput : '';
        const resourceType = resourceTypeInput ? resourceTypeInput : '';


        const resourceSetupsData = await Resource_setups.findAll({
            where: {
                [Op.or]: [
                    { category_id: categoryId },
                    { resource_type: resourceType }
                ]
            },
            // where: {
            //     category_id: categoryId,
            //     resource_type: resourceType
            // },
            attributes: ['resource_id'],
            // order: Sequelize.literal('RAND()'), // for MySQL or MariaDB
            limit: 20
        });

        if (!resourceSetupsData) { return res.status(404).json({ error: 'resourceSetupsData not found' }); }
        //console.log('join.controller.js resourceSetupsData : ', resourceSetupsData);


        const resourceSetupIds = resourceSetupsData.map(resourceSetup => resourceSetup.resource_id);
        if (!resourceSetupIds) { return res.status(404).json({ error: 'resourceSetupIds not found' }); }
        // console.log('resourceSetups.controller.js resourceSetupIds : ', resourceSetupIds);
     

        const resourceData = await Resources.findAll({ where: { resource_id: resourceSetupIds } });
        if (!resourceData) { return res.status(404).json({ error: 'resourceData not found' }); }
        console.log('resourceSetups.controller.js resourceData : ', resourceData);

        res.json(resourceData);

        // const departmentData = await Departments.findOne({
        //     where: {
        //         title: departmentTitle,
        //         organization_id: organizationId
        //     }
        // });

        // if (!departmentData) { return res.status(404).json({ error: 'Department not found' }); }

        // // mag session dito ng department_id
        // req.session.department_id = departmentData.id;
        // req.session.department_title = departmentData.title;

        // const coursesData = await Courses.findAll({
        //     where: { department_id: departmentData.id },
        // });


        // const courseTitleIds = coursesData.map(course => course.course_title_id);


        // const courseTitlesData = await Course_titles.findAll({
        //     where: { id: courseTitleIds }
        // });


        // const courseTitles = courseTitlesData.map(courseTitle => courseTitle.title);


        // if (!courseTitles) { return res.status(404).json({ error: 'Course Titles not found' }); }

        // res.json(courseTitles);
    } catch (error) {
        console.error('Error in search:', error);

        return res.status(500).json({ error: 'Internal server error' });
    }

};




// exports.transfering = async (req, res) => {
//     try {
//         const resources = await Resources.findAll({
//             attributes: ['resource_id', 'category_id']
//         });

//         const insertPromises = resources.map((resource) => {
//             return Resource_setups.create({
//                 resource_id: resource.dataValues.resource_id,
//                 category_id: resource.dataValues.category_id
//             });
//         });

//         await Promise.all(insertPromises);

//         res.status(200).json({ message: 'Resources transferred successfully.' });
//     } catch (error) {
//         console.error('Error transferring resources:', error);
//         res.status(500).json({ error: 'Some error occurred while transferring resources.' });
//     }
// };




// exports.updateResourceSetup = async (req, res) => {
//     try {
//         const updatedRows = await Resource_setups.update({
//             department_id: 1,
//             organization_id: 1,
//             classification_id: 2
//         }, {
//             where: {
//                 classification_id: null
//             } // Update all rows
//         });

//         res.status(200).json({ message: 'Resources transferred successfully.', updatedRows });
//     } catch (error) {
//         console.error('Error transferring resources:', error);
//         res.status(500).json({ error: 'Some error occurred while transferring resources.' });
//     }
// };




// exports.updateResourceSetup = async (req, res) => {
//     try {
//         // Find resources with slug 'understanding-the-self'
//         const resources = await Resources.findAll({
//             attributes: ['resource_id'],
//             where: {
//                 subject: 'ocular-pharmacology-with-therapeutics'
//             }
//         });

//         // Find subjects with slug 'understanding-the-self'
//         const subjects = await Subjects.findAll({
//             attributes: ['id'],
//             where: {
//                 slug: 'ocular-pharmacology-with-therapeutics'
//             }
//         });

//         // Update Resource_setups with corresponding subject_id
//         const updatedRowsPromises = subjects.map((subject) => {
//             return Resource_setups.update(
//                 { subject_id: subject.id }, // Update subject_id
//                 { where: { resource_id: resources.map(resource => resource.resource_id) } } // Filter by resource_id
//             );
//         });

//         // Wait for all updates to complete
//         await Promise.all(updatedRowsPromises);

//         res.status(200).json({ message: 'Resources transferred successfully.', resources });
//     } catch (error) {
//         console.error('Error transferring resources:', error);
//         res.status(500).json({ error: 'Some error occurred while transferring resources.' });
//     }
// };






