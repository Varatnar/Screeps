var movement = require('movementUtilitary');

var repairer = {
    run: function(creep, report) {
        if(creep.memory.isRepairing && creep.carry.energy == 0) {
            creep.memory.isRepairing = false;   
        }
        
        if(!creep.memory.isRepairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.isRepairing = true;   
        }
        
        if(!creep.memory.isRepairing) {
            var closestEnergyLocation = movement.acquirePathToTarget(creep, FIND_SOURCES, report);
            if (creep.harvest(closestEnergyLocation)) {
                creep.moveTo(closestEnergyLocation, {visualizePathStyle: {stroke: '#ffaa00'}});
	        }
        } else if (creep.memory.isRepairing) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter :object => object.hits < object.hitsMax
            });
            
            targets.sort((a,b) => a.hits - b.hits);
            
            if(targets.length) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }

            if(targets == "") {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } else {
            console.log("ERROR WITH REPAIRER")
        }
    }
}
module.exports = repairer;