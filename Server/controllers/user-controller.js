'use strict';

const userService = require('../services/user-service');

/**
 * Sets response for user search.
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
    const promise = userService.search(params);
    const result = (users) => {
        response.status(200);
        response.json(users);
    };
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Creates a new user and sets the response.
 *
 * @param request
 * @param response
*/
exports.save = (request, response) => {
    const user = Object.assign({}, request.body);
    const result = (saveduser) => {
        response.status(201);
        response.json(saveduser);
    };
    const promise = userService.save(user);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Returns user response.
 *
 * @param request
 * @param response
*/
exports.get = (request, response) => {
    const userId = request.params.id;
    const result = (user) => {
        response.status(200);
        response.json(user);
    };
    const promise = userService.get(userId);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Updates the user resource.
 *
 * @param request
 * @param response
*/
exports.update = (request, response) => {
    const userId = request.params.id;
    const updateduser = Object.assign({}, request.body);
    updateduser.id = userId;
    const result = (user) => {
        response.status(200);
        response.json(user);
    };
    const promise = userService.update(updateduser);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Deletes a user resource.
 *
 * @param request
 * @param response
*/
exports.delete = (request, response) => {
    const userId = request.params.id;
    const result = () => {
        response.status(200);
        response.json({
            message: "User Successfully Deleted."
        });
    };
    const promise = userService.delete(userId);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Return user object matching ID
 * @param {*} response 
 */


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