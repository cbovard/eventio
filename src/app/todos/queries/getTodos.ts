import { resolver } from "@blitzjs/rpc";
import { z } from "zod";

const Input = z.object({
  search: z.string().optional(),
});

// // Schema for a single Todo item
// const todoItemSchema = z.object({
//   id: z.string().uuid(),
//   title: z.string().min(1, "Title is required").max(100),
//   description: z.string().optional(),
//   completed: z.boolean().default(false),
//   createdAt: z.date().optional(),
//   updatedAt: z.date().optional(),
// });

// const todosSchema = z.array(todoItemSchema);

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ search }) => {
  console.log("User is searching todos with search term: ", search);
  const todos = [
    { title: "Buy Bread", id: 1 },
    { title: "Buy Milk", id: 2 },
    { title: "Buy Butter", id: 3 },
  ];

  return todos;
});
