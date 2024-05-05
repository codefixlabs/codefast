import { type Meta, type StoryObj } from '@storybook/react';
import { Calendar } from '@codefast/ui/calendar';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@codefast/ui/form';
import { cn } from '@codefast/ui/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@codefast/ui/popover';
import { Button } from '@codefast/ui/button';
import { CalendarIcon } from '@radix-ui/react-icons';
import { toast, Toaster } from '@codefast/ui/sonner';
import { Box } from '@codefast/ui/box';
import { Pre } from '@codefast/ui/pre';
import { Code } from '@codefast/ui/code';

const meta = {
  tags: ['autodocs'],
  title: 'UIs/Calendar',
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

/* -----------------------------------------------------------------------------
 * Story: Default
 * -------------------------------------------------------------------------- */

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<Date>();

    return (
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        className="rounded-md border shadow"
        {...args}
      />
    );
  },
};

/* -----------------------------------------------------------------------------
 * Story: React Hook Form
 * -------------------------------------------------------------------------- */

const FormSchema = z.object({
  dob: z.date({
    required_error: 'A date of birth is required.',
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
      toast.message('You submitted the following values:', {
        description: (
          <Pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <Code className="text-white">{JSON.stringify(data, null, 2)}</Code>
          </Pre>
        ),
      });
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <Box as="span">Pick a date</Box>
                        )}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
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
