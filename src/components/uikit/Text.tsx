import React from 'react';
import styled from '@emotion/styled';

import { Typography, Color, Theme } from '../../constants/theme';

interface Props extends React.ComponentProps<'span'> {
  color?: Color;
  align?: string;
  href?: string;
  variant: Typography;
  as?: Tags;
  theme?: Theme; // This is required for some rare use cases where the theme cannot be accessed via context
}

type Tags = keyof JSX.IntrinsicElements;

const Text = React.forwardRef<HTMLSpanElement, Props>(
  ({ variant, as: asTag, children, ...rest }, ref) => {
    const tag = asTag || variantToTag[variant];
    const Comp = TextBase.withComponent(tag);

    return (
      <Comp {...rest} variant={variant} ref={ref}>
        {children}
      </Comp>
    );
  }
);

Text.displayName = 'Text';

const TextBase = styled.span<Props>`
  margin: 0;
  color: ${(p) => (p.color ? p.theme.colors[p.color] : 'inherit')};
  text-align: ${(p) => p.align || 'inherit'};
  ${(p) => p.theme.typography[p.variant]}
`;

const variantToTag: { [key in Typography]: Partial<Tags> } = {
  'heading-1': 'h1',
  'heading-2': 'h2',
  'heading-3': 'h3',
  'heading-4': 'h4',
  'heading-5': 'h5',
  subtitle: 'p',
  label: 'p',
  body: 'p',
  caption: 'span',
  action: 'span',
  'body-big': 'p',
  'body-big-bold': 'p',
  'body-bold': 'p',
  'body-small': 'p',
  'body-medium': 'p',
  error: 'p',
};

export default Text;
