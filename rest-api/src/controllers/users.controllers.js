const Users = require("../../data/users.json");
const User = require("../models/User.model");

// validation - required fields
function required(body, fields) {
    let errors = [];
    fields.forEach((field) => {
        if (!body.hasOwnProperty(field)) {
            errors.push(field);
        }
    });
    return errors;
}

// validation - allowed fields
function allowed(body, fields) {
    let errors = [];
    Object.keys(body).forEach((field) => {
        if (!fields.includes(field)) {
            errors.push(field);
        }
    });
    return errors;
}

const validateUserCreate = (req, res, next) => {
    const { body } = req;
    const errors = required(body, ["name", "profileImage", "profileLink", "introduction"]);
    if (errors.length > 0) {
        const errHint = errors.map((error) => ({ field: error, message: "this field is required" }));
        return res.status(422).json({ message: "failure", errors: errHint });
    }
    next();
}

const validateUserUpdate = (req, res, next) => {
    const { body } = req;
    const { id } = req.params;
    const userIndex = Users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return res.status(400).json({
            message: "invalid id"
        });
    }
    req.userIndex = userIndex;
    const errors = allowed(body, ["name", "profileImage", "profileLink", "introduction"]);
    if (errors.length > 0) {
        const errHint = errors.map((error) => ({ field: error, message: "this field cannot be set" }));
        return res.status(400).json({ message: "failure", errors: errHint })
    }
    next();
}

const getUsers = (req, res) => {
    res.status(200).json({
        message: "success",
        data: [...Users]
    });
}

const getUserById = (req, res) => {
    const { id } = req.params;
    const user = Users.find((user) => user.id === id)
    if (user) {
        return res.status(200).json({
            message: "success",
            data: user
        });
    }
    return res.status(404).json({ message: "failure" });
}


const createUser = (req, res) => {
    const user = new User(req.body);
    Users.push(user);
    return res.status(201).json({ message: "success", data: user });
}


const updateUser = (req, res) => {
    Object.assign(Users[req.userIndex], req.body);
    return res.status(200).json({ message: "success", data: Users[req.userIndex] });
}


const deleteUser = (req, res) => {
    const { id } = req.params;
    const userIndex = Users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return res.status(400).json({
            message: "invalid id"
        });
    }
    Users.splice(userIndex, 1);
    return res.status(200).json({ message: "success" });
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser, validateUserCreate, validateUserUpdate };
