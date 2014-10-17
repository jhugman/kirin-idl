"use strict";
var tap = require("tap"),
    test = tap.test,
    plan = tap.plan,
    _ = require("lodash"),
    path = require("path"),
    translate = require("../lib/idl-translator");

function p() {
  var s = path.join.apply(null, arguments);
  return path.join(__dirname, 'idl-test-package', s);
}

test("Full flow", function (t) {
    var fileMap = translate(
        [ p('idl/DummyIDL') ], 
        { 
          ios: 'ios',
          android: 'android',
          javascript: 'js'
        }
    );
    t.ok(fileMap);
    t.ok(_.size(fileMap) > 1); // one native one for each file, and one for a module in javascript
    console.log(_.keys(fileMap).join('\n'));
    t.end();
});