import {
  weightProp,
  alignProp,
  trimProp,
  highContrastProp,
  inheritedColorProp,
  textWrapProp,
  truncateProp,
  asChildProp,
} from '../props/index.js';
import type { PropDef } from '../props/index.js';

const as = ['span', 'div', 'label', 'p'] as const;
const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const textPropDefs = {
  as: { type: 'enum', values: as, default: 'span' },
  ...asChildProp,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: undefined,
    responsive: true,
  },
  weight: weightProp,
  align: alignProp,
  trim: trimProp,
  truncate: truncateProp,
  wrap: textWrapProp,
  color: inheritedColorProp,
  highContrast: highContrastProp,
} satisfies {
  as: PropDef<(typeof as)[number]>;
  size: PropDef<(typeof sizes)[number]>;
  weight: typeof weightProp;
  align: typeof alignProp;
  trim: typeof trimProp;
  truncate: typeof truncateProp;
  wrap: typeof textWrapProp;
  color: typeof inheritedColorProp;
  highContrast: typeof highContrastProp;
};

export { textPropDefs };
