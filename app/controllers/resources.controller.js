// const db = require('../db_models');
// const sequelizeConfig = require('../config/sequelize.config.js');

// const Users_accounts = db.users_accounts;

// const Op = db.Sequelize.Op;

// exports.numberOfVisitorMembers = async (req, res) => {
//     const getRows = await Users_accounts.findAll()
//         .then((data) => {
//             res.send(data);
//         })
//         .catch((err) => {
//             return 'Some error occurred while retrieving number Of Trader Members.';
//         });
// };

// exports.tradersData = async (req, res) => {
//     const traders = { type: 1 };
//     const large_scale = { type: 2 };
//     const medium_scale = { type: 3 };
//     const small_scale = { type: 4 };

//     const smallScale = await Users_accounts.findAll({ where: small_scale });
//     const mediumScale = await Users_accounts.findAll({ where: medium_scale });
//     const largeScale = await Users_accounts.findAll({ where: large_scale });
//     const Alltraders = await Users_accounts.findAll({ where: traders });

//     let data = [];
//     data = {
//         'Number of Small Scale: ': smallScale.length,
//         'Number of Medium Scale: ': mediumScale.length,
//         'Number of Large Scale: ': largeScale.length,
//         'Number of Trader: ': Alltraders.length,
//         'All: ': Alltraders.length + smallScale.length + mediumScale.length + largeScale.length,
//     };

//     res.send(data);
// };



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

