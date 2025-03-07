import { asChildProp } from '../props/index.js';
import type { GetPropDefTypes, PropDef } from '../props/index.js';

const as = ['div', 'span'] as const;
const displayValues = ['none', 'inline', 'inline-block', 'block'] as const;

const boxPropDefs = {
  /**
   * Controls whether to render **div** or **span**
   *
   * @example
   * as="div"
   * as="span"
   */
  as: { type: 'enum', values: as, default: 'div' },
  ...asChildProp,
  /**
   * Sets the CSS **display** property.
   * Supports a subset of the corresponding CSS values and responsive objects.
   *
   * @example
   * display="inline-block"
   * display={{ sm: 'none', lg: 'block' }}
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/display
   */
  display: {
    type: 'enum',
    className: 'rt-r-display',
    values: displayValues,
    default: undefined,
    responsive: true,
  },
} satisfies {
  as: PropDef<(typeof as)[number]>;
  display: PropDef<(typeof displayValues)[number]>;
};

// Use all of the imported prop defs to ensure that JSDoc works
type BoxOwnProps = GetPropDefTypes<typeof boxPropDefs & typeof asChildProp>;

export { boxPropDefs };
export type { BoxOwnProps };
