"use client";
import React from "react";
import { useStringParam } from "@/utils/utils";

export const BlogPostPage = () => {
  const params = useStringParam();

  return <div>This is the Blog {params.slug} Post page.</div>;
};

export default BlogPostPage;
