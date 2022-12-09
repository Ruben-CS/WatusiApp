const promise = require('bluebird');
var pgp = require("pg-promise")();
var db = pgp("postgres://postgres:11396752Sc@localhost:5432/bdfinalproject");
//var db = pgp("postgres://postgres:11396752Sc@localhost:5432/bdfinalproject1");

class dao {
    constructor() {
    }
    select(sql, params = []) {
        return new promise((resolve, reject) => {
            db.any(sql, params).then(data => {
                resolve(data);
            }) .catch(function (err) {
                console.log('Error running sql ' + sql);
                console.log(err);
                reject(err);
            });
        });
    }
    transaccion(sql, params = []) {
        return new promise((resolve, reject) => {
            db.tx(sql, params).then(data => {
                resolve(data);
            }).catch(function (err) {
                console.log('Error running sql ' + sql);
                console.log(err);
                reject(err);
            });
        });
    }
    execute_one(sql, params = []) {
        return new promise((resolve, reject) => {
            db.one(sql, params).then( function(data) {
                resolve(data);
            }) .catch(function (err) {
                console.log('Error running sql ' + sql);
                console.log(err);
                reject(err);
            });
        });
    }
    execute_none(sql, params = []) {
        return new promise((resolve, reject) => {
            db.none(sql, params).then( function() {
                resolve();
            }) .catch(function (err) {
                console.log('Error running sql ' + sql);
                console.log(err);
                reject(err);
            });
        });
    }
    master_detail(sql_master, sql_detail, params_m = [], list_params_d = []) {
        return new promise((resolve, reject) => {
            db.tx(async t => {
                const id = await t.one(sql_master, params_m, a => +a.idpedido);
                list_params_d.forEach(async params_d => {
                    params_d[0] = id;
                    await t.none(sql_detail, params_d);
                });
                return id;
            }).then(data => {
                resolve(data);
            }).catch(function (err) {
                console.log('Error running sql ' + sql_master + ' ' + sql_detail);
                console.log(err);
                reject(err);
            });
        });
    }
}

module.exports = dao;