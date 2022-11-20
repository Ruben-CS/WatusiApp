const dao = require("./dao");
const objDao = new dao();

class registerModel {
    constructor() {
    }
    guardarUsuario(data) {
        var sql = 'INSERT INTO users (name, password, rol, telefono, email) VALUES($1,$2,$3,$4,$5) RETURNING iduser';
        var params = [data.name, data.password, data.rol, data.telefono, data.email];
        return objDao.execute_one(sql, params);
    }
}

module.exports = registerModel;