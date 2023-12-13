import { Theme as EmotionTheme } from './constants/theme';

// Enables the use of Theme in typing without import
declare module '@emotion/react' {
  export interface Theme extends EmotionTheme {}
}
