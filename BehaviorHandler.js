
let cst = require('Constants');

module.exports = function () {

    Creep.prototype.changeRole = function (role) {
        let self = this;

        self.memory.role = role;

        return role;
    };

    Creep.prototype.act = function () {
        let self = this;

    };

    function assignTask() {

    }
};