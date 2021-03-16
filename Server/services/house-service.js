'use strict';
const mongoose = require('mongoose'),
    House = mongoose.model('house');

/**
 * Returns a promise for search results.
 *
 * @param search param.
*/
exports.search = (params) => {
    const promise = House.find(params).exec();
    return promise;
};

/**
 * Saves the new house object.
 *
 * @param house
*/
exports.save = (house) => {
    const newhouse = new House(house);
    return newhouse.save();
};

/**
 * Returns the house details by id.
 *
 * @param houseId
*/
exports.get = (houseId) => {
    const housePromise = House.findById(houseId).exec();
    return housePromise;
};

/**
 * Updates an existing house details.
 *
 * @param updatedHouse
*/
exports.update = (updatedHouse) => {

    const promise = House.findByIdAndUpdate(updatedHouse.id, updatedHouse).exec();
    return promise;
};

/**
 * Deletes an existing house.
 *
 * @param houseId
*/
exports.delete = (houseId) => {
    const promise = House.findByIdAndRemove(houseId).exec();
    return promise;
};

