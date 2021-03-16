'use strict';

const favoriteService = require('../services/favorite-service');

/**
 * Sets response for favorite search.
 *
 * @param request
 * @param response
*/
exports.list = (request, response) => {
    const totalQuery = request.query.total;
    const params = {};
    if(totalQuery) {
        params.total = totalQuery
    };
    const promise = favoriteService.search(params);
    const result = (favorites) => {
        response.status(200);
        response.json(favorites);
    };
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Creates a new favorite and sets the response.
 *
 * @param request
 * @param response
*/
exports.save = (request, response) => {
    const favorite = Object.assign({}, request.body);
    const result = (savedfavorite) => {
        response.status(201);
        response.json(savedfavorite);
    };
    const promise = favoriteService.save(favorite);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Returns favorite response.
 *
 * @param request
 * @param response
*/
exports.get = (request, response) => {
    const favoriteId = request.params.id;
    const result = (favorite) => {
        response.status(200);
        response.json(favorite);
    };
    const promise = favoriteService.get(favoriteId);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Updates the favorite resource.
 *
 * @param request
 * @param response
*/
exports.update = (request, response) => {
    const favoriteId = request.params.id;
    const updatedfavorite = Object.assign({}, request.body);
    updatedfavorite.id = favoriteId;
    const result = (favorite) => {
        response.status(200);
        response.json(favorite);
    };
    const promise = favoriteService.update(updatedfavorite);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Deletes a favorite resource.
 *
 * @param request
 * @param response
*/
exports.delete = (request, response) => {
    const favoriteId = request.params.id;
    const result = () => {
        response.status(200);
        response.json({
            message: "favorite Successfully Deleted."
        });
    };
    const promise = favoriteService.delete(favoriteId);
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