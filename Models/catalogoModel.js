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
    guardarTanque(data) {
        var sql = 'INSERT INTO tanques (nombre,descripcion, precio, estado, tipo, capacidadlitros, diametro, volumen, espesor) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING idproducto';
        var params = [data.nombre, data.descripcion, data.precio, data.estado, data.tipo, data.capacidadlitros, data.diametro, data.volumen, data.espesor];
        return objDao.execute_one(sql, params);
    }
    guardarModulo(data) {
        var sql = 'INSERT INTO modulos (nombre,descripcion, precio, estado, tipo, medida, cantpersonas, cantpuertas, cantventanas ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING idproducto';
        var params = [data.nombre, data.descripcion, data.precio, data.estado, data.tipo, data.medida, data.cantpersonas, data.cantpuertas, data.cantventanas];
        return objDao.execute_one(sql, params);
    }
}

module.exports = catalogoModel;