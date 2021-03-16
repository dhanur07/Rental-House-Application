'use strict';
const mongoose = require('mongoose'),
    Favorite = mongoose.model('favorite');

/**
 * Returns a promise for search results.
 *
 * @param search param.
*/
exports.search = (params) => {
    const promise = Favorite.find(params).exec();
    return promise;
};


/**
 * Saves the new favorite object.
 *
 * @param favorite
*/
exports.save = (favorite) => {
    const newfavorite = new Favorite(favorite);
    return newfavorite.save();
};

/**
 * Returns the favorite object by id.
 *
 * @param favoriteId
*/
exports.get = (favoriteId) => {
    const favoritePromise = Favorite.findById(favoriteId).exec();
    return favoritePromise;
};

/**
 * Updates an existing favorite.
 *
 * @param updatedfavorite
*/
exports.update = (updatedfavorite) => {
    
const promise = Favorite.findByIdAndUpdate(updatedfavorite.id, updatedfavorite).exec();
   return promise;
};

/**
 * Deletes an existing favorite item.
 *
 * @param username
*/
exports.delete = (username) => {
    const promise = Favorite.findOneAndDelete({ "username" : username });
    return promise;
};