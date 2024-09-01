import { resolver } from "@blitzjs/rpc";
import { email } from "@/(auth)/validations";
import { Role } from "types";
import { authenticateUser } from "@/(auth)/utils/auth-utils";
import { z } from "zod";

export const LoginInput = z.object({
  email,
  password: z.string(),
});

export default resolver.pipe(resolver.zod(LoginInput), async (params, ctx) => {
  const { email, password } = params;
  const user = await authenticateUser(email, password);

  await ctx.session.$create({ userId: user.id, role: user.role as Role });
  return user;
});
