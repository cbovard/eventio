import { resolver } from "@blitzjs/rpc";

export default resolver.pipe(async () => {
  //const todos = [{ title: "Buy Bread" }, { title: "Buy Milk" }, { title: "Buy Butter" }];

  return { title: "Buy Bread" };
});
