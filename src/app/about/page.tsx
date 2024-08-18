import React from "react";
import { BlitzPage } from "@blitzjs/next";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

const AboutPage: BlitzPage = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>Welcome to the About page!</p>
    </div>
  );
};

export default AboutPage;
