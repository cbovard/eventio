import { useQuery } from "@blitzjs/rpc";
import getCurrentUser from "../queries/getCurrentUser";

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null);
  if (!user) return null;

  return {
    ...user,
    isAdmin: user?.role === "ADMIN",
  };
};
