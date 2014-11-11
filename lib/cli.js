'use strict';
var argv  = process.argv;
var qrip = require('./qrip');
var pkg = require(__dirname + '/../package.json');
var updateNotifier = require('update-notifier');

updateNotifier({
    packageName: pkg.name,
    packageVersion: pkg.version
}).notify();

qrip();
