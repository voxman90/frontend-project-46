#!/usr/bin/env node

import { Command } from 'commander';

import getFileDiff from '../src/index.js';
import stylishDiff from '../src/stylish.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    if (program.opts().format === 'stylish') {
      return console.log(getFileDiff(filepath1, filepath2, stylishDiff));
    }

    return console.log('Unknown formatter');
  });

program.parse();
