"use server";

import { prisma } from "@/lib/prisma";
import { ProspectCreateInput } from "@/generated/prisma/models/Prospect";
import { OpenRouter } from "@openrouter/agent";

const openrouter = new OpenRouter({
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
});

export const createProspect = async (data: ProspectCreateInput) =>
  prisma.prospect.create({ data });

export const getProspects = async () =>
  prisma.prospect.findMany({ orderBy: { updatedAt: "desc" } });

export const getProspect = async (prospectId: number) =>
  prisma.prospect.findUnique({ where: { id: prospectId } });

export const generateContent = async (input: string) => {
  const result = openrouter.callModel({
    model: "openrouter/free",
    input,
  });

  return await result.getText();
};
