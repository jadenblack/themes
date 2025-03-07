'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { scrollAreaPropDefs } from './scroll-area.props.js';
import {
  extractMarginProps,
  getMarginStyles,
  getResponsiveClassNames,
  mergeStyles,
  getSubtree,
} from '../helpers/index.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps, GetPropDefTypes } from '../props/index.js';

type ScrollAreaElement = React.ElementRef<typeof ScrollAreaPrimitive.Viewport>;
type ScrollAreaOwnProps = GetPropDefTypes<typeof scrollAreaPropDefs>;
interface ScrollAreaProps
  extends ComponentPropsWithoutColor<typeof ScrollAreaPrimitive.Root>,
    Omit<ComponentPropsWithoutColor<typeof ScrollAreaPrimitive.Viewport>, 'dir'>,
    MarginProps,
    ScrollAreaOwnProps {}
const ScrollArea = React.forwardRef<ScrollAreaElement, ScrollAreaProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const [marginClassNames, marginCustomProperties] = getMarginStyles(marginProps);

  const {
    asChild,
    children,
    className,
    style,
    type,
    scrollHideDelay = type !== 'scroll' ? 0 : undefined,
    dir,
    size = scrollAreaPropDefs.size.default,
    radius = scrollAreaPropDefs.radius.default,
    scrollbars = scrollAreaPropDefs.scrollbars.default,
    ...viewportProps
  } = marginRest;

  return (
    <ScrollAreaPrimitive.Root
      type={type}
      scrollHideDelay={scrollHideDelay}
      className={classNames('rt-ScrollAreaRoot', marginClassNames, className)}
      style={mergeStyles(marginCustomProperties, style)}
      asChild={asChild}
    >
      {getSubtree({ asChild, children }, (children) => (
        <>
          <ScrollAreaPrimitive.Viewport
            {...viewportProps}
            ref={forwardedRef}
            className="rt-ScrollAreaViewport"
          >
            {children}
          </ScrollAreaPrimitive.Viewport>

          <div className="rt-ScrollAreaViewportFocusRing" />

          {scrollbars !== 'vertical' ? (
            <ScrollAreaPrimitive.Scrollbar
              data-radius={radius}
              orientation="horizontal"
              className={classNames(
                'rt-ScrollAreaScrollbar',
                getResponsiveClassNames({
                  className: 'rt-r-size',
                  value: size,
                  propValues: scrollAreaPropDefs.size.values,
                })
              )}
            >
              <ScrollAreaPrimitive.Thumb className="rt-ScrollAreaThumb" />
            </ScrollAreaPrimitive.Scrollbar>
          ) : null}

          {scrollbars !== 'horizontal' ? (
            <ScrollAreaPrimitive.Scrollbar
              data-radius={radius}
              orientation="vertical"
              className={classNames(
                'rt-ScrollAreaScrollbar',
                getResponsiveClassNames({
                  className: 'rt-r-size',
                  value: size,
                  propValues: scrollAreaPropDefs.size.values,
                })
              )}
            >
              <ScrollAreaPrimitive.Thumb className="rt-ScrollAreaThumb" />
            </ScrollAreaPrimitive.Scrollbar>
          ) : null}

          {scrollbars === 'both' ? (
            <ScrollAreaPrimitive.Corner className="rt-ScrollAreaCorner" />
          ) : null}
        </>
      ))}
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };
export type { ScrollAreaProps };
