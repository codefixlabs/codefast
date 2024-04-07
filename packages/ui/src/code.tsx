import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

/* -----------------------------------------------------------------------------
 * Component: Code
 * -------------------------------------------------------------------------- */

type CodeElement = HTMLElement;

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

const Code = React.forwardRef<CodeElement, CodeProps>(({ asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "code";

  return <Comp ref={ref} {...props} />;
});

Code.displayName = "Code";

/* -----------------------------------------------------------------------------
 * Exports
 * -------------------------------------------------------------------------- */

export { Code, type CodeProps };
