import { RefAttributes, DOMAttributes } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Theme } from '../../constants/theme';
import { BreakpointKey } from '../../constants';
import {
  WithResponsiveProps,
  parseResponsiveProps,
  media,
} from '../../utils/styled';

type OwnProps = {
  amount?: keyof Theme['spacing'];
  axis?: 'x' | 'y'; // Default is x-axis
};

type Props = WithResponsiveProps<OwnProps> & RefAttributes<HTMLElement>;
type ThemedProps = OwnProps & { theme: Theme };

const spacer = (p: ThemedProps) => css`
  width: ${!p.axis || p.axis === 'x'
    ? p.theme.spacing[p.amount ?? 'normal']
    : 0};
  height: ${p.axis === 'y' ? p.theme.spacing[p.amount ?? 'normal'] : 0};
`;

const getCSS = (p: ThemedProps) => [spacer(p)];

const getResponsiveCSS = (p: Props) => {
  const [baseProps, mediaProps] = parseResponsiveProps(p, ['amount', 'axis']);
  const responsiveProps = Object.entries(mediaProps).map(
    ([breakpointKey, breakpointProps]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const breakpointCSS = getCSS({ ...p, ...(breakpointProps as any) });
      return media[breakpointKey as BreakpointKey]`${breakpointCSS}`;
    }
  );
  return [getCSS(baseProps), ...responsiveProps];
};

const shouldForwardProp = (p: string) => !['amount', 'axis', 'as'].includes(p);

const Spacing = styled('div', { shouldForwardProp })<Props>`
  flex-shrink: 0;
  ${getResponsiveCSS}
`;

Spacing.defaultProps = {
  'data-spacing': true,
} as DOMAttributes<HTMLElement>;

export default Spacing;
