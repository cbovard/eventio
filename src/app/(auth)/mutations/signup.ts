import { SecurePassword } from "@blitzjs/auth/secure-password";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { Role } from "types";
// import { email, password } from "@/(auth)/validations";
import { z } from "zod";

export const Input = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
});

export default resolver.pipe(resolver.zod(Input), async ({ email, password, name }, ctx) => {
  const blitzContext = ctx;
  const hashedPassword = await SecurePassword.hash(password || "test-password");
  const user = await db.user.create({
    data: { email, hashedPassword, name, role: "USER" },
    select: { id: true, name: true, email: true, role: true },
  });

  await blitzContext.session.$create({
    userId: user.id,
    role: "USER",
  });

  return { userId: blitzContext.session.userId, ...user, email: email };
});
