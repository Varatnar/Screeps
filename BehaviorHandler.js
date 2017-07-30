
let cst = require('Constants');

module.exports = function () {

    Creep.prototype.changeRole = function (role) {
        let self = this;

        self.memory.role = role;

        return role;
    };

    Creep.prototype.act = function () {
        let self = this;

        if(self.memory.role == cst.ROLE_HARVESTER) {
            self.say("!!");
            if(self.memory.task == undefined) {
                self.memory.task = cst.STATE_HARVESTING_SOURCE;
            }
            self.doTask();
            if(self.memory.task == cst.STATE_AWAITING_CHANGE) {
                self.findOutNextTask();
            }
        }

    };

    /**
     * Mapping of constant to actual task
     */
    Creep.prototype.doTask = function() {
        let self = this;

        switch (self.memory.task) {
            case cst.STATE_HARVESTING_SOURCE: self.harvestSource(); break;
            case cst.STATE_STORING_ENERGY_FOR_USE: self.bringEnergyBack(); break;
            default: console.log("ERROR WHEN DOING TASK");
        }
    };

    Creep.prototype.findOutNextTask = function() {
        let self = this;

        //todo change for pwetty stuff, this is awfull !!! CHANGE

        if(self.memory.lastTask == cst.STATE_HARVESTING_SOURCE) {
            self.memory.task = cst.STATE_STORING_ENERGY_FOR_USE;
        } else {
            self.memory.task = cst.STATE_HARVESTING_SOURCE;
        }
    };

};