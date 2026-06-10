"use server";

import { prisma } from "@/lib/prisma";
import { Prospect } from "@/generated/prisma/client";

export const createProspect = async (data: Prospect) =>
  prisma.prospect.create({ data }).catch(console.error);

export const getProspects = async () =>
  prisma.prospect.findMany().catch(console.error);
