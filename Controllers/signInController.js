const path = require("path");
const signInModel = require('../Models/signInModel');
var model = new signInModel();
const bcrypt = require('bcrypt');

module.exports = {
    get: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../Views/signin.html'));
    },
    Login: (req, res) => {
        let data = {
            name: req.body.name,
            password: req.body.password
        };
        model.login(data).then(result => {
            res.type('json');
            res.send({ "Success": true, "Data": result.iduser });
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success": false, "Mensaje": error.message });
        });
    }
}
