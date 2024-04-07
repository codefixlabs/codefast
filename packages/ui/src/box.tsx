import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

/* -----------------------------------------------------------------------------
 * Component: Box
 * -------------------------------------------------------------------------- */

type BoxElement = HTMLDivElement;

interface BoxDivProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div";
}

interface BoxSpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  as: "span";
}

type BoxProps = (BoxDivProps | BoxSpanProps) & {
  asChild?: boolean;
};

const Box = React.forwardRef<BoxElement, BoxProps>(({ as: Tag = "div", asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : Tag;

  return <Comp ref={ref} {...props} />;
});

Box.displayName = "Box";

/* -----------------------------------------------------------------------------
 * Exports
 * -------------------------------------------------------------------------- */

export { Box, type BoxProps };
