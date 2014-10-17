var path = require("path"),
    fs = require("fs"),
    _ = require("lodash");

fs.existsSync = fs.existsSync || path.existsSync;

module.exports = {
  existsSync: fs.existsSync,

  writeFileSync: function (filepath, content, dryRun) {
    ensureDirExists(filepath, dryRun);
    if (dryRun) {
        console.log("# Writing  " + filepath);
    } else {
        fs.writeFileSync(filepath, content);
    }
  },

  rmRf: function rmRf (dir) {
    if (!fs.existsSync(dir)) {
        return;
    }
    if (isDirectory(dir)) {
        var files = fs.readdirSync(dir);
        _.each(files, function (file) {
            rmRf(path.join(dir, file));
        });
        fs.rmdirSync(dir);
    } else {
        // it's a file.
        fs.unlinkSync(dir);
    }
  },

  


};



function isDirectory (fileOrDirectory) {
    return fs.statSync(fileOrDirectory).isDirectory();
}



function ensureDirExists(dest, dryRun) {
    var dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
        if (dryRun) {
            console.log("mkdir -p " + dir);
        } else {
            var mkdirp = require("mkdirp");
            mkdirp.sync(dir);
        }
    }
}

exports.isDirectoryEmpty = function (directory) {
    if (exports.isDirectory(directory)) {
        var files = fs.readdirSync(directory);
        return files.length === 0;
    }
    return false;
};

