import { resolver } from "@blitzjs/rpc";
import { z } from "zod";

const Input = z.object({});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize("ADMIN"),
  async ({}, { session: { userId } }) => {
    return console.log("Admin Only Mutation");
  }
);
