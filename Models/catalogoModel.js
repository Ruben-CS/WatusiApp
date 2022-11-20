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

    /*obtenerProductos(data) {
        var sql = 'INSERT INTO producto (nombre, descripcion, precio, estado, tipo) VALUES($1,$2,$3,$4,$5) RETURNING idproducto';
        var params = [data.nombre, data.descripcion, data.precio, data.estado, data.tipo];
        return objDao.execute_one(sql, params);
    }*/
}

module.exports = catalogoModel;