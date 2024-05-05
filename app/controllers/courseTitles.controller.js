const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Course_titles = db.course_titles;

const Op = db.Sequelize.Op;


exports.getAll = async (req, res) => {
    const getRows = await Course_titles.findAll()
        .then((data) => {
            console.error('Course_titles : ', data);
            res.send(data);
        })
        .catch((err) => {
            return 'Some error occurred while retrieving Course_titles.';
        });
};
