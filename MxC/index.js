/*** index.js V1.0.0 2025-05-29 for Z-Way HA module MxC  ************/

//h-------------------------------------------------------------------------------
//h
//h Name:         index.js
//h Type:         Start code for Z-Way module MxC.js
//h Purpose:      
//h Project:      Z-Way HA
//h Usage:
//h Remark:
//h Result:
//h Examples:
//h Outline:      
//h Resources:    MxBaseModule
//h Issues:
//h Authors:      peb piet66
//h Version:      V1.0.0 2025-05-31/peb
//v History:      V1.0.0 2025-05-29/peb first version
//h Copyright:    (C) piet66 2025
//h License:      http://opensource.org/licenses/MIT
//h
//h-------------------------------------------------------------------------------
/*jshint esversion: 5 */
/*globals inherits, _module: true, MxBaseModule, executeFile */

//h-------------------------------------------------------------------------------
//h
//h Name:         MxC
//h Purpose:      class definition, inheritance.
//h
//h-------------------------------------------------------------------------------
function MxC(id, controller) {
    'use strict';
    // Call superconstructor first (AutomationModule)
    MxC.super_.call(this, id, controller);

    this.MODULE = 'index.js';
    this.VERSION = 'V1.0.0';
    this.WRITTEN = '2025-05-31/peb';
}
inherits(MxC, MxBaseModule);
_module = MxC;

//h-------------------------------------------------------------------------------
//h
//h Name:         init
//h Purpose:      module initialization.
//h
//h-------------------------------------------------------------------------------
MxC.prototype.init = function(config) {
    'use strict';
    MxC.super_.prototype.init.call(this, config);
    var self = this;

}; //init

MxC.prototype.init0 = function(config) {
    'use strict';
    var self = this;

    //b include MxC.js
    //--------------------------------
    var f = 'MxC.js';
    f = self.moduleBasePath() + '/' + f;
    self.log('reading ' + f + '...');
    executeFile(f);

    //b module start
    //--------------
    self.start(config);
}; //init0
