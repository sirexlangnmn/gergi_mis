const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Resources = db.resources;
console.log('resources.controller.js Resources', Resources)

const Op = db.Sequelize.Op;

exports.pdf = async (req, res) => {
    const getRows = await Resources.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            return 'Some error occurred while retrieving number Of Trader Members.';
        });
};

