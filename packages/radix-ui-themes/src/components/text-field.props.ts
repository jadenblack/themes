import type { PropDef } from '../props/index.js';
import { colorProp, inheritedColorProp, paddingPropDefs, radiusProp } from '../props/index.js';
import { flexPropDefs } from './flex.props.js';

const sizes = ['1', '2', '3'] as const;
const variants = ['classic', 'surface', 'soft'] as const;

const textFieldRootPropDefs = {
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'surface' },
  color: colorProp,
  radius: radiusProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  color: typeof colorProp;
  radius: typeof radiusProp;
};

const sides = ['left', 'right'] as const;

const textFieldSlotPropDefs = {
  side: { type: 'enum', values: sides, default: undefined },
  color: inheritedColorProp,
  gap: flexPropDefs.gap,
  px: paddingPropDefs.px,
  pl: paddingPropDefs.pl,
  pr: paddingPropDefs.pr,
} satisfies {
  side: PropDef<(typeof sides)[number]>;
  color: typeof inheritedColorProp;
  gap: typeof flexPropDefs.gap;
  px: typeof paddingPropDefs.px;
  pl: typeof paddingPropDefs.pl;
  pr: typeof paddingPropDefs.pr;
};

export { textFieldRootPropDefs, textFieldSlotPropDefs };
