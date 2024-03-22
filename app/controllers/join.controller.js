const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Resources = db.resources;
const Resource_setups = db.resource_setups;
console.log('resources.controller.js Resources', Resources)

const Op = db.Sequelize.Op;


exports.transfering = async (req, res) => {
    try {
        const resources = await Resources.findAll({
            attributes: ['resource_id', 'category_id']
        });

        const insertPromises = resources.map((resource) => {
            return Resource_setups.create({
                resource_id: resource.dataValues.resource_id,
                category_id: resource.dataValues.category_id
            });
        });

        await Promise.all(insertPromises);

        res.status(200).json({ message: 'Resources transferred successfully.' });
    } catch (error) {
        console.error('Error transferring resources:', error);
        res.status(500).json({ error: 'Some error occurred while transferring resources.' });
    }
};



