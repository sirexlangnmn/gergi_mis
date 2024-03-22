module.exports = (sequelize, Sequelize) => {
    const Course_titles = sequelize.define('course_titles', {
        course_title_id: {
            type: Sequelize.STRING,
        },
        department_id: {
            type: Sequelize.STRING,
        },
    });

    return Course_titles;
};
