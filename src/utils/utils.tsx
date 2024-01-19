"use client";
import React from "react";
import { useParams } from "next/navigation";

// reusable hook to read a URL parameter
export const useStringParam = () => {
  const param = useParams();
  return param;
};
