import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { GetPropDefTypes } from '../props/index.js';
import { emPropDefs } from './em.props.js';

type EmElement = React.ElementRef<'em'>;
type EmOwnProps = GetPropDefTypes<typeof emPropDefs>;
interface EmProps extends ComponentPropsWithoutColor<'em'>, EmOwnProps {}
const Em = React.forwardRef<EmElement, EmProps>(
  ({ asChild, className, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : 'em';
    return <Comp {...props} ref={forwardedRef} className={classNames('rt-Em', className)} />;
  }
);
Em.displayName = 'Em';

export { Em };
export type { EmProps };
