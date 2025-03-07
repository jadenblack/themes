import { colorProp, radiusProp } from '../props/index.js';
import type { PropDef } from '../props/index.js';

const sizes = ['1', '2', '3'] as const;
const variants = ['classic', 'surface', 'soft'] as const;
const resizeValues = ['none', 'vertical', 'horizontal', 'both'] as const;

// prettier-ignore
const textAreaPropDefs = {
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'surface' },
  resize: { type: 'enum', className: 'rt-r-resize', values: resizeValues, default: undefined, responsive: true },
  color: colorProp,
  radius: radiusProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  resize: PropDef<(typeof resizeValues)[number]>;
  color: typeof colorProp;
  radius: typeof radiusProp;
};

export { textAreaPropDefs };
