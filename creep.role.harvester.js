var movement = require('movementUtilitary');

var roleHarvester = {

    run: function(creep, report) {
        if(creep.carry.energy == 0) {
            creep.memory.isBusy = false;
        }
	    if(creep.carry.energy < creep.carryCapacity && !creep.memory.isBusy) {
            var closestEnergyLocation = movement.acquirePathToTarget(creep, FIND_SOURCES, report);
            if (creep.harvest(closestEnergyLocation)) {
                creep.moveTo(closestEnergyLocation, {visualizePathStyle: {stroke: '#ffaa00'}});
	        }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            if (targets == "") {
                creep.memory.isBusy = true;
                targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                if(targets == "") {
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
	}
};


module.exports = roleHarvester;