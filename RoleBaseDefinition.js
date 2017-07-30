let cst = require('Constants');
let harvester = new (require('Harvester'));

class RoleBaseDefinition {

    /**
     * Total value of 100
     */
    static getPartRatioForJob(role) {
        switch (role) {
            case cst.ROLES.HARVESTER:
                harvester.getNumberOfPartForGivenEnergySupply(100);
                return harvester.costRatio;
            case cst.ROLES.UPGRADER:
                return {
                };
            case cst.ROLES.BUILDER:
                return {
                };
            case cst.ROLES.REPAIRER:
                return {
                };
            default:
                throw ("ERROR WHEN RETRIEVING PART RATIO \n Role definition could be missing for : "+role);
        }
    }
}

module.exports = RoleBaseDefinition;