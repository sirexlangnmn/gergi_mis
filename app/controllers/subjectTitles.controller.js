const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const db = require('../models/index.js');
const sequelizeConfig = require('../config/sequelize.config.js');

const Subject_titles = db.subject_titles;

const Op = db.Sequelize.Op;


exports.getAll = async (req, res) => {
    const getRows = await Subject_titles.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            return 'Some error occurred while retrieving Subject_titles.';
        });
};
