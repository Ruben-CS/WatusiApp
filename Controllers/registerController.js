const path = require("path");
const registerModel = require('../Models/registerModel');
var model = new registerModel();
module.exports = {
    get: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../Views/register.html'));
    },
    GuardarUsuario: (req, res) => {
        var data = {
            iduser: req.body.iduser,
            name: req.body.name,
            password: req.body.password,
            rol: req.body.rol,
            telefono: req.body.telefono,
            email: req.body.email,
        };
        model.guardarUsuario(data).then(result => {
            res.type('json');
            res.send({ "Success": true, "Data": result.iduser });
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success": false, "Mensaje": error.message });
        });

    }
}
