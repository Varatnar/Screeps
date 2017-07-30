let cst = require('Constants');

const Harvester = function () {
    // Ratio of parts when spawning this type of creep
    this.role = cst.ROLES.HARVESTER;
    // Human readable (cost ratio is hard to evaluate
    this.partRatio = {
        work: 40,
        carry: 20,
        move: 40
    };
    // Cost ratio, to be used when finding out size of creeps
    this.costRatio = convertToEnergyCostRatio(this.partRatio);

    // Array of every task this job can execute ordered in a priority array (lower index value => more important)
    this.priority = [
        cst.STATE_HARVESTING_SOURCE,
        cst.STATE_STORING_ENERGY_FOR_USE
    ];

};

/**
 * Convert a part ratio into a cost ratio
 *
 * @param ratio The part ratio of the entity
 * @returns {{key:number}} Cost ratio as float in a dictionary
 */
function convertToEnergyCostRatio(ratio) {
    let total = 0;
    let analysedRatio = {};

    // Calculates total global cost
    for(let part in ratio) {
        let singleUpdateCost = ratio[part] * BODYPART_COST[part];

        total += singleUpdateCost;
        analysedRatio[part] = singleUpdateCost;
    }

    // Calculate weight of every part of cost
    for(let part in analysedRatio) {
        analysedRatio[part] = analysedRatio[part]/total;
    }

    console.log(JSON.stringify(analysedRatio));
    return analysedRatio;
}

/**
 *
 * @param ratio
 * @param energy
 * @returns {{key:number}}
 */
Harvester.prototype.getNumberOfPartForGivenEnergySupply = function (energy, ratio) {
    let self = this;
    if (ratio == undefined) {
        ratio = self.costRatio;
    }
    let totalCost = 0;
    let partQuantity = {};

    for(let part in ratio) {
        let partCounter = Math.floor((energy*ratio[part])/BODYPART_COST[part]);
        if (partCounter == 0) {partCounter = 1}
        totalCost += partCounter * BODYPART_COST[part];
        partQuantity[part] = partCounter;
    }

    if(totalCost > energy) {
        throw ERR_NOT_ENOUGH_ENERGY;
    }

    console.log(JSON.stringify(partQuantity));
    return partQuantity;
};

module.exports = Harvester;