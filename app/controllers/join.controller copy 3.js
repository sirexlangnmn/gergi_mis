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

        const searchKeyword = searchInput ? searchInput : '';
        const categoryId = categoryInput ? categoryInput : '';
        const resourceType = resourceTypeInput ? resourceTypeInput : 1;



        let resourceData;
        if (searchKeyword && categoryId && resourceType) {
            const resourceSetupsData = await Resource_setups.findAll({
                where: {
                    category_id: categoryId,
                    resource_type: resourceType
                },
                attributes: ['resource_id'],
                limit: 20
            });


            if (!resourceSetupsData) { return res.status(404).json({ error: 'resourceSetupsData not found' }); }
            //console.log('join.controller.js resourceSetupsData : ', resourceSetupsData);


            const resourceSetupIds = resourceSetupsData.map(resourceSetup => resourceSetup.resource_id);
            if (!resourceSetupIds) { return res.status(404).json({ error: 'resourceSetupIds not found' }); }
            // console.log('resourceSetups.controller.js resourceSetupIds : ', resourceSetupIds);


            resourceData = await Resources.findAll({
                where: {
                    [Op.or]: [
                        { resource_id: resourceSetupIds },
                        { title: { [Op.like]: `%` + searchKeyword + `%` } },
                        { ISBN: { [Op.like]: `%` + searchKeyword + `%` } }
                    ]
                },
                order: Sequelize.literal('RAND()')
            });
        }

        if (!searchKeyword && categoryId && resourceType) {
            const resourceSetupsData = await Resource_setups.findAll({
                where: {
                    category_id: categoryId,
                    resource_type: resourceType
                },
                attributes: ['resource_id'],
                limit: 20
            });


            if (!resourceSetupsData) { return res.status(404).json({ error: 'resourceSetupsData not found' }); }
            //console.log('join.controller.js resourceSetupsData : ', resourceSetupsData);


            const resourceSetupIds = resourceSetupsData.map(resourceSetup => resourceSetup.resource_id);
            if (!resourceSetupIds) { return res.status(404).json({ error: 'resourceSetupIds not found' }); }
            // console.log('resourceSetups.controller.js resourceSetupIds : ', resourceSetupIds);

            resourceData = await Resources.findAll({
                where: {
                    resource_id: resourceSetupIds,
                },
                order: Sequelize.literal('RAND()')
            });
        }

        if (searchKeyword && !categoryId && resourceType) {
            resourceData = await Resources.findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.like]: `%` + searchKeyword + `%` } },
                        { ISBN: { [Op.like]: `%` + searchKeyword + `%` } }
                    ]
                },
                order: Sequelize.literal('RAND()')
            });
        }

        if (!resourceData) { return res.status(404).json({ error: 'resourceData not found' }); }
        // console.log('resourceSetups.controller.js resourceData : ', resourceData);

        res.json(resourceData);


    } catch (error) {
        console.error('Error in search:', error);

        return res.status(500).json({ error: 'Internal server error' });
    }

};







