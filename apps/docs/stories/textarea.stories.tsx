import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@codefast/ui/textarea";
import { Label } from "@codefast/ui/label";
import { useId } from "react";
import { Button } from "@codefast/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "@codefast/ui/sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@codefast/ui/form";

const meta = {
  component: Textarea,
  tags: ["autodocs"],
  title: "UIs/Textarea",
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

/* -----------------------------------------------------------------------------
 * Story: Default
 * -------------------------------------------------------------------------- */

export const Default: Story = {
  render: (args) => (
    <Textarea placeholder="Type your message here." {...args} />
  ),
};

/* -----------------------------------------------------------------------------
 * Story: Disabled
 * -------------------------------------------------------------------------- */

export const Disabled: Story = {
  render: (args) => (
    <Textarea placeholder="Type your message here." disabled {...args} />
  ),
};

/* -----------------------------------------------------------------------------
 * Story: With Label
 * -------------------------------------------------------------------------- */

export const WithLabel: Story = {
  render: (args) => {
    const id = useId();

    return (
      <div className="grid w-full gap-1.5">
        <Label htmlFor={`message-${id}`}>Your message</Label>
        <Textarea
          placeholder="Type your message here."
          id={`message-${id}`}
          {...args}
        />
      </div>
    );
  },
};

/* -----------------------------------------------------------------------------
 * Story: With Text
 * -------------------------------------------------------------------------- */

export const WithText: Story = {
  render: (args) => {
    const id = useId();

    return (
      <div className="grid w-full gap-1.5">
        <Label htmlFor={`message-${id}`}>Your message</Label>
        <Textarea
          placeholder="Type your message here."
          id={`message-${id}`}
          {...args}
        />
        <p className="text-muted-foreground text-sm">
          Your message will be copied to the support team.
        </p>
      </div>
    );
  },
};

/* -----------------------------------------------------------------------------
 * Story: With Button
 * -------------------------------------------------------------------------- */

export const WithButton: Story = {
  render: (args) => {
    return (
      <div className="grid w-full gap-2">
        <Textarea placeholder="Type your message here." {...args} />
        <Button>Send message</Button>
      </div>
    );
  },
};

/* -----------------------------------------------------------------------------
 * Story: React Hook Form
 * -------------------------------------------------------------------------- */

const FormSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

export const ReactHookForm: Story = {
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
  render: () => {
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>): void {
      toast.message("You submitted the following values:", {
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    }

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
};
