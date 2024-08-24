export async function GET(request: Request) {
  return Response.json({
    todos: [{ title: "Buy Bread" }, { title: "Buy Milk" }, { title: "Buy Butter" }],
  });
}
