const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Categories = db.categories;
const Course_titles = db.course_titles;
const Courses = db.courses;

const Op = db.Sequelize.Op;

exports.getCategoriesByCourse = async (req, res) => {
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
        // console.log('categories.controller.js courseTitle : ', courseTitle);

        const CourseTitleData = await Course_titles.findOne({ where: { title: courseTitle }, attributes: ['id'] });
        if (!CourseTitleData) { return res.status(404).json({ error: 'Course Title not found' }); }
        // console.log('categories.controller.js CourseTitlesData.id : ', CourseTitleData.id);

        const courseData = await Courses.findOne({ where: { course_title_id: CourseTitleData.id },
            attributes: ['id'] });
        if (!courseData) { return res.status(404).json({ error: 'Course not found' }); }
        // console.log('categories.controller.js courseData.id : ', courseData.id);

        const categoriesData = await Categories.findAll({ where: { course_id: courseData.id }, attributes: ['id','title'] });
        if (!categoriesData) { return res.status(404).json({ error: 'Categories not found' }); }
        // console.log('categories.controller.js categoriesData : ', categoriesData);

        res.json(categoriesData);
    } catch (error) {
        console.error('Error in getDepartmentsByOrganization:', error);

        return res.status(500).json({ error: 'Internal server error' });
    }

};
