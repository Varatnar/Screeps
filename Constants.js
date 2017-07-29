
module.exports = {
    STATE_IDLE: 0,
    // When harvesting energy
    STATE_HARVESTING_SOURCE: 1,
    // When full of energy (or special trigger) on its way back to store said energy in expansions or spawns
    STATE_STORING_ENERGY_FOR_USE: 2,
    // When done with last task
    STATE_AWAITING_CHANGE: 999,




    // ROLES - JOBS
    ROLE_HARVESTER: 1,
    ROLE_BUILDER: 2,
    ROLE_REPAIRER: 3,
    ROLE_UPGRADER: 4
};
