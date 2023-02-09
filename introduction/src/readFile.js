const fs = require("fs");

const readFile = (path, encoding = "utf-8") => new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (err, data) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(data);
        }
    })
});

module.exports = readFile;

