import { SecurePassword } from "@blitzjs/auth/secure-password";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { Role } from "types";
import { email, password } from "@/(auth)/validations";
import { z } from "zod";

export const Input = z.object({
  email,
  password,
});

export default resolver.pipe(resolver.zod(Input), async ({ email, password }, ctx) => {
  const blitzContext = ctx;
  const hashedPassword = await SecurePassword.hash(password || "test-password");
  const user = await db.user.create({
    data: { email, hashedPassword },
  });

  await blitzContext.session.$create({
    userId: user.id,
    role: "USER",
  });

  return { userId: blitzContext.session.userId, ...user, email: email };
});
