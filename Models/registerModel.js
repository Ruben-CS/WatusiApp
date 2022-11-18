const dao = require("./dao");
const objDao = new dao();

class registerModel {
    constructor() {
    }
    guardarUsuario(data) {
        var sql = 'INSERT INTO users (name, password) VALUES($1,$2) RETURNING iduser';
        var params = [data.name, data.password];
        return objDao.execute_one(sql, params);
    }
}

module.exports = registerModel;