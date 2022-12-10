const dao = require("./dao");
const objDao = new dao();

class pedidoModel {
    constructor() {
    }
    guardarPedido(data_pedido, list_data_d) {
        var sql_m = 'INSERT INTO pedido (fechasolicitud, preciototal, estado, kmdesdescz, precioenvio, iduser) VALUES($1,$2,$3,$4,$5,$6) RETURNING idpedido';

        var params_m = [data_pedido.fechasolicitud, data_pedido.preciototal, data_pedido.estado, data_pedido.kmdesdescz, data_pedido.precioenvio, data_pedido.iduser];

        var sql_d = 'INSERT INTO detallepedido (idpedido, idproducto,cantidad, precioproducto, subtotal) VALUES($1,$2,$3,$4,$5)';
        var list_params_d = [];

        list_data_d.forEach(data_d => {
            var elem = [0, data_d.idproducto, data_d.cantidad, data_d.precioproducto, data_d.subtotal];
            list_params_d.push(elem);
        });
        return objDao.master_detail(sql_m, sql_d, params_m, list_params_d);
    }
    obtenerPedidos() {
        //var sql = 'SELECT * FROM pedido p INNER JOIN users u ON p.iduser = u.iduser';
        var sql = 'SELECT * FROM pedido';
        var params = [];
        return objDao.select(sql, params);
    }
    deshabilitarProducto(data) {
        var sql = 'UPDATE pedido SET estado=$1 WHERE idpedido=$2';
        var params = [data.estado, data.idproducto];
        return objDao.execute_none(sql, params);
    }
    changeStatus(data) {
        var sql = 'UPDATE pedido SET estado=$1 WHERE idpedido=$2';
        var params = [data.estado, data.idpedido];
        return objDao.execute_none(sql, params);
    }
}

module.exports = pedidoModel;