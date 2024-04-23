const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const sql = require('../models/db.js');
const QUERY = require('../query/join.query.js');

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
        try {
            let query = QUERY.getResources
            // query += ` WHERE st.title = '${courseTitle}'`;
            query += ` ORDER BY RAND()`;
            query += ` LIMIT 20;`;

            sql.query(query, (err, result) => {
                if (err) {
                    console.log('Error executing query:', err);
                    return;
                }

                res.json(result);
            });

        } catch (error) {
            console.error('Error executing query:', error);
        }

    } catch (error) {
        console.error('Error in getCoursesByDepartment:', error);

        return res.status(500).json({ error: 'Internal server error' });
    }
};
