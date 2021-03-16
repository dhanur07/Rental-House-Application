'use strict';

const houseService = require('../services/house-service');

/**
 * Sets response for house search.
 *
 * @param request
 * @param response
*/
exports.list = (request, response) => {
    const totalQuery = request.query.total;
    const params = {};
    if (totalQuery) {
        params.total = totalQuery
    };
    const promise = houseService.search(params);
    const result = (houses) => {
        response.status(200);
        response.json(houses);
    };
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Creates a new house and sets the response.
 *
 * @param request
 * @param response
*/
exports.save = (request, response) => {
    const house = Object.assign({}, request.body);
    const result = (savedHouse) => {
        response.status(201);
        response.json(savedHouse);
    };
    const promise = houseService.save(house);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Returns house response.
 *
 * @param request
 * @param response
*/
exports.get = (request, response) => {
    const houseId = request.params.id;
    const result = (house) => {
        response.status(200);
        response.json(house);
    };
    const promise = houseService.get(houseId);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Updates the house resource.
 *
 * @param request
 * @param response
*/
exports.update = (request, response) => {
    const houseId = request.params.id;
    const updatedHouse = Object.assign({}, request.body);
    updatedHouse.id = houseId;
    const result = (house) => {
        response.status(200);
        response.json(house);
    };
    const promise = houseService.update(updatedHouse);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Deletes a house resource.
 *
 * @param request
 * @param response
*/
exports.delete = (request, response) => {
    const houseId = request.params.id;
    const result = () => {
        response.status(200);
        response.json({
            message: "House Successfully Deleted."
        });
    };
    const promise = houseService.delete(houseId);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    };
    return errorCallback;
};