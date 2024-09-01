import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db from "db";

const Input = z.object({
  search: z.string().optional(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ search }, { session: { userId } }) => {
    //console.log("User is searching todos with search term: ", search);

    const todos = await db.todo.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
        done: true,
      },
    });

    return todos;
  }
);
