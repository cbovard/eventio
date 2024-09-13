import React from "react";
// import { useStringParam } from "@/utils/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Post",
};

export default function BlogPost() {
  // const params = useStringParam();

  // return <div>This is the Blog: {params.slug} Post page.</div>;
  return <div>This is the Blog: Post page.</div>;
}
