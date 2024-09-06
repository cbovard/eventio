"use client";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

// Reusable hook to read a URL parameter.
export const useStringParam = () => {
  const param = useParams();
  return param;
};

// Reusable hook to clear the cache of a query.
export const useClearQueryCache = () => {
  const queryClient = useQueryClient();

  // This will now be a hook, allowing the use of useQueryClient.
  const clearQueryCache = (queryKey: (string | { json: {} })[]) => {
    // DEBUG CODE HERE - this debug code will show all the query keys in the cache.
    // const queries = queryClient.getQueryCache().getAll();
    // queries.forEach((query) => {
    //   console.log(JSON.stringify(query.queryKey));
    // });
    // console.log(queries);
    // END DEBUG CODE.

    queryClient.invalidateQueries(queryKey);
  };

  return clearQueryCache;
};
