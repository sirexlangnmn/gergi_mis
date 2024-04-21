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

exports.getResourcesByCourse = async (req, res) => {
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
        const courseTitle = req.body.course;
        // console.log('resourceSetups.controller.js courseTitle : ', courseTitle);

        const CourseTitleData = await Course_titles.findOne({ where: { title: courseTitle } });
        if (!CourseTitleData) { return res.status(404).json({ error: 'Course Title not found' }); }
        // console.log('resourceSetups.controller.js CourseTitlesData.id : ', CourseTitleData.id);

        const courseData = await Courses.findOne({ where: { course_title_id: CourseTitleData.id } });
        if (!courseData) { return res.status(404).json({ error: 'Course not found' }); }
        // console.log('resourceSetups.controller.js courseData.id : ', courseData.id);

        // const resourceSetupsData = await Resource_setups.findAll({ where: { course_id: courseData.id } });
        const resourceSetupsData = await Resource_setups.findAll({
            where: {
                course_id: courseData.id
            },
            order: Sequelize.literal('RAND()'), // for MySQL or MariaDB
            limit: 20
        });

        if (!resourceSetupsData) { return res.status(404).json({ error: 'Resource Setup not found' }); }
        //console.log('resourceSetups.controller.js resourceSetupsData : ', resourceSetupsData);

        const resourceSetupIds = resourceSetupsData.map(resourceSetup => resourceSetup.resource_id);

        const resourceData = await Resources.findAll({ where: { resource_id: resourceSetupIds } });
        // console.log('resourceSetups.controller.js resourceData : ', resourceData);

        res.json(resourceData);

    } catch (error) {
        console.error('Error in getCoursesByDepartment:', error);

        return res.status(500).json({ error: 'Internal server error' });
    }
};
