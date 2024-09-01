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
    console.log("User is searching todos with search term: ", search);

    const todos = await db.todo.findMany({
      where: {
        userId,
      },
    });

    //const todos = await db.todo.findMany();

    // const todos = await db.todo.findMany({
    //   where: {
    //     title: {
    //       contains: "bread",
    //     },
    //   },
    // });

    // const todos = [
    //   { title: "Buy Bread", id: 1 },
    //   { title: "Buy Milk", id: 2 },
    //   { title: "Buy Butter", id: 3 },
    // ];

    return todos;
  }
);
