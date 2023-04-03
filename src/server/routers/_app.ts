import { z } from 'zod';
import { procedure, router, User, userList } from '../trpc';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `Hello Great Grand ${input.text}`,
      };
    }),
  userById: procedure
    // The input is unknown at this time.
    // A client could have sent us anything
    // so we won't assume a certain data type.
    .input((val: unknown) => {
      // If the value is of type string, return it.
      // TypeScript now knows that this value is a string.
      if (typeof val === 'string') return val;

      // Uh oh, looks like that input wasn't a string.
      // We will throw an error instead of running the procedure.
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query((req) => {
      const { input } = req;
      const user = userList.find((u) => u.id === input);

      return user;
    }),
    userCreate: procedure
      .input(z.object({ name: z.string() }))
      .mutation((req) => {
        // console.log(req);
        const id = `${Math.random()}`;
    
        const user: User = {
          id,
          name: req.input.name,
        };
    
        userList.push(user);
        // console.log(userList);
        return user;
      }),
    allUsers: procedure.query(() => {
      // console.log(userList)
      return userList;
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;