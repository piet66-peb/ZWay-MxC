/*** MxC.js V1.0.0 2025-05-29 Z-Way HA module **********************/

//h-------------------------------------------------------------------------------
//h
//h Name:         MxC.js
//h Type:         Helper module for MxChartDB: Define constants for all charts.
//h Project:      Z-Way HA
//h Usage:        
//h Remark:       
//h Result:       
//h Examples:     
//h Outline:      
//h Resources:    MxBaseModule
//h Issues:       
//h Authors:      peb piet66
//h Version:      V1.0.0 2025-06-01/peb
//v History:      V1.0.0 2025-05-29/peb first version
//v               [x]fixed
//v               [*]reworked, changed
//v               [-]removed
//v               [+]added
//h Copyright:    (C) piet66 2022
//h License:      http://opensource.org/licenses/MIT
//h 
//h-------------------------------------------------------------------------------

/*jshint esversion: 5 */
/*globals MxC, http, constants, executeFile */

///h-------------------------------------------------------------------------------
//h
//h Name:         start
//h Purpose:      module start.
//h
//h-------------------------------------------------------------------------------
MxC.prototype.start = function(config) {
    'use strict';
    var self = this;

    self.MODULE = 'MxC.js';
    self.VERSION = 'V1.0.0';
    self.WRITTEN = '2025-06-01/peb';

    self.LEAST_API_VERSION = '1.1.0';

    //b remove obsolete configuration parameters/ add new
    //---------------------------------------------------

    //b global variables
    //------------------
    self.log(' *** config.IndexDBName', config.IndexDBName);
    self.log(' *** config.MxC_table', config.MxC_table);
    self.log(' *** config.MxC', config.MxC);

    //b read constants.js
    //-------------------
    var f = 'MxChartDB/htdocs/constants.js';
    f = self.moduleBasePath() + '/../' + f;
    self.info('executing ' + f + '...');
    executeFile(f);
    //don't permanently link to constants file:
    self.constantsjs = self.realCopyObject(constants);

    //b reorder constants
    //-------------------
    if (self.constantsjs.hasOwnProperty('zway_app')) {
        if (self.constantsjs.zway_app.ip) {
            self.constantsjs.ip = self.constantsjs.zway_app.ip;
        }
        if (self.constantsjs.zway_app.hostname) {
            self.constantsjs.hostname = self.constantsjs.zway_app.hostname;
        }
        if (self.constantsjs.zway_app.retry_init_min) {
            self.constantsjs.retry_init_min = 
                self.constantsjs.zway_app.retry_init_min;
        }
    }
    self.log('self.constantsjs.ip', self.constantsjs.ip,
        'self.constantsjs.hostname', self.constantsjs.hostname);

    //b check configuration
    //---------------------
    // for check ip address for validity:
    //      // ipv4:
    //      var regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
    // ipv4 + ipv6 combined:
    var regexExp = /(?:^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$)|(?:^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$)/gm;

    self.err = undefined;
    if (!self.constantsjs.ip && !self.constantsjs.hostname) {
        self.err = 'no server ip/ hostname defined';
    } else
    if (self.constantsjs.ip && self.constantsjs.ip === '') {
        self.err = 'server ip is malformed';
    } else
    if (self.constantsjs.ip && !regexExp.test(self.constantsjs.ip)) {
        self.err = 'server ip is invalid';
    } else
    if (!self.constantsjs.ip && self.constantsjs.hostname === '') {
        self.err = 'server hostname is malformed';
    } else
    if (!self.constantsjs.port) {
        self.err = 'no server port defined';
    } else
    if (!self.constantsjs.username) {
        self.err = 'no username defined';
    } else
    if (self.constantsjs.username === '') {
        self.err = 'no username defined';
    } else
    if (!self.constantsjs.password) {
        self.err = 'no password defined';
    } else
    if (self.constantsjs.password === '') {
        self.err = 'no password defined';
    } else
    if (!self.constantsjs.retry_init_min) {
        self.err = 'retry_init_min not defined';
    } else
    if (!Number.isInteger(self.constantsjs.retry_init_min)) {
        self.err = 'retry_init_min is not an integer';
    } else
    if (self.constantsjs.retry_init_min < 1) {
        self.err = 'retry_init_min must be a positive integer';
    }
    if (self.err) {
        self.notifyError(self.err);
        throw self.err;
    }
    self.api = (self.constantsjs.ip || self.constantsjs.hostname) + ':' + 
        self.constantsjs.port;
    self.log(' *** self.api', self.api);

    //b start initialization with id specific delay
    //---------------------------------------------
    self.timerId_delay = setTimeout(function() {
        self.timerId_delay = undefined;
        self.initExec(config);
    }, self.id * 2);
}; //start

//h-------------------------------------------------------------------------------
//h
//h Name:         stop
//h Purpose:      module stop.
//h
//h-------------------------------------------------------------------------------
MxC.prototype.stop = function() {
    'use strict';
    var self = this;

    //b delete timer
    //--------------
    if (self.timerId_delay) {
        self.log('clearing timer timerId_delay...');
        clearTimeout(self.timerId_delay);
        self.timerId_delay = undefined;
    }
    if (self.timerId_retry) {
        self.log('clearing timer timerId_retry...');
        clearTimeout(self.timerId_retry);
        self.timerId_retry = undefined;
    }

    MxC.super_.prototype.stop.call(this);
}; //stop

//h-------------------------------------------------------------------------------
//h
//h Name:         initExec
//h Purpose:      module execution.
//h
//h-------------------------------------------------------------------------------
MxC.prototype.initExec = function(config) {
    'use strict';
    var self = this;

    function to_timestamp(datetime) {
        if (!datetime) {return null;}
        return new Date(datetime).getTime();
    }

    //b prepare MxC table data
    //------------------------
    var MxC = {};
    config.MxC.forEach(function(item, index) {
        if (item.MxC_name) {
            if (typeof MxC[item.MxC_name] === 'undefined') {
                MxC[item.MxC_name] = [];
            }
            MxC[item.MxC_name].push(
                [ to_timestamp(item.valid_from),
                  item.valid_from || null,
                  item.MxC_value || null,
                  item.MxC_type || null,
                  item.comment
                ]);
        }
    });

    //b get API version (=>ajax_get)
    //------------------------------
    self.log('*** request api version');
    var url_get = '../version';
    self.ajax_get(
        config,
        url_get,
        function(response) {
            self.log(response);
            if (isVersionOK(response.data.VERSION.substr(1),
                    self.LEAST_API_VERSION.substr(1))) {
                check_create_default_db(config);
            } else {
                self.notifyError(response.data.MODULE + ' version too old' +
                    '<br>current: ' + response.data.VERSION +
                    '<br>required: ' + self.LEAST_API_VERSION);
                check_create_default_db(config);
            }
        },
        function(response) {
            self.checkRetry(config, response, 
                'requesting MxChartDB_API.py version');
        },
        config.IndexDBName
    );

    function isVersionOK(currVersion, requestVersion) {
        self.log('*** isVersionOK');

        var currVersionArr = currVersion.split('.');
        var requestVersionArr = requestVersion.split('.');

        for (var i = 0; i < requestVersionArr.length; i++) {
            if (currVersionArr[i] * 1 < requestVersionArr[i] * 1) {
                return false;
            }
            if (currVersionArr[i] * 1 > requestVersionArr[i] * 1) {
                return true;
            }
        }
        return true;
    } //isVersionOK

    function check_create_default_db(config) {
        self.log('*** check_create_default_db ' + config.IndexDBName);

        //b check/ create db server + database (=>ajax_post)
        //--------------------------------------------------
        var url_create = 'create_db';
        self.ajax_post(
            config,
            url_create,
            undefined,
            function() {
                self.log('database ' + config.IndexDBName +
                    ' created/ already existing');
                check_constants_table(config);
            },
            function(response) {
                self.checkRetry(config, response, 'creating database ' +
                    config.IndexDBName);
            },
            config.IndexDBName
        );
    } //check_create_default_db

    function check_constants_table(config) {
        self.log('*** check_constants_table ' + config.IndexDBName);

        var url_check = config.MxC_table + '/check_table';
        self.ajax_get(
            config,
            url_check,
            function() {
                self.log('table ' + config.MxC_table + ' checked, existing');
                write_constants_table(config);
            },
            function() {
                self.log('table ' + config.MxC_table + ' not existing');
                create_constants_table(config);
            },
            config.IndexDBName
        );
    } //check_constants_table

    function create_constants_table(config) {
        self.log('*** create_constants_table ' + config.IndexDBName);

        var url_create = config.MxC_table + '/create_table';
        self.ajax_post(
            config,
            url_create,
            undefined,
            function() {
                self.log('table ' + config.MxC_table + ' created');
                write_constants_table(config);
            },
            function(response) {
                self.checkRetry(config, response, 'creating table ' + 
                    config.MxC_table);
            },
            config.IndexDBName
        );
    } //create_constants_table

    function write_constants_table(config) {
        self.log('*** write_constants_table ' + config.MxC_table);
        var now = Date.now(); //milliseconds

        var url_insert = config.MxC_table + '/insert?ts_del=' + now + '&';
        url_insert += 'self=' + self.id; //for analysis only
        self.ajax_post(
            config,
            url_insert, {
                ts: now,
                val: MxC
            },
            'success: constants table written',
            function(response) {
                self.checkRetry(config, response, 'writing table ' + 
                    config.MxC_table);
            },
            config.IndexDBName
        );
    } //write_constants_table
}; //initExec

//h-------------------------------------------------------------------------------
//h
//h Name:         ajax_get
//h Purpose:      
//h
//h-------------------------------------------------------------------------------
MxC.prototype.ajax_get = function(config, urlPath, success, failure, database) {
    'use strict';
    var self = this;
    self.log('*** ajax_get', urlPath, database);

    function failureF(response) {
        if (typeof failure === 'string') {
            self.log(failure);
        } else
        if (typeof failure === 'function') {
            failure(response);
        }
    }

    function successF(response) {
        if (typeof success === 'string') {
            self.log(success);
        } else
        if (typeof success === 'function') {
            success(response);
        }
    }

    var url = self.api + '/' + database + '/' + urlPath;
    self.log('ajax_get url =', url);
    var request = {
        url: url,
        method: 'GET',
        auth: {
            "login": self.constantsjs.username,
            "password": self.constantsjs.password
        },
        async: true,
        success: function(response) {
            successF(response);
        },
        error: function(response) {
            failureF(response);
        }
    };
    http.request(request);
}; //ajax_get

//h-------------------------------------------------------------------------------
//h
//h Name:         ajax_post
//h Purpose:      
//h
//h-------------------------------------------------------------------------------
MxC.prototype.ajax_post = function(config, urlPath, data, success, failure, database) {
    'use strict';
    var self = this;
    self.log('*** ajax_post', urlPath, database);

    var dataC = data;
    if (data) {
        if (typeof data === 'object') {
            dataC = JSON.stringify(data);
        }
    }

    function successF(response) {
        self.log('success:', response);
        if (typeof success === 'string') {
            self.log(success);
        } else
        if (typeof success === 'function') {
            success(response);
        }
    }

    function failureF(response) {
        self.log('failure:', response);
        self.log('typeof failure:', typeof failure);
        if (typeof failure === 'string') {
            self.log(failure);
        } else
        if (typeof failure === 'function') {
            failure(response);
        }
    }

    var url = self.api + '/' + database + '/' + urlPath;
    self.log('ajax_post_url', url);
    self.log('ajax_post_data', dataC);
    var request = {
        url: url,
        method: 'POST',
        auth: {
            "login": self.constantsjs.username,
            "password": self.constantsjs.password
        },
        // since ZWay sends data serialized as 
        // ’key1=value1&key2[0]=value2&key2[1]=value2&...’)
        // we convert javascript objects with JSON.stringify before sending
        data: dataC || '',
        async: true,
        timeout: 20000, //default: 20000 ms 
        // >> response:status = -1 
        //             data   = Timeout was reached
        success: function(response) {
            successF(response);
        },
        error: function(response) {
            failureF(response);
        }
    };
    http.request(request);
}; //ajax_post

//h-------------------------------------------------------------------------------
//h
//h Name:         checkRetry
//h Purpose:      check for retry at connection fault
//h
//h-------------------------------------------------------------------------------
MxC.prototype.checkRetry = function(config, response, text) {
    'use strict';
    var self = this;
    self.log("checkRetry");

    if (self.timerId_retry) {
        return;
    }

    if (response) {
        self.notifyError(response.status + ' ' + response.statusText + ' ' +
            response.url);
    }
    if (text) {
        self.notifyError(text);
    }
    self.timerId_retry = setTimeout(function() {
        self.timerId_retry = undefined;
        self.initExec(config);
    }, self.constantsjs.retry_init_min * 60000);
}; //checkRetry
