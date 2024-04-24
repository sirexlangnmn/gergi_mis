module.exports = (app) => {
    const db = require('../models/db.js');
    const QUERY = require('../query/resources.query.js');


    const express = require('express');
    const path = require('path');
    app.use(express.static(path.join(__dirname, '../../', 'public')));

    const mysql = require('mysql2');
    const multer = require('multer');


    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    const upload = multer({ storage: storage });

    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname, 'public')));



    // Handle form submission
    app.post('/add-resources', upload.single('file'), (req, res) => {
        const { title, download_link, isbn } = req.body;
        const file = req.file;

        console.log('file : ', file.filename)
        // Perform database insertion or any other required operations with the form data and file

        res.json({ message: 'Form submitted successfully', data: { title, download_link, isbn, file } });
    });


};
