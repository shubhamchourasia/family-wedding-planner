import {
  BudgetCategory,
} from "@prisma/client";

import {
  prisma,
} from "@/lib/prisma";

import type {
  BudgetInput,
} from "../schemas/budget.schema";


export async function createBudgetItem(
  weddingId: string,
  data: BudgetInput
) {
  return prisma.budgetItem.create({
    data: {
      weddingId,
      description: data.description,
      category: data.category,
      estimated: data.estimated,
      actual: data.actual,
      paid: data.paid,
      remarks: data.remarks,
      addedBy: data.addedBy,
    },
  });
}


export async function updateBudgetItem(
  id: string,
  data: BudgetInput
) {
  const item =
    await prisma.budgetItem.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

  if (!item) {
    throw new Error(
      "Budget item not found."
    );
  }

  return prisma.budgetItem.update({
    where: {
      id,
    },
    data: {
      description: data.description,
      category: data.category,
      estimated: data.estimated,
      actual: data.actual,
      paid: data.paid,
      remarks: data.remarks,
      addedBy: data.addedBy,
    },
  });
}


export async function deleteBudgetItem(
  id: string
) {
  const item =
    await prisma.budgetItem.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

  if (!item) {
    throw new Error(
      "Budget item not found."
    );
  }

  return prisma.budgetItem.delete({
    where: {
      id,
    },
  });
}


export async function getBudgetItemsByWedding(
  weddingId: string
) {
  return prisma.budgetItem.findMany({
    where: {
      weddingId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}


export async function getBudgetSummary(
  weddingId: string
) {
  const wedding =
    await prisma.wedding.findUnique({
      where: {
        id: weddingId,
      },
      select: {
        overallBudget: true,
      },
    });

  const items =
    await prisma.budgetItem.findMany({
      where: {
        weddingId,
      },
      select: {
        estimated: true,
        actual: true,
        paid: true,
      },
    });

  const estimated =
    items.reduce(
      (sum, item) =>
        sum + item.estimated,
      0
    );

  const actual =
    items.reduce(
      (sum, item) =>
        sum + (item.actual ?? 0),
      0
    );

  const paid =
    items.reduce(
      (sum, item) =>
        sum + (item.paid ?? 0),
      0
    );

  return {
    overallBudget:
      wedding?.overallBudget ?? 0,

    estimated,

    actual,

    paid,

    remaining:
      (wedding?.overallBudget ?? 0) -
      actual,

    utilization:
      (wedding?.overallBudget ?? 0) > 0
        ? (actual /
            (wedding?.overallBudget ?? 0)) *
          100
        : 0,

    itemCount:
      items.length,
  };
}


export async function updateOverallBudget(
  weddingId: string,
  overallBudget: number
) {
  return prisma.wedding.update({
    where: {
      id: weddingId,
    },
    data: {
      overallBudget,
    },
  });
}


export async function getBudgetByCategory(
  weddingId: string,
  category: BudgetCategory
) {
  return prisma.budgetItem.findMany({
    where: {
      weddingId,
      category,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}


export async function getBudgetCategoriesSummary(
  weddingId: string
) {
  const items =
    await prisma.budgetItem.findMany({
      where: {
        weddingId,
      },
      select: {
        category: true,
        estimated: true,
        actual: true,
        paid: true,
      },
    });

  const summary =
    new Map<
      string,
      {
        category: string;
        estimated: number;
        actual: number;
        paid: number;
        count: number;
      }
    >();

  for (const item of items) {
    const existing =
      summary.get(item.category) ?? {
        category: item.category,
        estimated: 0,
        actual: 0,
        paid: 0,
        count: 0,
      };

    existing.estimated +=
      item.estimated;

    existing.actual +=
      item.actual ?? 0;

    existing.paid +=
      item.paid ?? 0;

    existing.count++;

    summary.set(
      item.category,
      existing
    );
  }

  return Array.from(
    summary.values()
  ).sort(
    (a, b) =>
      b.estimated - a.estimated
  );
}