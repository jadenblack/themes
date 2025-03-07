'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import {
  selectRootPropDefs,
  selectTriggerPropDefs,
  selectContentPropDefs,
} from './select.props.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';
import { Theme, useThemeContext } from './theme.js';
import { ThickCheckIcon, ChevronDownIcon } from './icons.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps, GetPropDefTypes } from '../props/index.js';

type SelectRootOwnProps = GetPropDefTypes<typeof selectRootPropDefs>;

type SelectContextValue = SelectRootOwnProps;
const SelectContext = React.createContext<SelectContextValue>({});

interface SelectRootProps
  extends ComponentPropsWithoutColor<typeof SelectPrimitive.Root>,
    SelectContextValue {}
const SelectRoot: React.FC<SelectRootProps> = (props) => {
  const { children, size = selectRootPropDefs.size.default, ...rootProps } = props;
  return (
    <SelectPrimitive.Root {...rootProps}>
      <SelectContext.Provider value={React.useMemo(() => ({ size }), [size])}>
        {children}
      </SelectContext.Provider>
    </SelectPrimitive.Root>
  );
};
SelectRoot.displayName = 'SelectRoot';

type SelectTriggerElement = React.ElementRef<typeof SelectPrimitive.Trigger>;
type SelectTriggerOwnProps = GetPropDefTypes<typeof selectTriggerPropDefs>;
interface SelectTriggerProps
  extends Omit<ComponentPropsWithoutColor<typeof SelectPrimitive.Trigger>, 'asChild'>,
    MarginProps,
    SelectTriggerOwnProps {}
const SelectTrigger = React.forwardRef<SelectTriggerElement, SelectTriggerProps>(
  (props, forwardedRef) => {
    const context = React.useContext(SelectContext);
    const { children, className, color, radius, placeholder, ...triggerProps } = extractProps(
      // Pass size value from the context to generate styles
      { size: context?.size, ...props },
      // Pass size prop def to allow it to be extracted
      { size: selectRootPropDefs.size },
      selectTriggerPropDefs,
      marginPropDefs
    );
    return (
      <SelectPrimitive.Trigger asChild>
        <button
          data-accent-color={color}
          data-radius={radius}
          {...triggerProps}
          ref={forwardedRef}
          className={classNames('rt-reset', 'rt-SelectTrigger', className)}
        >
          <span className="rt-SelectTriggerInner">
            <SelectPrimitive.Value placeholder={placeholder}>{children}</SelectPrimitive.Value>
          </span>
          <SelectPrimitive.Icon asChild>
            <ChevronDownIcon className="rt-SelectIcon" />
          </SelectPrimitive.Icon>
        </button>
      </SelectPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = 'SelectTrigger';

type SelectContentElement = React.ElementRef<typeof SelectPrimitive.Content>;
type SelectContentOwnProps = GetPropDefTypes<typeof selectContentPropDefs>;
interface SelectContentProps
  extends Omit<ComponentPropsWithoutColor<typeof SelectPrimitive.Content>, 'asChild'>,
    SelectContentOwnProps {
  container?: React.ComponentProps<typeof SelectPrimitive.Portal>['container'];
}
const SelectContent = React.forwardRef<SelectContentElement, SelectContentProps>(
  (props, forwardedRef) => {
    const context = React.useContext(SelectContext);
    const { className, children, color, container, ...contentProps } = extractProps(
      // Pass size value from the context to generate styles
      { size: context?.size, ...props },
      // Pass size prop def to allow it to be extracted
      { size: selectRootPropDefs.size },
      selectContentPropDefs
    );
    const themeContext = useThemeContext();
    const resolvedColor = color || themeContext.accentColor;
    return (
      <SelectPrimitive.Portal container={container}>
        <Theme asChild>
          <SelectPrimitive.Content
            data-accent-color={resolvedColor}
            sideOffset={4}
            {...contentProps}
            asChild={false}
            ref={forwardedRef}
            className={classNames(
              { 'rt-PopperContent': contentProps.position === 'popper' },
              'rt-SelectContent',
              className
            )}
          >
            <ScrollAreaPrimitive.Root type="auto" className="rt-ScrollAreaRoot">
              <SelectPrimitive.Viewport asChild className="rt-SelectViewport">
                <ScrollAreaPrimitive.Viewport
                  className="rt-ScrollAreaViewport"
                  style={{ overflowY: undefined }}
                >
                  {children}
                </ScrollAreaPrimitive.Viewport>
              </SelectPrimitive.Viewport>
              <ScrollAreaPrimitive.Scrollbar
                className="rt-ScrollAreaScrollbar rt-r-size-1"
                orientation="vertical"
              >
                <ScrollAreaPrimitive.Thumb className="rt-ScrollAreaThumb" />
              </ScrollAreaPrimitive.Scrollbar>
            </ScrollAreaPrimitive.Root>
          </SelectPrimitive.Content>
        </Theme>
      </SelectPrimitive.Portal>
    );
  }
);
SelectContent.displayName = 'SelectContent';

type SelectItemElement = React.ElementRef<typeof SelectPrimitive.Item>;
interface SelectItemProps
  extends Omit<ComponentPropsWithoutColor<typeof SelectPrimitive.Item>, 'asChild'> {}
const SelectItem = React.forwardRef<SelectItemElement, SelectItemProps>((props, forwardedRef) => {
  const { className, children, ...itemProps } = props;
  return (
    <SelectPrimitive.Item
      {...itemProps}
      asChild={false}
      ref={forwardedRef}
      className={classNames('rt-SelectItem', className)}
    >
      <SelectPrimitive.ItemIndicator className="rt-SelectItemIndicator">
        <ThickCheckIcon className="rt-SelectItemIndicatorIcon" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = 'SelectItem';

type SelectGroupElement = React.ElementRef<typeof SelectPrimitive.Group>;
interface SelectGroupProps
  extends Omit<ComponentPropsWithoutColor<typeof SelectPrimitive.Group>, 'asChild'> {}
const SelectGroup = React.forwardRef<SelectGroupElement, SelectGroupProps>(
  ({ className, ...props }, forwardedRef) => (
    <SelectPrimitive.Group
      {...props}
      asChild={false}
      ref={forwardedRef}
      className={classNames('rt-SelectGroup', className)}
    />
  )
);
SelectGroup.displayName = 'SelectGroup';

type SelectLabelElement = React.ElementRef<typeof SelectPrimitive.Label>;
interface SelectLabelProps
  extends Omit<ComponentPropsWithoutColor<typeof SelectPrimitive.Label>, 'asChild'> {}
const SelectLabel = React.forwardRef<SelectLabelElement, SelectLabelProps>(
  ({ className, ...props }, forwardedRef) => (
    <SelectPrimitive.Label
      {...props}
      asChild={false}
      ref={forwardedRef}
      className={classNames('rt-SelectLabel', className)}
    />
  )
);
SelectLabel.displayName = 'SelectLabel';

type SelectSeparatorElement = React.ElementRef<typeof SelectPrimitive.Separator>;
interface SelectSeparatorProps
  extends Omit<ComponentPropsWithoutColor<typeof SelectPrimitive.Separator>, 'asChild'> {}
const SelectSeparator = React.forwardRef<SelectSeparatorElement, SelectSeparatorProps>(
  ({ className, ...props }, forwardedRef) => (
    <SelectPrimitive.Separator
      {...props}
      asChild={false}
      ref={forwardedRef}
      className={classNames('rt-SelectSeparator', className)}
    />
  )
);
SelectSeparator.displayName = 'SelectSeparator';

export {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
};

export type {
  SelectRootProps,
  SelectTriggerProps,
  SelectContentProps,
  SelectItemProps,
  SelectGroupProps,
  SelectLabelProps,
  SelectSeparatorProps,
};
