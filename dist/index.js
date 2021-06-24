#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var commander_1 = require("commander");
var utils_1 = require("./utils");
var Entity_1 = require("./generators/Entity");
var EntityForm_1 = require("./generators/EntityForm");
var EntityActions_1 = require("./generators/EntityActions");
var EntityFilters_1 = require("./generators/EntityFilters");
var program = new commander_1.Command();
var packageJson = require('../package.json');
var appDir = path.dirname(require.main.filename);
program
    .version(packageJson.version)
    .description(packageJson.description);
program
    .command('make <name>')
    .alias('m')
    .description('generates components for crud operations.')
    .action(function (name) {
    var _a = utils_1.wordParser(name), __fileName = _a[0], _fileName = _a[1];
    var componentDir = appDir + "\\components";
    if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir);
    }
    var fileDir = componentDir + "\\" + _fileName;
    if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir);
    }
    fs.writeFileSync(fileDir + "\\" + _fileName + ".tsx", Entity_1.ViewGenerator(_fileName), { encoding: 'utf8' });
    fs.writeFileSync(fileDir + "\\" + _fileName + ".hook.ts", Entity_1.HookGenerator(_fileName), { encoding: 'utf8' });
    fs.writeFileSync(fileDir + "\\" + _fileName + ".styles.ts", Entity_1.StylesGenerator(_fileName), { encoding: 'utf8' });
    var actionDir = fileDir + "\\" + __fileName + "Actions";
    if (!fs.existsSync(actionDir)) {
        fs.mkdirSync(actionDir);
    }
    fs.writeFileSync(actionDir + "\\" + __fileName + "Actions.tsx", EntityActions_1.ActionViewGenerator(__fileName), { encoding: 'utf8' });
    fs.writeFileSync(actionDir + "\\" + __fileName + "Actions.hook.ts", EntityActions_1.ActionHookGenerator(__fileName), { encoding: 'utf8' });
    fs.writeFileSync(actionDir + "\\" + __fileName + "Actions.styles.ts", EntityActions_1.ActionStylesGenerator(__fileName), { encoding: 'utf8' });
    var formDir = fileDir + "\\" + __fileName + "Form";
    if (!fs.existsSync(formDir)) {
        fs.mkdirSync(formDir);
    }
    fs.writeFileSync(formDir + "\\" + __fileName + "Form.tsx", EntityForm_1.FormViewGenerator(__fileName), { encoding: 'utf8' });
    fs.writeFileSync(formDir + "\\" + __fileName + "Form.hook.ts", EntityForm_1.FormHookGenerator(__fileName), { encoding: 'utf8' });
    fs.writeFileSync(formDir + "\\" + __fileName + "Form.styles.ts", EntityForm_1.FormStylesGenerator(__fileName), { encoding: 'utf8' });
    var filtersDir = fileDir + "\\" + __fileName + "Filters";
    if (!fs.existsSync(filtersDir)) {
        fs.mkdirSync(filtersDir);
    }
    fs.writeFileSync(filtersDir + "\\" + __fileName + "Filters.tsx", EntityFilters_1.FiltersViewGenerator(__fileName), { encoding: 'utf8' });
    fs.writeFileSync(filtersDir + "\\" + __fileName + "Filters.hook.ts", EntityFilters_1.FiltersHookGenerator(__fileName), { encoding: 'utf8' });
    fs.writeFileSync(filtersDir + "\\" + __fileName + "Filters.styles.ts", EntityFilters_1.FiltersStylesGenerator(__fileName), { encoding: 'utf8' });
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map