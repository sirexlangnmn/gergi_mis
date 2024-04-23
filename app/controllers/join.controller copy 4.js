const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const sql = require('../models/db.js');
const QUERY = require('../query/join.query.js');

const db = require('../models');

const Resource_setups = db.resource_setups
const Resources = db.resources
const Categories = db.categories

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
            try {
                let query = `
                    SELECT
                        r.*,
                        rs.*,
                        c.title as category_title
                    FROM
                        resources r
                    LEFT JOIN
                        resource_setups rs ON r.resource_id = rs.resource_id
                    LEFT JOIN
                        categories c ON rs.category_id = c.id
                `;
        
                if (searchKeyword) {
                    query += ` WHERE (r.title LIKE '%${searchKeyword}%' OR r.ISBN LIKE '%${searchKeyword}%')`;
                    query += ` ORDER BY RAND()`;
                }
        
                sql.query(query, (err, result) => {
                    if (err) {
                        console.log('Error executing query:', err);
                        return;
                    }
        
                    // Assuming you're using Express.js
                    res.json(result);
                });
        
            } catch (error) {
                console.error('Error executing query:', error);
            }
        }


    } catch (error) {
        console.error('Error in search:', error);

        return res.status(500).json({ error: 'Internal server error' });
    }

};







