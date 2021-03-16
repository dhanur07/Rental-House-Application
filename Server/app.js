'use strict';
module.exports = function (app) {
    // Initialize models
    let usermodel = require('./models/user');
    let housemodel = require('./models/house');
    let favoritemodel = require('./models/favorite');

    //Initialize routes
    let userRoutes = require('./routes/user-routes');
    userRoutes(app);
    let houseRoutes = require('./routes/house-routes');
    houseRoutes(app);
    let favoriteRoutes = require('./routes/favorite-routes');
    favoriteRoutes(app);
};
