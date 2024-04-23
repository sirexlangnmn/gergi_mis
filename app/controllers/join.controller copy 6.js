const { check, validationResult } = require('express-validator');
const sql = require('../models/db.js');
const QUERY = require('../query/join.query.js');

exports.search = async (req, res) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { searchInput, categoryInput, resourceTypeInput } = req.body;

        const searchKeyword = searchInput || '';
        const categoryId = categoryInput || '';
        const resourceType = resourceTypeInput || 1;

        let query;

        if (searchKeyword && categoryId && resourceType) {
            query = buildQueryWithSearchAndCategory(searchKeyword, categoryId);
        } else if (!searchKeyword && categoryId && resourceType) {
            query = buildQueryWithCategory(categoryId);
        } else if (searchKeyword && !categoryId && resourceType) {
            query = buildQueryWithSearch(searchKeyword);
        } else {
            return res.status(400).json({ error: 'Invalid search parameters' });
        }

        executeQuery(query, res);
    } catch (error) {
        console.error('Error in search:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

function buildQueryWithSearchAndCategory(searchKeyword, categoryId) {
    let query = QUERY.getResources;

    const values = [`%${searchKeyword}%`, `%${searchKeyword}%`, categoryId];

    query += ` WHERE (r.title LIKE ? OR r.ISBN LIKE ?) AND rs.category_id = ? ORDER BY RAND()`;

    return { query, values };
}

function buildQueryWithCategory(categoryId) {
    const query = QUERY.getResources2;

    const values = [categoryId];

    query += ` WHERE rs.category_id = ? ORDER BY RAND()`;

    return { query, values };
}

function buildQueryWithSearch(searchKeyword) {
    let query = QUERY.getResources;

    const values = [`%${searchKeyword}%`, `%${searchKeyword}%`];

    query += ` WHERE (r.title LIKE ? OR r.ISBN LIKE ?) ORDER BY RAND()`;

    return { query, values };
}

function executeQuery({ query, values }, res) {
    sql.query(query, values, (err, result) => {
        if (err) {
            console.log('Error executing query:', err);
            return res.status(500).json({ error: 'Error executing query' });
        }
        res.json(result);
    });
}
