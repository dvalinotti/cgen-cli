import {expect, test} from '@oclif/test'
import * as fs from 'fs';
import cmd = require('../src');

describe('cgen', () => {
  test
    .stdout()
    .do(() => cmd.run([
      '--name=MyComponent', 
      '--type=Javascript', 
      '--directory=components',
      '--styleType=SCSS'
    ]))
    .it('runs MyComponent, JS, /components', ctx => {
      expect(fs.existsSync('./components/MyComponent/MyComponent.jsx')).to.be.true;
      expect(fs.existsSync('./components/MyComponent/_styles.scss')).to.be.true;
      expect(fs.existsSync('./components/MyComponent/_types.js')).to.be.true;
    });
  test
    .stdout()
    .do(() => cmd.run([
      '--name=MyComponent', 
      '--type=TypeScript', 
      '--directory=components',
      '--styleType=styled-components'
    ]))
    .it('runs MyComponent, TS, /components', ctx => {
      expect(fs.existsSync('./components/MyComponent/MyComponent.tsx')).to.be.true;
      expect(fs.existsSync('./components/MyComponent/_styles.ts')).to.be.true;
      expect(fs.existsSync('./components/MyComponent/_types.ts')).to.be.true;
    });
}).afterEach(() => {
  const read = fs.readdirSync('./components/MyComponent');
  read.forEach(file => {
    fs.unlinkSync(`./components/MyComponent/${file}`);
  });
  fs.rmdirSync('./components/MyComponent');
});
