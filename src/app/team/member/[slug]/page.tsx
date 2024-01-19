"use client";
import React from "react";
import { useStringParam } from "@/utils/utils";

export const TeamMemberPage = () => {
  const params = useStringParam();

  return <div>{params.slug} is the best Team member</div>;
};

export default TeamMemberPage;
