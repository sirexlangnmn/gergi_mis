const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Users = db.users;

const Op = db.Sequelize.Op;

exports.registration = async (req, res) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            return res.status(400).send({
                message: errors.array(),
            });
        }

        const { fullNameInput, mobileNumberInput, emailAddressInput, passwordInput } = req.body;

        let name = fullNameInput;
        let mobile_number = mobileNumberInput;
        let email = emailAddressInput;
        let password = passwordInput;

        // Inserting data into the users table
        const newUser = await Users.create({
            name,
            mobile_number,
            email,
            password,
        });

        return res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({
            error: {
                message: 'Internal server error',
            },
        });
    }
};
