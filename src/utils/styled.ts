/* eslint-disable */
import { css } from '@emotion/react';

import { BREAKPOINTS, BreakpointKey } from '../constants';
import theme from '../constants/theme';

// Apply hover effect only on devices that support hover
export const hoverScale = (scale = 1.02) => css`
  transition: transform 100ms ease-in-out;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: scale(${scale});
    }
  }
`;

type CSSReturnType = ReturnType<typeof css>;
type CSSArgsType = Parameters<typeof css>;
type MediaFn = (
  template: TemplateStringsArray,
  ...args: CSSArgsType
) => CSSReturnType;
type Media = { [breakpoint in BreakpointKey]: MediaFn };

export type WithResponsiveProps<T extends object> = {
  [P in keyof T]:
    | T[P]
    | Partial<{ [breakpoint in BreakpointKey]: T[P] } & { _: T[P] }>;
};

const em = (px: number) => `${px / 16}em`;

export const media = Object.entries(BREAKPOINTS).reduce(
  (acc, [breakpointKey, breakpointValue]) => {
    const key = breakpointKey as BreakpointKey;
    const { min, max } = breakpointValue;

    if (min === 0) {
      // Smallest breakpoint (phone)
      acc[key] = (template, ...args) => css`
        @media screen and (max-width: ${em(max)}) {
          ${css(template, ...args)}
        }
      `;
    } else if (max === Infinity) {
      // Largest breakpoint (monitor)
      acc[key] = (template, ...args) => css`
        @media screen and (min-width: ${em(min)}) {
          ${css(template, ...args)}
        }
      `;
    } else {
      // In-between breakpoint
      acc[key] = (template, ...args) => css`
        @media screen and (min-width: ${em(min)}) and (max-width: ${em(max)}) {
          ${css(template, ...args)}
        }
      `;

      const downKey = `${key}Down` as BreakpointKey;
      const upKey = `${key}Up` as BreakpointKey;

      acc[downKey] = (template, ...args) => css`
        @media screen and (max-width: ${em(max)}) {
          ${css(template, ...args)}
        }
      `;

      acc[upKey] = (template, ...args) => css`
        @media screen and (min-width: ${em(min)}) {
          ${css(template, ...args)}
        }
      `;
    }
    return acc;
  },
  {} as Media
);

// TODO: figure out how to type this properly...
export function parseResponsiveProps<T extends object>(
  props: T,
  ownProps: string[]
) {
  const baseProps = {} as any;
  const mediaProps = {} as any;

  Object.entries(props)?.forEach(([propKey, propValue]) => {
    if (ownProps.includes(propKey)) {
      if (typeof propValue === 'object' && propValue !== null) {
        Object.entries(propValue as Record<string, string>)?.forEach(
          ([key, value]) => {
            // `_` represents the prop default value in responsive obj format
            if (key === '_') {
              baseProps[propKey] = value;
            } else if (!mediaProps[key]) {
              mediaProps[key] = { [propKey]: value };
            } else {
              mediaProps[key][propKey] = value;
            }
          }
        );
      } else {
        baseProps[propKey] = propValue;
      }
    } else {
      baseProps[propKey] = propValue;
    }
  });

  return [baseProps, mediaProps];
}

const hasSizeProp = (obj: any, p: any, size: any) =>
  !!(obj[p] && obj[p][size] !== undefined);

// Keep this last since for some weird reason it breaks syntax highlighting...
export const responsivify =
  (prop: any, cssProp: any, valueMap?: any) => (props: any) => {
    const getValue = (v: any) => (valueMap ? valueMap[v] : v);

    if (typeof props[prop] === 'string') {
      return `${cssProp}: ${getValue(props[prop])};`;
    }

    return css`
      ${hasSizeProp(props, prop, 'lg') &&
      media.lg`${cssProp}: ${getValue(props[prop].lg)}`}
      ${hasSizeProp(props, prop, 'md') &&
      media.md`${cssProp}: ${getValue(props[prop].md)}`}
    ${hasSizeProp(props, prop, 'sm') &&
      media.sm`${cssProp}: ${getValue(props[prop].sm)}`}
    `;
  };

const ieFallbackCSS = (styles: any, breakpointPx = 99999) => css`
  @media screen and (-ms-high-contrast: active),
    (-ms-high-contrast: none) and (max-width: ${breakpointPx}px) {
    ${styles}
  }
`;

export const ieGridFallback = (perRow: number): any => css`
  ${ieFallbackCSS(css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    & > * {
      width: calc(${100 / perRow}% - ${theme.spacing.normal}) !important;
      margin: ${theme.spacing.small};
    }
  `)}

  ${ieFallbackCSS(
    css`
      & > * {
        width: calc(50% - ${theme.spacing.normal}) !important;
      }
    `,
    BREAKPOINTS.sm.max
  )}

  ${ieFallbackCSS(
    css`
      & > * {
        width: calc(100% - ${theme.spacing.normal}) !important;
      }
    `,
    BREAKPOINTS.sm.max
  )}
`;
