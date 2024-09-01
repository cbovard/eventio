import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db from "db";

const Input = z.object({
  todoTitle: z.string(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ todoTitle }, { session: { userId } }) => {
    console.log(`Creating a todo with the title: ${todoTitle} for the user: ${userId}`);

    const todo = await db.todo.create({
      data: {
        title: todoTitle,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return todo;
  }
);
