import {expect, test} from '@oclif/test'
import * as fs from 'fs';
import cmd = require('../src');

describe('cgen', () => {
  // Javascript, styled-components
  test
    .stdout()
    .do(() => cmd.run([
      '--name=MyComponent', 
      '--type=Javascript', 
      '--directory=components',
      '--styleType=styled-components'
    ]))
    .it('runs MyComponent, JS, /components, styled-components', ctx => {
      expect(fs.existsSync('./components/MyComponent/MyComponent.jsx')).to.be.true;
      expect(fs.existsSync('./components/MyComponent/_styles.js')).to.be.true;
    });
  // Javascript, SCSS
  test
    .stdout()
    .do(() => cmd.run([
      '--name=MyComponent', 
      '--type=Javascript', 
      '--directory=components',
      '--styleType=SCSS'
    ]))
    .it('runs MyComponent, JS, /components, SCSS', ctx => {
      expect(fs.existsSync('./components/MyComponent/MyComponent.jsx')).to.be.true;
      expect(fs.existsSync('./components/MyComponent/_styles.scss')).to.be.true;
    });
  // Javascript, CSS
  test
    .stdout()
    .do(() => cmd.run([
      '--name=MyComponent', 
      '--type=Javascript', 
      '--directory=components',
      '--styleType=CSS'
    ]))
    .it('runs MyComponent, JS, /components, CSS', ctx => {
      expect(fs.existsSync('./components/MyComponent/MyComponent.jsx')).to.be.true;
      expect(fs.existsSync('./components/MyComponent/_styles.css')).to.be.true;
    });

  // Typescript, styled-components
  test
    .stdout()
    .do(() => cmd.run([
      '--name=MyComponent', 
      '--type=TypeScript', 
      '--directory=components',
      '--styleType=styled-components'
    ]))
    .it('runs MyComponent, TS, /components, styled-components', ctx => {
      expect(fs.existsSync('./components/MyComponent/MyComponent.tsx')).to.be.true;
      expect(fs.existsSync('./components/MyComponent/_styles.ts')).to.be.true;
      expect(fs.existsSync('./components/MyComponent/_types.ts')).to.be.true;
    });
  // Typescript, SCSS
  test
    .stdout()
    .do(() => cmd.run([
      '--name=MyComponent', 
      '--type=TypeScript', 
      '--directory=components',
      '--styleType=SCSS'
    ]))
    .it('runs MyComponent, TS, /components, SCSS', ctx => {
      expect(fs.existsSync('./components/MyComponent/MyComponent.tsx')).to.be.true;
      expect(fs.existsSync('./components/MyComponent/_styles.scss')).to.be.true;
      expect(fs.existsSync('./components/MyComponent/_types.ts')).to.be.true;
    });
  // Typescript, CSS
  test
    .stdout()
    .do(() => cmd.run([
      '--name=MyComponent', 
      '--type=TypeScript', 
      '--directory=components',
      '--styleType=CSS'
    ]))
    .it('runs MyComponent, TS, /components, CSS', ctx => {
      expect(fs.existsSync('./components/MyComponent/MyComponent.tsx')).to.be.true;
      expect(fs.existsSync('./components/MyComponent/_styles.css')).to.be.true;
      expect(fs.existsSync('./components/MyComponent/_types.ts')).to.be.true;
    });
}).afterEach(() => {
  const read = fs.readdirSync('./components/MyComponent');
  read.forEach(file => {
    fs.unlinkSync(`./components/MyComponent/${file}`);
  });
  fs.rmdirSync('./components/MyComponent');
});
