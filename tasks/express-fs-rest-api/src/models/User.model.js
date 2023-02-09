const fsPromises = require("fs/promises");
const path = require("path");
const Users = require("../../data/users.json");


// some env var might be better than process.cwd()?
const DATA_PATH = path.resolve(process.cwd(), "./", "data/", "users.json")


function User(user) {
    const { id, name, profileImage, introduction, profileLink } = user;
    this.id = id || Math.random().toString(36).substring(2);
    this.name = name;
    this.profileImage = profileImage;
    this.profileLink = profileLink;
    this.introduction = introduction;
}


// create, update, delete user instances to the JSON file
User.save = function (user) {
    Users.push(user);
    return fsPromises.writeFile(DATA_PATH, JSON.stringify(Users));
}

User.update = function (user, index) {
    Object.assign(Users[index], user);
    return fsPromises.writeFile(DATA_PATH, JSON.stringify(Users));
}

User.delete = function (index) {
    Users.splice(index, 1);
    return fsPromises.writeFile(DATA_PATH, JSON.stringify(Users));
}

module.exports = User;
