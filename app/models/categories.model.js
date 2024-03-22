module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define('categories', {
        category_id: {
            type: Sequelize.STRING,
        },
        title: {
            type: Sequelize.STRING,
        },
        course_id: {
            type: Sequelize.STRING,
        },
    });

    return Categories;
};
