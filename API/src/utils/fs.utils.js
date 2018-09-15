"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
exports.ResolvePath = (...args) => path_1.resolve(...args);
exports.ResolveFile = (...args) => {
    const _path = exports.ResolvePath(...args);
    if (fs_1.existsSync(_path))
        return fs_1.readFileSync(_path, {});
    throw new Error(`File at ${_path} does not exist or can't be read`);
};
exports.FindFilesSync = (startPath, filter) => {
    const fileList = [];
    const recurse = (startPath, filter) => {
        fs_1.readdirSync(startPath).map((file) => {
            const filename = path_1.join(startPath, file);
            const stat = fs_1.lstatSync(filename);
            if (stat.isDirectory())
                recurse(filename, filter);
            else if (filename.includes(filter))
                fileList.push(filename);
        });
    };
    recurse(startPath, filter);
    return fileList;
};
//# sourceMappingURL=fs.utils.js.map