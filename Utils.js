let cst = require('Constants');

let Utils = {};

/**
 * Convert a part ratio into a cost ratio
 *
 * @param ratio The part ratio of the entity
 * @returns {{key:number}} Cost ratio as float in a dictionary
 */
Utils.convertToEnergyCostRatio = function (ratio) {
    let total = 0;
    let analysedRatio = {};

    // Calculates total global cost
    for (let part in ratio) {
        let singleUpdateCost = ratio[part] * BODYPART_COST[part];

        total += singleUpdateCost;
        analysedRatio[part] = singleUpdateCost;
    }

    // Calculate weight of every part of cost
    for (let part in analysedRatio) {
        analysedRatio[part] = analysedRatio[part] / total;
    }

    console.log(JSON.stringify(analysedRatio));
    return analysedRatio;
};

/**
 * Find out how many part can be built given a certain ratio and energy limit
 *
 * @param energy      Total max energy to be used on one creep
 * @param {{}}ratio   Dictionary with the % of the total cost each [key] should try to use
 * @returns {{}}      Dictionary with the # instance of each part
 */
Utils.getNumberOfPartForGivenEnergySupply = function (energy, ratio) {
    let totalCost = 0;
    let partQuantity = {};

    for(let part in ratio) {
        let partCounter = Math.floor((energy*ratio[part])/BODYPART_COST[part]);
        if (partCounter == 0) {partCounter = 1}
        totalCost += partCounter * BODYPART_COST[part];
        partQuantity[part] = partCounter;
    }

    if(totalCost > energy) {
        console.log("Value exceed minimum energy !!")
        return {};
    }

    console.log(JSON.stringify(partQuantity));
    return partQuantity;
};

Utils.getPartArrayForCreepWithNumberOfPart = function (partArray) {



    return partArray;
};

module.exports = Utils;