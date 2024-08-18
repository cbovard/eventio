"use client";
import React from "react";
import { useStringParam } from "@/utils/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
};

export const BlogPostPage = () => {
  const params = useStringParam();

  return <div>This is the Blog: {params.slug} Post page.</div>;
};

export default BlogPostPage;
