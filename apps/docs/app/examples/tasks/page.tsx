import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { z } from 'zod';
import { columns } from '@/app/examples/tasks/_components/columns';
import { DataTable } from '@/app/examples/tasks/_components/data-table';
import { UserNav } from '@/app/examples/tasks/_components/user-nav';
import { taskSchema } from '@/app/examples/tasks/_data/schema';
import type { Task } from '@/app/examples/tasks/_data/schema';
import type { JSX } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.',
};

// Simulate a database read for tasks.
async function getTasks(): Promise<Task[]> {
  const data = fs.readFileSync(path.join(process.cwd(), 'app/examples/tasks/_data/tasks.json'));

  const tasks = JSON.parse(data.toString()) as Task[];

  return Promise.resolve(z.array(taskSchema).parse(tasks));
}

export default async function TaskPage(): Promise<JSX.Element> {
  const tasks = await getTasks();

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">Here&apos;s a list of your tasks for this month!</p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
