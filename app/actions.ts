"use server";

import { prisma } from "@/lib/prisma";
import { ProspectCreateInput } from "@/generated/prisma/models/Prospect";

export const createProspect = async (data: ProspectCreateInput) =>
  await prisma.prospect.create({ data });

export const getProspects = async () => await prisma.prospect.findMany();
