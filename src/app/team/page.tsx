import React from "react";
import { BlitzPage } from "@blitzjs/next";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
};

const TeamPage: BlitzPage = () => {
  return (
    <div>
      <h1>Team Page</h1>
      <p>Welcome to the Team page!</p>
    </div>
  );
};

export default TeamPage;
