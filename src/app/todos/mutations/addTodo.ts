import { resolver } from "@blitzjs/rpc";
import { z } from "zod";

const Input = z.object({
  todoTitle: z.string(),
  id: z.string(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ todoTitle }, { session: { userId } }) => {
    // const { todoTitle } = params;

    //const userId = ctx.session.userId;

    console.log(`Creating a todo with the title: ${todoTitle} for the user: ${userId}`);

    return "todo created successfully";
  }
);
