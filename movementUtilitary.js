module.exports = {
    
    /** 
     * @param creep The creep
     * @param type What kind of target to find
     * @param report The current report object
    **/
    acquirePathToTarget: function(creep, type , report) {
        
        var location;
    
        switch(type) {
            case FIND_SOURCES:
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                if (source) {
                    location = source;
                } else {
                    report.cantGetSource();
                }
            ;
        }
        return location
    }
    // moveToLocation: function(creep, destination) {
    //     console.log('in moving')
    //     creep.moveTo(destination);
    // }
};