"use client";
import { useParams } from "next/navigation";

//https://nextjs.org/docs/app/api-reference/functions/use-params

// reusable hook to read a URL parameter
export const useStringParam = () => {
  const param = useParams();
  return param;
};
