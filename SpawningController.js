// Utilities
let cst = require('Constants');
let Utils = require("Utils");

// Job template object
let HarvesterTemplate = require('Harvester');

module.exports = function () {

    /**
     * Iterate through all the different jobs and make sure the correct number of
     * creeps for every job is met.
     *
     * @param energy Max energy used for spawning an individual creep
     */
    Spawn.prototype.spawnCreeps = function(energy) {
        let self = this;

        console.log("=== spawnCreeps ===");

        if(energy == undefined) {
            energy = 300; //todo hardcoding energy (has to be changed)
        }

        for (let job in cst.ROLES) {
            if(needToSpawnCreep(job)) {
                // Need to spawn creep with this job
                self.spawnNewCreepWithJob(job, energy);
            }
            //RoleBaseDefinition.getPartRatioForJob(cst.ROLES[job]);

        }
        console.log("=== !spawnCreeps ===")
        //self.createCreep(body, null, null)
    };

    Spawn.prototype.spawnNewCreepWithJob = function(job) {
        let template = acquireTemplateObjectForJob(job);

    };

    /**
     * Check if the quota of creeps for given job is met
     *
     * @param job Job being evaluated
     * @returns {boolean} True if quota is NOT met
     */
    let needToSpawnCreep = function (job) {

        let creepRoleQuantity = (_.filter(Game.creeps, (c) => c.memory.role == cst.ROLES[job])).length;
        console.log(job + " : " + creepRoleQuantity + "/"+cst.QUANTITY[job]);

        return (creepRoleQuantity < cst.QUANTITY[job]);
    };

    let acquireTemplateObjectForJob = function (job) {

        switch (cst.ROLES[job]) {
            case cst.ROLES.HARVESTER:
                return new HarvesterTemplate();
            case cst.ROLES.UPGRADER:
                return {};
            case cst.ROLES.BUILDER:
                return {};
            case cst.ROLES.REPAIRER:
                return {};
            default:
                console.log("ERROR WHEN RETRIEVING PART RATIO \n Job definition could be missing for : " + job);
        }

    };

    function createPartArray(energy, ratio) {

    }

};