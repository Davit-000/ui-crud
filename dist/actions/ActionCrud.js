"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var ActionCrud = function (name) {
    var _a;
    var appDir = path.dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename);
    console.log(appDir);
    if (fs.existsSync(appDir + "/src/components")) {
        console.log(name);
    }
};
exports.default = ActionCrud;
//# sourceMappingURL=ActionCrud.js.map