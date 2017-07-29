module.exports = {
    controlSpawnOfWorker: function() {
        let tempNumberOfCustomSpawn = 1;

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

        if (this < tempNumberOfCustomSpawn) {

        }
    }
};