// @filename: server/trpc.ts
import { initTRPC } from '@trpc/server';


const t = initTRPC.create();

export const router = t.router;
export const procedure = t.procedure;

export interface User {
  id: string;
  name: string;
}

export const userList: User[] = [
  {
    id: '1',
    name: 'KATT',
  },
];


