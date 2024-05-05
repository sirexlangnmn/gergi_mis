const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Classifications = db.classifications;

const Op = db.Sequelize.Op;


exports.getClassifications = async (req, res) => {
    const getRows = await Classifications.findAll()
        .then((data) => {
            console.error('Classifications : ', data);
            res.send(data);
        })
        .catch((err) => {
            return 'Some error occurred while retrieving Classifications.';
        });
};
