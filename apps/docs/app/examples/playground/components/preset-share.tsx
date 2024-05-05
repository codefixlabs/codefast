import { Button } from '@codefast/ui/button';
import { Input } from '@codefast/ui/input';
import { Label } from '@codefast/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@codefast/ui/popover';
import { CopyIcon } from '@radix-ui/react-icons';
import { type JSX } from 'react';

export function PresetShare(): JSX.Element {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Share</Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[520px]">
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h3 className="text-lg font-semibold">Share preset</h3>
          <p className="text-muted-foreground text-sm">
            Anyone who has this link and an OpenAI account will be able to view
            this.
          </p>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://platform.openai.com/playground/p/7bbKYQvsVkNmVb8NGcdUOLae?model=text-davinci-003"
              readOnly
              className="h-9"
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <CopyIcon className="size-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
