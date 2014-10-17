"use strict";
var fsHelper = require("./fs-helper"),
    frontend = require("./idl-frontend"),
    Frontend = frontend.Frontend,
    _ = require("lodash"),
    path = require("path");

module.exports = function (idlFiles, projectMap) {
    var irSymbolTables,
        targetFiles = {};
    
    irSymbolTables = _.map(idlFiles, function (f) {
        return new Frontend(f).generateIR();
    });


    _.each(projectMap, function (i, platform) {
        var generator;
        
        try {
            generator = require("./generators-" + platform);
        } catch (e) {
            console.error("Can't find a generator for " + platform, e);
            return;
        }
        
        var destDir = projectMap[platform];
        
        _.each(irSymbolTables, function (irSymbolTable) {
            generator.generateFiles(destDir, irSymbolTable, targetFiles);
        });
    });

    return targetFiles;
};
