const dao = require("./dao");
const objDao = new dao();
class catalogoModel {
    constructor() {
    }
    obtenerProductos() {
        var sql = 'SELECT * FROM producto ORDER BY 1';
        var params = [];
        return objDao.select(sql, params);
    }

}

module.exports = catalogoModel;