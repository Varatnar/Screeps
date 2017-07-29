/**
 *
 * @constructor
 */
function Report() {
    this.lastTick = Memory.report.lastTick | null;
    this.tickCounter = Memory.report.tickCounter | null;
    this.cantGetSourceCount = Memory.report.cantGetSourceCount | 0;

    // Energy
    this.energyIn = Memory.report.energyIn | 0;
    this.energyUsed = Memory.report.energyUsed | 0;
    this.energyPer100Tick = Memory.report.energyPer100Tick | 0;
}

Report.prototype.cantGetSource = function() {
    let self = this;

    self.cantGetSourceCount ++;
};

Report.prototype.addEnergy = function(energyAmount) {
    let self = this;

    self.energyIn += energyAmount;
};

Report.prototype.removeEnergy = function (energyAmount) {
    let self = this;

    self.energyUsed -= energyAmount;
};

Report.prototype.getNetEnergyGain = function() {
    let self = this;

    let total = self.energyIn - self.energyUsed;

    console.log("Net energy gain : "+total);

    return total;
};

Report.prototype.resetTick = function () {
    this.tickCounter = 0;
};

Report.prototype.commitToMemory = function() {
    let self = this;

    self.lastTick = Game.time;
    self.tickCounter ++;

    Memory.report = self;
};


module.exports = Report;