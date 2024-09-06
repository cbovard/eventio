import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

// An empty object is passed as the input schema because we don't need any input for this mutation.
// This will create an empty object {}.
const Input = z.object({});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    return db.todo.deleteMany({
      where: {
        userId,
        done: true,
      },
    });
  }
);
