"use server";

import { prisma } from "@/lib/prisma";
import {
  ProspectCreateInput,
  ProspectUpdateInput,
} from "@/generated/prisma/models/Prospect";

export const createProspect = async (data: ProspectCreateInput) =>
  prisma.prospect.create({ data });

export const getProspects = async () =>
  prisma.prospect.findMany({ orderBy: { updatedAt: "desc" } });

export const getProspect = async (prospectId: number) =>
  prisma.prospect.findUnique({ where: { id: prospectId } });

export const updateProspect = async (
  prospectId: number,
  data: ProspectUpdateInput,
) => prisma.prospect.update({ where: { id: prospectId }, data });
