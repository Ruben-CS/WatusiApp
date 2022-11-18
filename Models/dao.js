const promise = require('bluebird');
var pgp = require("pg-promise")();
var db = pgp("postgres://postgres:11396752Sc@localhost:5432/BDFinalProject");

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
}

module.exports = dao;