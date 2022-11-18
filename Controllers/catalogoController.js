const path = require("path");

module.exports = {
    get: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../Views/catalogo.html'));
    }
}
