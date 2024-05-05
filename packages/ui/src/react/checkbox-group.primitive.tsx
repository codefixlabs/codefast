import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { createCheckboxScope } from '@radix-ui/react-checkbox';
import { createContextScope, type Scope } from '@radix-ui/react-context';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { createRovingFocusGroupScope } from '@radix-ui/react-roving-focus';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useDirection } from '@radix-ui/react-direction';
import { Primitive } from '@radix-ui/react-primitive';

/* -------------------------------------------------------------------------------------------------
 * Component: CheckboxGroup
 * -----------------------------------------------------------------------------------------------*/

const CHECKBOX_GROUP_NAME = 'CheckboxGroup';

type ScopedProps<P> = P & { __scopeCheckboxGroup?: Scope };

const [createCheckboxGroupContext, createCheckboxGroupScope] =
  createContextScope(CHECKBOX_GROUP_NAME, [
    createRovingFocusGroupScope,
    createCheckboxScope,
  ]);

const useRovingFocusGroupScope = createRovingFocusGroupScope();
const useCheckboxScope = createCheckboxScope();

interface CheckboxGroupContextValue {
  name?: string;
  required: boolean;
  disabled: boolean;
  value?: string[];
  onItemCheck: (value: string) => void;
  onItemUncheck: (value: string) => void;
}

const [CheckboxGroupProvider, useCheckboxGroupContext] =
  createCheckboxGroupContext<CheckboxGroupContextValue>(CHECKBOX_GROUP_NAME);

type CheckboxGroupElement = React.ElementRef<typeof Primitive.div>;

interface CheckboxGroupProps
  extends React.ComponentPropsWithoutRef<typeof Primitive.div> {
  name?: CheckboxGroupContextValue['name'];
  required?: React.ComponentPropsWithoutRef<
    typeof CheckboxPrimitive.Root
  >['required'];
  disabled?: React.ComponentPropsWithoutRef<
    typeof CheckboxPrimitive.Root
  >['disabled'];
  dir?: RovingFocusGroup.RovingFocusGroupProps['dir'];
  orientation?: RovingFocusGroup.RovingFocusGroupProps['orientation'];
  loop?: RovingFocusGroup.RovingFocusGroupProps['loop'];
  defaultValue?: string[];
  value?: CheckboxGroupContextValue['value'];
  onValueChange?: (value: string[]) => void;
}

const CheckboxGroup = React.forwardRef<
  CheckboxGroupElement,
  CheckboxGroupProps
>(
  (
    {
      __scopeCheckboxGroup,
      name,
      defaultValue,
      value: valueProp,
      required = false,
      disabled = false,
      orientation,
      dir,
      loop = true,
      onValueChange,
      ...props
    }: ScopedProps<CheckboxGroupProps>,
    ref,
  ) => {
    const rovingFocusGroupScope =
      useRovingFocusGroupScope(__scopeCheckboxGroup);
    const direction = useDirection(dir);
    const [value = [], setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });

    const handleItemCheck = React.useCallback(
      (itemValue: string) => {
        setValue((prevValue = []) => [...prevValue, itemValue]);
      },
      [setValue],
    );

    const handleItemUncheck = React.useCallback(
      (itemValue: string) => {
        setValue((prevValue = []) =>
          prevValue.filter((val) => val !== itemValue),
        );
      },
      [setValue],
    );

    return (
      <CheckboxGroupProvider
        scope={__scopeCheckboxGroup}
        name={name}
        required={required}
        disabled={disabled}
        value={value}
        onItemCheck={handleItemCheck}
        onItemUncheck={handleItemUncheck}
      >
        <RovingFocusGroup.Root
          asChild
          {...rovingFocusGroupScope}
          orientation={orientation}
          dir={direction}
          loop={loop}
        >
          {/* eslint-disable-next-line react/jsx-pascal-case -- radix-ui */}
          <Primitive.div
            ref={ref}
            role="group"
            data-disabled={disabled ? '' : undefined}
            dir={direction}
            {...props}
          />
        </RovingFocusGroup.Root>
      </CheckboxGroupProvider>
    );
  },
);

CheckboxGroup.displayName = CHECKBOX_GROUP_NAME;

/* -------------------------------------------------------------------------------------------------
 * Component: CheckboxGroupItem
 * -----------------------------------------------------------------------------------------------*/

const ITEM_NAME = `${CHECKBOX_GROUP_NAME}Item`;

type CheckboxGroupItemElement = React.ElementRef<typeof CheckboxPrimitive.Root>;

interface CheckboxGroupItemProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    'checked' | 'defaultChecked' | 'onCheckedChange' | 'name'
  > {
  value: string;
}

const CheckboxGroupItem = React.forwardRef<
  CheckboxGroupItemElement,
  CheckboxGroupItemProps
>(
  (
    {
      __scopeCheckboxGroup,
      disabled,
      ...props
    }: ScopedProps<CheckboxGroupItemProps>,
    ref,
  ) => {
    const context = useCheckboxGroupContext(ITEM_NAME, __scopeCheckboxGroup);
    const isDisabled = context.disabled || disabled;
    const rovingFocusGroupScope =
      useRovingFocusGroupScope(__scopeCheckboxGroup);
    const checkboxScope = useCheckboxScope(__scopeCheckboxGroup);
    const checked = context.value?.includes(props.value);

    return (
      <RovingFocusGroup.Item
        asChild
        {...rovingFocusGroupScope}
        focusable={!isDisabled}
        active={checked}
      >
        <CheckboxPrimitive.Root
          ref={ref}
          name={context.name}
          disabled={isDisabled}
          required={context.required}
          checked={checked}
          {...checkboxScope}
          {...props}
          onCheckedChange={(checkedState) => {
            if (checkedState) {
              context.onItemCheck(props.value);
            } else {
              context.onItemUncheck(props.value);
            }
          }}
        />
      </RovingFocusGroup.Item>
    );
  },
);

CheckboxGroupItem.displayName = ITEM_NAME;

/* -------------------------------------------------------------------------------------------------
 * Component: CheckboxGroupIndicator
 * -----------------------------------------------------------------------------------------------*/

const INDICATOR_NAME = `${CHECKBOX_GROUP_NAME}Indicator`;

type CheckboxGroupIndicatorElement = React.ElementRef<
  typeof CheckboxPrimitive.Indicator
>;
type CheckboxGroupIndicatorProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Indicator
>;

const CheckboxGroupIndicator = React.forwardRef<
  CheckboxGroupIndicatorElement,
  CheckboxGroupIndicatorProps
>(
  (
    {
      __scopeCheckboxGroup,
      ...props
    }: ScopedProps<CheckboxGroupIndicatorProps>,
    ref,
  ) => {
    const checkboxScope = useCheckboxScope(__scopeCheckboxGroup);
    return (
      <CheckboxPrimitive.Indicator ref={ref} {...checkboxScope} {...props} />
    );
  },
);

CheckboxGroupIndicator.displayName = INDICATOR_NAME;

/* -----------------------------------------------------------------------------
 * Exports
 * -------------------------------------------------------------------------- */

const Root = CheckboxGroup;
const Item = CheckboxGroupItem;
const Indicator = CheckboxGroupIndicator;

export {
  createCheckboxGroupScope,
  CheckboxGroup,
  CheckboxGroupItem,
  CheckboxGroupIndicator,
  Root,
  Item,
  Indicator,
  type CheckboxGroupProps,
  type CheckboxGroupItemProps,
  type CheckboxGroupIndicatorProps,
};
