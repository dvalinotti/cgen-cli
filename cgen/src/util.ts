import { Args } from './types';

export function generateTemplates(args: Args): string[] {
  const classDef = 
`import React, { FunctionComponent } from 'react';
import ${
  args.styleType === 'styled-components'
    ? `{ Styled } from './_styles';` 
    : ( args.styleType === 'CSS' 
      ? `'./_styles.css';` 
      : `'./_styles.scss';`
)};
${args.type === 'TypeScript' 
  ? `import { TestInterface } from './_types';
  
type Props = {
  default?: string;
};\n`
  : ``
}
const ${args.name} ${args.type === 'TypeScript' ? ': FunctionComponent<Props>' : ''} = (${
  args.type === 'TypeScript' ? '{ default }: Props' : 'props'
}) => {
  return (
    ${ args.styleType === 'styled-components'
      ? '<Styled.Container>'
      : '<div id="${args.name}-container">'
    }
      <h1>{\`Hello ${args.name}!\`}</h1>
    ${ args.styleType === 'styled-components'
      ? '</Styled.Container>'
      : '</div>'
    }
  );
};

export default ${args.name};
  `;

  const styleDef = 
`${args.styleType === 'styled-components'
  ? `import styled from 'styled-components';

const Container = styled.div\`
  display: flex;
\`;

export const Styled = {
  Container,
};`
: ( args.styleType === 'CSS' 
  ? `.container {
  display: flex;
}
.container h1 {
  color: red;
}`
: `.container {
display: flex;

  h1 {
    color: red;
  }
}`
  )
}
  `;

  const templates = [classDef, styleDef];
  // console.log(templates[0]);
  // console.log(templates[1]);
  
  if (args.type === 'TypeScript') {
    const typesDef = `export interface TestInterface {
  default: string;
}
`
    templates.push(typesDef);
    // console.log(templates[2]);
  }

  return templates;
}
