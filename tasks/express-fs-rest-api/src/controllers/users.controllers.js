const fs = require("fs");
const Users = require("../../data/users.json");
const { allowed, required } = require("../helpers/validation");
const AppError = require("../helpers/error");
const { sendResponse } = require("../helpers/response");
const User = require("../models/User.model");

const getUsers = (req, res) => {
    res.status(200).json({
        message: "success",
        data: [...Users]
    });
}

const getUserById = (req, res) => {
    const { id } = req.params;
    const user = Users.find((user) => user.id === id)
    if (!user) {
        throw new AppError({ statusCode: 404, message: "invalid id" });
    }
    return sendResponse(req, res, { statusCode: 200, data: user });
}


const validateUserCreate = (req, res, next) => {
    const { body } = req;
    const errors = required(body, ["name", "profileImage", "profileLink", "introduction"]);
    if (errors.length > 0) {
        const errHint = errors.map((error) => ({ field: error, message: "this field is required" }));
        throw new AppError({ statusCode: 422, message: "missing fields", hints: errHint });
    }
    next();
}

const createUser = (req, res) => {
    const user = new User(req.body);
    User.save(user)
        .then(() => sendResponse(req, res, { statusCode: 201, data: user }))
        .catch((err) => {
            throw new AppError(err, { statusCode: 500, message: "internal server error" })
        });
}


const validateUserUpdate = (req, res, next) => {
    const { body } = req;
    const { id } = req.params;
    const userIndex = Users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        throw new AppError({ statusCode: 400, message: "invalid id" });
    }
    // how safe is this
    // req.userIndex = userIndex;
    const errors = allowed(body, ["name", "profileImage", "profileLink", "introduction"]);
    if (errors.length > 0) {
        const errHint = errors.map((error) => ({ field: error, message: "this field cannot be set" }));
        throw new AppError({ statusCode: 422, message: "invalid fields", hints: errHint });
    }
    next();
}

const updateUser = (req, res) => {
    const { id } = req.params;
    // will definitely find a user
    const userIndex = Users.findIndex((user) => user.id === id);
    User.update(req.body, userIndex)
        .then(() => sendResponse(req, res, { message: "success", data: Users[userIndex] }))
        .catch((err) => {
            throw new AppError(err, { statusCode: 500, message: "internal server error" });
        });
}


const deleteUser = (req, res) => {
    const { id } = req.params;
    const userIndex = Users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        throw new AppError({ statusCode: 422, message: "invalid id" });
    }
    User.delete(userIndex)
        .then(() => res.status(200).json({ message: "success" }))
        .catch((err) => {
            throw new AppError({ statusCode: 500, message: "internal server error", err: err });
        })
}

module.exports = { 
    getUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser, 
    validateUserCreate, 
    validateUserUpdate 
};
