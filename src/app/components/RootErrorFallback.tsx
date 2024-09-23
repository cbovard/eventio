"use server";
// not being used!!!
import { ErrorComponent, ErrorFallbackProps } from "@blitzjs/next";
import { AuthenticationError, AuthorizationError } from "blitz";

export async function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not Authenticated</div>;
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    );
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    );
  }
}
