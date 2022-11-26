const dao = require("./dao");
const objDao = new dao();
class administrarModel {
    constructor() {
    }
    obtenerProductos() {
        var sql = 'SELECT * FROM producto ORDER BY 1';
        var params = [];
        return objDao.select(sql, params);
    }
    obtenerTanques() {
        var sql = 'SELECT * FROM tanques ORDER BY 1';
        var params = [];
        return objDao.select(sql, params);
    }
    obtenerModulos() {
        var sql = 'SELECT * FROM modulos ORDER BY 1';
        var params = [];
        return objDao.select(sql, params);
    }
    deshabilitarProducto(data) {
        var sql = 'UPDATE producto SET estado=$1 WHERE idproducto=$2';
        var params = [data.estado, data.idproducto];
        return objDao.execute_none(sql, params);
    }
    eliminarProducto(data) {
        var sql = 'DELETE FROM producto WHERE idproducto=$1'
        var params = [data.idproducto];
        return objDao.execute_none(sql, params);
    }
    guardarTanque(data) {
        var sql = 'INSERT INTO tanques (nombre,descripcion, precio, estado, tipo, capacidadlitros, diametro, volumen, espesor) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING idproducto';
        var params = [data.nombre, data.descripcion, data.precio, data.estado, data.tipo, data.capacidadlitros, data.diametro, data.volumen, data.espesor];
        return objDao.execute_one(sql, params);
    }
    modificarTanque(data) {
        var sql = 'UPDATE tanques SET nombre=$1, descripcion=$2, precio=$3, estado=$4, tipo=$5, capacidadlitros=$6, diametro=$7, volumen=$8, espesor=$9 WHERE idproducto=$10';
        var params = [data.nombre, data.descripcion, data.precio, data.estado, data.tipo, data.capacidadlitros, data.diametro, data.volumen, data.espesor, data.idproducto];
        return objDao.execute_none(sql, params);
    }
    guardarModulo(data) {
        var sql = 'INSERT INTO modulos (nombre,descripcion, precio, estado, tipo, medida, cantpersonas, cantpuertas, cantventanas ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING idproducto';
        var params = [data.nombre, data.descripcion, data.precio, data.estado, data.tipo, data.medida, data.cantpersonas, data.cantpuertas, data.cantventanas];
        return objDao.execute_one(sql, params);
    }
    modificarModulo(data) {
        var sql = 'UPDATE modulos SET nombre=$1, descripcion=$2, precio=$3, estado=$4, tipo=$5, medida=$6, cantpersonas=$7, cantpuertas=$8, cantventanas=$9 WHERE idproducto=$10';
        var params = [data.nombre, data.descripcion, data.precio, data.estado, data.tipo, data.medida, data.cantpersonas, data.cantpuertas, data.cantventanas, data.idproducto];
        return objDao.execute_none(sql, params);
    }

}

module.exports = administrarModel;