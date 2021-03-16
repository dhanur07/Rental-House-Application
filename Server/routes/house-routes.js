'use strict';

const houseController = require('../controllers/house-controller');

module.exports = (app) => {
    app.route('/houses')
        .get(houseController.list)
        .post(houseController.save);

    app.route('/houses/:id')
        .get(houseController.get)
        .put(houseController.update)
        .delete(houseController.delete);
};