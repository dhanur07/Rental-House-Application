'use strict';

const favoriteController = require('../controllers/favorite-controller');

module.exports = (app) => {
    app.route('/favorites')
        .get(favoriteController.list)
        .post(favoriteController.save);

    app.route('/favorites/:id')
        .get(favoriteController.get)
        .put(favoriteController.update)
        .delete(favoriteController.delete);
};