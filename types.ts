import { SimpleRolesIsAuthorized } from "@blitzjs/auth";
import { User } from "./db";

import { PropsWithChildren } from "react";

export type Role = "ADMIN" | "USER";

declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>;
    PublicData: {
      userId: User["id"];
      role: Role;
      views?: number;
    };
  }
}

// todo - reasearch - Shorthand for declaring typed React Components.
export type ReactFC<T> = React.FC<PropsWithChildren & T>;
