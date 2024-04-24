module.exports = (app) => {
    const { v4: uuidV4 } = require('uuid');
    const db = require('../models/db.js');
    const QUERY = require('../query/resources.query.js');
    const express = require('express');
    const path = require('path');
    const mysql = require('mysql2');
    const multer = require('multer');

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            const title = req.body.title.replace(/\s+/g, '-').toLowerCase();
            cb(null, `${title}-${Date.now()}-${file.originalname}`);
        }
    });

    const upload = multer({ storage: storage });

    app.use(express.static(path.join(__dirname, 'public')));


    app.post('/add-resources', upload.single('file'), (req, res) => {
        const { title, download_link, isbn } = req.body;
        const filename = req.file.filename;

        const inputData = {
            resource_id: uuidV4(),
            title: title,
            url_link: download_link,
            ISBN: isbn,
            image: filename,
            createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
            updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        };


        const sql = 'INSERT INTO resources (resource_id, title, url_link, ISBN, image, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [
            inputData.resource_id,
            inputData.title,
            inputData.url_link,
            inputData.ISBN,
            inputData.image,
            inputData.createdAt,
            inputData.updatedAt
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.log('Error inserting data:', err);
                return res.json({ message: 'Error inserting data into database' });
            }
            console.log('Data inserted successfully');
            res.json({ message: 'Form submitted successfully', data: { title, download_link, isbn, filename } });
        });
    });

};
