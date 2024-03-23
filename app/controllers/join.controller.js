const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Resources = db.resources;
const Resource_setups = db.resource_setups;
const Subjects = db.subjects;


const Op = db.Sequelize.Op;


// exports.transfering = async (req, res) => {
//     try {
//         const resources = await Resources.findAll({
//             attributes: ['resource_id', 'category_id']
//         });

//         const insertPromises = resources.map((resource) => {
//             return Resource_setups.create({
//                 resource_id: resource.dataValues.resource_id,
//                 category_id: resource.dataValues.category_id
//             });
//         });

//         await Promise.all(insertPromises);

//         res.status(200).json({ message: 'Resources transferred successfully.' });
//     } catch (error) {
//         console.error('Error transferring resources:', error);
//         res.status(500).json({ error: 'Some error occurred while transferring resources.' });
//     }
// };




// exports.updateResourceSetup = async (req, res) => {
//     try {
//         const updatedRows = await Resource_setups.update({
//             department_id: 1,
//             organization_id: 1,
//             classification_id: 2
//         }, {
//             where: {
//                 classification_id: null
//             } // Update all rows
//         });

//         res.status(200).json({ message: 'Resources transferred successfully.', updatedRows });
//     } catch (error) {
//         console.error('Error transferring resources:', error);
//         res.status(500).json({ error: 'Some error occurred while transferring resources.' });
//     }
// };




// exports.updateResourceSetup = async (req, res) => {
//     try {
//         // Find resources with slug 'understanding-the-self'
//         const resources = await Resources.findAll({
//             attributes: ['resource_id'],
//             where: {
//                 subject: 'ocular-pharmacology-with-therapeutics'
//             }
//         });

//         // Find subjects with slug 'understanding-the-self'
//         const subjects = await Subjects.findAll({
//             attributes: ['id'],
//             where: {
//                 slug: 'ocular-pharmacology-with-therapeutics'
//             }
//         });

//         // Update Resource_setups with corresponding subject_id
//         const updatedRowsPromises = subjects.map((subject) => {
//             return Resource_setups.update(
//                 { subject_id: subject.id }, // Update subject_id
//                 { where: { resource_id: resources.map(resource => resource.resource_id) } } // Filter by resource_id
//             );
//         });

//         // Wait for all updates to complete
//         await Promise.all(updatedRowsPromises);

//         res.status(200).json({ message: 'Resources transferred successfully.', resources });
//     } catch (error) {
//         console.error('Error transferring resources:', error);
//         res.status(500).json({ error: 'Some error occurred while transferring resources.' });
//     }
// };
