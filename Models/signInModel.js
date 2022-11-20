const dao = require("./dao");
const objDao = new dao();

class signInModel {
    constructor() {
    }
    login(data) {
        var sql = 'SELECT * FROM users WHERE name = $1 AND password = $2';
        var params = [data.name, data.password];
        return objDao.execute_one(sql, params);
    }
}
module.exports = signInModel;

