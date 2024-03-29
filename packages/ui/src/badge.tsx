import { type VariantProps } from "cva";
import { cva } from "./utils";

/* -----------------------------------------------------------------------------
 * Variant: Badge
 * -------------------------------------------------------------------------- */

const badgeVariants = cva({
  base: "focus:ring-ring focus:ring-offset-background inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  variants: {
    variant: {
      default:
        "bg-primary text-primary-foreground hover:bg-primary/80 border-transparent shadow",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent shadow",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/* -----------------------------------------------------------------------------
 * Component: Badge
 * -------------------------------------------------------------------------- */

function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>): React.JSX.Element {
  return <div className={badgeVariants({ variant, className })} {...props} />;
}

/* -----------------------------------------------------------------------------
 * Exports
 * -------------------------------------------------------------------------- */

export { Badge };
