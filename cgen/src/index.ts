import {Command, flags} from '@oclif/command'
import * as inquirer from "inquirer";
import * as fs from 'fs';
import cli from 'cli-ux';

type Args = {
  name: string;
  directory: string;
  type?: string;
};

class Cgen extends Command {
  static description = 'describe the command here';

  static generateFiles(args: Args) {
    const dir = `./${args.directory}/${args.name}`;
    if (!fs.existsSync(`./${args.directory}`)) {
      fs.mkdirSync(`./${args.directory}`)
    }
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      const files: string[] = [
        `${dir}/${args.name}.${ args.type === 'Javascript' ? 'jsx' : 'tsx' }`,
        `${dir}/_types.${ args.type === 'Javascript' ? 'js' : 'ts' }`,
        `${dir}/_styles.${ args.type === 'Javascript' ? 'js' : 'ts' }`,
      ];
      files.map((file) => {
        if (!fs.existsSync(file)) {
          fs.writeFileSync(file, '', { encoding: 'utf8' });
          console.log(`Write file ${file}`);
        }
      });
      console.log('Done!');
    } else {
      throw new Error("Component name directory already exists.");
    }
  }

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
    type: flags.string({ options: ["Javascript", "TypeScript"] }),
    name: flags.string({ default: "" }),
    directory: flags.string({ default: "" }),
  };

  static args = [{ name: 'name' }, { name: 'type' }, { name: 'directory' }];

  async run() {
    const { flags } = this.parse(Cgen);
    let type = flags.type;
    let name = flags.name;
    let directory = flags.directory;
    if (!name) {
      name = await cli.prompt('Name of component');
    }
    if (!directory) {
      directory = await cli.prompt('Target directory (leave blank for cwd)');
    }
    if (!type) {
      const responses = await inquirer.prompt([{
        name: 'type',
        message: 'Select a JS version:',
        type: 'list',
        choices: [{ name: 'Javascript' }, { name: 'TypeScript' }]
      }]);
      type = responses.type;
    }
    this.log(`Generating ${name}...`);
    this.log(`type: ${type}`);
    this.log(`into directory: ${directory}`);
    try {
      Cgen.generateFiles({ name, type, directory });
    } catch (e) {
      console.log(e);
    }
  }
}

export = Cgen
