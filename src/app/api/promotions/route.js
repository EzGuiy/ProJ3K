import { NextResponse } from "next/server";
import { getPromotions } from "@/lib/promotionStore";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ promotions: getPromotions() });
}
