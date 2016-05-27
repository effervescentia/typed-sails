"use strict";
var test = require('blue-tape');
var sails = require('sails');
test('sails exists', function (t) {
    t.plan(3);
    t.notEqual(sails, undefined);
    var Sails = sails.constructor;
    t.notEqual(Sails, undefined);
    var sails2 = new Sails();
    t.notEqual(sails2, undefined);
});
