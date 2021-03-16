'use strict';

const userRoute = require('./user-routes');
module.exports = (app) => {
    userRoute(app);
};

const houseRoute = require('./house-routes');
module.exports = (app) => {
    houseRoute(app);
};

const favoriteRoute = require('./favorite-routes');
module.exports = (app) => {
    favoriteRoute(app);
};
