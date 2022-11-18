const path = require("path");

module.exports = {
    get: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    }
}
