let RoleBaseDefinition = require('RoleBaseDefinition')
let cst = require('Constants');

module.exports = function () {

    Spawn.prototype.spawnCreeps = function() {
        let self = this;

        let ratio;
        for (let job in cst.ROLES) {
            ratio = RoleBaseDefinition.getPartRatioForJob(cst.ROLES[job]);

        }
        //self.createCreep(body, null, null)
    };

    function createPartArray(energy, ratio) {

    }

};