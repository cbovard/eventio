import React from "react";
import { BlitzPage } from "@blitzjs/next";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "baaa",
  description: "boo",
};

const AboutPage: BlitzPage = () => {
  return <div>This is the about page.</div>;
};

export default AboutPage;
