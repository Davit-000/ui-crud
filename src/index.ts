#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";
import {Command} from "commander";
import {wordParser} from "./utils";
import {ViewGenerator, HookGenerator, StylesGenerator} from "./generators/Entity";
import {FormViewGenerator, FormHookGenerator, FormStylesGenerator} from "./generators/EntityForm";
import {ActionViewGenerator, ActionHookGenerator, ActionStylesGenerator} from "./generators/EntityActions";
import {FiltersViewGenerator, FiltersHookGenerator, FiltersStylesGenerator} from "./generators/EntityFilters";

const program = new Command();
const packageJson = require('../package.json');
const appDir = path.dirname(require.main!.filename);

program
  .version(packageJson.version)
  .description(packageJson.description)

program
  .command('make <name>')
  .alias('m')
  .description('generates components for crud operations.')
  .action((name: string) => {
    const [__fileName, _fileName] = wordParser(name);
    const componentDir = `${appDir}\\components`;

    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir);
    }

    const fileDir = `${componentDir}\\${_fileName}`;

    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir);
    }

    fs.writeFileSync(`${fileDir}\\${_fileName}.tsx`, ViewGenerator(_fileName), {encoding: 'utf8'});
    fs.writeFileSync(`${fileDir}\\${_fileName}.hook.ts`, HookGenerator(_fileName), {encoding: 'utf8'});
    fs.writeFileSync(`${fileDir}\\${_fileName}.styles.ts`, StylesGenerator(_fileName), {encoding: 'utf8'});

    const actionDir = `${fileDir}\\${__fileName}Actions`;

    if (!fs.existsSync(actionDir)) {
      fs.mkdirSync(actionDir);
    }

    fs.writeFileSync(`${actionDir}\\${__fileName}Actions.tsx`, ActionViewGenerator(__fileName), {encoding: 'utf8'});
    fs.writeFileSync(`${actionDir}\\${__fileName}Actions.hook.ts`, ActionHookGenerator(__fileName), {encoding: 'utf8'});
    fs.writeFileSync(`${actionDir}\\${__fileName}Actions.styles.ts`, ActionStylesGenerator(__fileName), {encoding: 'utf8'});

    const formDir = `${fileDir}\\${__fileName}Form`;

    if (!fs.existsSync(formDir)) {
      fs.mkdirSync(formDir);
    }

    fs.writeFileSync(`${formDir}\\${__fileName}Form.tsx`, FormViewGenerator(__fileName), {encoding: 'utf8'});
    fs.writeFileSync(`${formDir}\\${__fileName}Form.hook.ts`, FormHookGenerator(__fileName), {encoding: 'utf8'});
    fs.writeFileSync(`${formDir}\\${__fileName}Form.styles.ts`, FormStylesGenerator(__fileName), {encoding: 'utf8'});

    const filtersDir = `${fileDir}\\${__fileName}Filters`;

    if (!fs.existsSync(filtersDir)) {
      fs.mkdirSync(filtersDir);
    }

    fs.writeFileSync(`${filtersDir}\\${__fileName}Filters.tsx`, FiltersViewGenerator(__fileName), {encoding: 'utf8'});
    fs.writeFileSync(`${filtersDir}\\${__fileName}Filters.hook.ts`, FiltersHookGenerator(__fileName), {encoding: 'utf8'});
    fs.writeFileSync(`${filtersDir}\\${__fileName}Filters.styles.ts`, FiltersStylesGenerator(__fileName), {encoding: 'utf8'});
  });

program.parse(process.argv);
