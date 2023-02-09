// specified fields are required
function required(body, fields) {
    let errors = [];
    fields.forEach((field) => {
        if (!body.hasOwnProperty(field)) {
            errors.push(field);
        }
    });
    return errors;
}

// only specified fields are allowed
function allowed(body, fields) {
    let errors = [];
    Object.keys(body).forEach((bodyField) => {
        if (!fields.includes(bodyField)) {
            errors.push(bodyField);
        }
    });
    return errors;
}


module.exports = { required, allowed };
