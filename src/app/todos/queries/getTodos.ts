import { resolver } from "@blitzjs/rpc";

export default resolver.pipe(async () => {
  const todos = [
    { title: "Buy Bread", id: 1 },
    { title: "Buy Milk", id: 2 },
    { title: "Buy Butter", id: 3 },
  ];

  return todos;
});
