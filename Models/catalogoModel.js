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
    AgregarProductoPedido(){

        let sql = `INSERT INTO productopedido (precioproducto, cantidad) VALUES ($1,$2) RETURNING idProducto`;
        let params = [data.nombre, data.descripcion, data.precio, data.cantidad, data.idtipo];
        return objDao.execute_one(sql, params);

        /*let sql = `INSERT INTO productopedido (Nombre, Descripcion, Precio, Cantidad, idTipo) VALUES ($1,$2,$3,$4,$5) RETURNING idProducto`;
        let params = [data.nombre, data.descripcion, data.precio, data.cantidad, data.idtipo];
        return objDao.execute_one(sql, params);*/
    }
}

module.exports = catalogoModel;