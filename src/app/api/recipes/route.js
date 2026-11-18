import { NextResponse } from "next/server";
import { getRecipes } from "@/lib/recipeStore";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ recipes: getRecipes() });
}
