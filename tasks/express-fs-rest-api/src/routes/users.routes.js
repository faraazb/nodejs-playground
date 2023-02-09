const express = require("express");
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    validateUserCreate,
    validateUserUpdate
} = require("../controllers/users.controllers");


const router = express.Router();

router.route("")
    .get(getUsers)
    .post(validateUserCreate, createUser);

router.route("/:id")
    .get(getUserById)
    .patch(validateUserUpdate, updateUser)
    .delete(deleteUser);


module.exports = router;
