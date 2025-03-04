'use client';

import * as React from 'react';
import classNames from 'classnames';
import { separatorPropDefs } from './separator.props.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps, GetPropDefTypes } from '../props/index.js';

type SeparatorElement = React.ElementRef<'span'>;
type SeparatorOwnProps = GetPropDefTypes<typeof separatorPropDefs>;
interface SeparatorProps
  extends ComponentPropsWithoutColor<'span'>,
    MarginProps,
    SeparatorOwnProps {}
const Separator = React.forwardRef<SeparatorElement, SeparatorProps>((props, forwardedRef) => {
  const { className, color, decorative, ...separatorProps } = extractProps(
    props,
    separatorPropDefs,
    marginPropDefs
  );
  return (
    <span
      data-accent-color={color}
      role={decorative ? undefined : 'separator'}
      {...separatorProps}
      ref={forwardedRef}
      className={classNames('rt-Separator', className)}
    />
  );
});
Separator.displayName = 'Separator';

export { Separator };
export type { SeparatorProps };
