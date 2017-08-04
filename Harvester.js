let cst = require('Constants');
let Utils = require('Utils');

const Harvester = function () {
    // Ratio of parts when spawning this type of creep
    this.role = cst.ROLES.HARVESTER;
    // Human readable (cost ratio is hard to evaluate
    this.partRatio = {
        work: 35,
        carry: 30,
        move: 35
    };
    // Cost ratio, to be used when finding out size of creeps
    this.costRatio = Utils.convertToEnergyCostRatio(this.partRatio);

    // Array of every task this job can execute ordered in a priority array (lower index value => more important)
    this.priority = [
        cst.STATE_HARVESTING_SOURCE,
        cst.STATE_STORING_ENERGY_FOR_USE
    ];

};

module.exports = Harvester;