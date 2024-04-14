const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Organizations = db.organizations;
const Departments = db.departments;

const Op = db.Sequelize.Op;

exports.getDepartmentsByOrganization = async (req, res) => {
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
        const { organization } = req.body;

        const organizationData = await Organizations.findOne({ where: { title: organization } });

        if (!organizationData) { return res.status(404).json({ error: 'Organization not found' }); }

        const departmentsData = await Departments.findAll({ where: { organization_id: organizationData.id } });

        res.json(departmentsData);
    } catch (error) {
        console.error('Error in getDepartmentsByOrganization:', error);

        return res.status(500).json({ error: 'Internal server error' });
    }

};
