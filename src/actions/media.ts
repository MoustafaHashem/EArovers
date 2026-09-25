"use server";

export async function fetchBatchShieldsMediaAction(categories: {id: string, title: string}[]) {
  return {} as Record<string, any[]>;
}

export async function fetchMediaAction(category: string, limit?: number) {
  return [];
}

export async function fetchShieldMediaAction(category: string, id: string) {
  return [];
}
