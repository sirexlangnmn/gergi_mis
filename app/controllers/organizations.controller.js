const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Organizations = db.organizations;

const Op = db.Sequelize.Op;


exports.getAll = async (req, res) => {
    const getRows = await Organizations.findAll()
        .then((data) => {
            console.error('organizationsData1 : ', data);
            res.send(data);
        })
        .catch((err) => {
            return 'Some error occurred while retrieving Organizations.';
        });
};
