const dao = require("./dao");
const objDao = new dao();
class catalogoModel {
    constructor() {
    }
    obtenerProductosDisponibles() {
        var sql = 'SELECT * FROM producto WHERE estado=true ORDER BY 1';
        var params = [];
        return objDao.select(sql, params);
    }
}

module.exports = catalogoModel;