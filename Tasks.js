// Harvest
// Drop resources
//  |-> multiples
// Build
//  |-> priorities ?
// Upgrade
// Repair

let movement = require('movementUtilitary');
let cst = require('Constants');


module.exports = function () {

    Creep.prototype.changeTask = function (task) {
        let self = this;

        if (task == cst.STATE_AWAITING_CHANGE) {
            self.memory.lastTask = self.memory.task;
        }

        self.memory.task = task;

        return task;
    };

    /**
     * Tasking a creep to go harvest some energy
     *
     * This should be ready to change task when
     *    a) There is no more space available to store energy
     *       i)  If carryCapacity > 0 AND carry.energy == carryCapacity => ready to change task  (DONE)
     *       ii) If carryCapacity == 0 AND ground container is full                              (NOT DONE)
     *    b) External trigger                                                                    (NOT DONE)
     */
    Creep.prototype.harvestSource = function () {
        let self = this;

        self.changeTask(cst.STATE_HARVESTING_SOURCE);

        let closestEnergyLocation = movement.acquirePathToTarget(self, FIND_SOURCES);
        if (self.harvest(closestEnergyLocation) == ERR_NOT_IN_RANGE) {
            self.moveTo(closestEnergyLocation, {visualizePathStyle: {stroke: '#ff4499'}});
        }

        if(self.carryCapacity > 0 && self.carry.energy >= self.carryCapacity ) {
            // Done harvesting
            self.changeTask(cst.STATE_AWAITING_CHANGE)
        }

    };

    /**
     * Tasking a creep to go store energy inside an extension or a spawner ready for spawning more creeps
     *
     * This should be ready to change task when
     *    a) The creep has no more energy in storage                                            (DONE)
     *    b) The is no valid extension or spawner to fill                                       (DONE)
     *    c) External trigger                                                                   (NOT DONE)
     */
    Creep.prototype.bringEnergyBack = function () {
        let self = this;

        self.changeTask(cst.STATE_STORING_ENERGY_FOR_USE);

        let targets = self.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity;
            }
        });
        if (targets.length > 0) {
            if (self.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                self.moveTo(targets[0], {visualizePathStyle: {stroke: '#666666'}});
            }
        }


        // Changing state triggers

        if(self.carry.energy == 0) {
            // Done storing energy
            self.changeTask(cst.STATE_AWAITING_CHANGE);
            return;
        }

        if(targets.length == 0) {
            self.changeTask(cst.STATE_AWAITING_CHANGE);
        }
    }


};
