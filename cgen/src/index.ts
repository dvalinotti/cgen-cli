import {Command, flags} from '@oclif/command'
import * as inquirer from "inquirer";
import * as fs from 'fs';
import cli from 'cli-ux';
import { generateTemplates } from './util';
import { Args } from './types';

class Cgen extends Command {
  // CLI description
  static description = 'generate React components';

  // Command flag definitions
  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    force: flags.boolean({char: 'f'}),
    // Name of component
    name: flags.string({ default: "" }),
    // Javascript or Typescript
    type: flags.string({ options: ["Javascript", "TypeScript"] }),
    // Target directory
    directory: flags.string({ default: "" }),
    // Stylesheet format
    styleType: flags.string({ options: ["CSS", "SCSS", "styled-components"] })
  };

  // Command argument definitions
  static args = [
    { name: 'name' }, 
    { name: 'type' }, 
    { name: 'directory' },
    { name: 'styleType' }
  ];

  // Generates files based on provided arguments
  static generateFiles(args: Args) {
    // Check to see if target directory exists - if not, create it
    const dir = `./${args.directory}/${args.name}`;
    if (!fs.existsSync(`./${args.directory}`)) {
      fs.mkdirSync(`./${args.directory}`)
    }
    const templates = generateTemplates(args);
    // Check to see if target Component directory already exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      const files: string[] = [
        `${dir}/${args.name}.${ args.type === 'Javascript' ? 'jsx' : 'tsx' }`,
        `${dir}/_styles.${ 
          args.styleType === 'styled-components'
            ? (args.type === 'Javascript' ? 'js' : 'ts')
            : (args.styleType === 'CSS' ? 'css' : 'scss')
        }`,
        `${args.type === 'Javascript' ? '' : `${dir}/_types.ts` }`,
      ];
      // Write each file to directory
      files.map((file, index) => {
        if (file !== `` && !fs.existsSync(file)) {
          fs.writeFileSync(file, templates[index], { encoding: 'utf8' });
          console.log(`Wrote file ${file}`);
        }
      });
      console.log('Done!');
    } else {
      // Throw error if directory already exists to avoid overwriting
      throw new Error("Component name directory already exists.");
    }
  }

  async run() {
    // Pull any provided flags from execution
    const { flags } = this.parse(Cgen);
    let { type, name, directory, styleType } = flags;

    // If any are not provided, prompt for them
    if (!name) {
      name = await cli.prompt('Name of component');
    } if (!directory) {
      directory = await cli.prompt('Target directory (leave blank for cwd)');
      // Make blank if user pressed enter
      if (!directory) directory = '';
    } if (!styleType) {
      const responses = await inquirer.prompt([{
        name: 'styleType',
        message: 'Choose a stylesheet format',
        type: 'list',
        choices: [{ name: 'CSS' }, { name: 'SCSS' }, { name: 'styled-components' }]
      }]);
      styleType = responses.styleType;
    } if (!type) {
      const responses = await inquirer.prompt([{
        name: 'type',
        message: 'Select a JS version:',
        type: 'list',
        choices: [{ name: 'Javascript' }, { name: 'TypeScript' }]
      }]);
      type = responses.type;
    }

    // Execute file generation
    this.log(`Generating ${name}...`);
    this.log(`type: ${type}`);
    this.log(`into directory: ${directory}`);
    try {
      Cgen.generateFiles({ name, type, directory, styleType });
    } catch (e) {
      console.log(e);
    }
  }
}

export = Cgen
