var harvesterController = require('creep.role.harvester');
var upgraderController = require('creep.role.upgrader');
var builderController = require('creep.role.builder');
var repairerController = require('creep.role.repair');

var Report = require('reportGenerator');

var mainBase = Game.spawns['Erhka'];

// Prototype extensions
require('Tasks')();
require('BehaviorHandler')();

// Constants
let cst = require('Constants');


module.exports.loop = function () {

    // TESTING LINES START

    let report = new Report();

    // TESTING LINES END

    var harvestersCount = 6;
    var upgradersCount = 1;
    var buildersCount = 1;
    var repairerCount = 1;

    // Upgrader handler
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if (upgraders.length < upgradersCount) {
        mainBase.createCreep([WORK, CARRY, MOVE], null, {role: 'upgrader'});
        console.log("New Upgrader built");
    }

    // Harvester handler
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if (harvesters.length < harvestersCount) {
        if (mainBase.createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], null, {role: 'harvester'}) == ERR_NOT_ENOUGH_ENERGY) {
            console.log("Not enough energy")
        }
    }

    // Builder handler
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if (builders.length < buildersCount) {
        mainBase.createCreep([WORK, CARRY, MOVE], null, {role: 'builder'});
        console.log("New Builder built");
    }
    
    // Repairer handler
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    if (repairers.length < repairerCount) {
        mainBase.createCreep([WORK, CARRY, MOVE], null, {role: 'repairer'});
        console.log("New Repairer built");
    }
    
    
    // Main Task assignation
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            harvesterController.run(creep, report);
        }
        
        if (creep.memory.role == 'upgrader') {
            upgraderController.run(creep, report);
        }
        
        if (creep.memory.role == 'builder') {
            builderController.run(creep, report);
        }
        
        if (creep.memory.role == 'repairer') {
            repairerController.run(creep, report);
        }

        creep.act();
    }

    for(let i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    report.commitToMemory();
};