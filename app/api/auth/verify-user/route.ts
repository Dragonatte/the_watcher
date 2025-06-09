import { NextResponse } from "next/server";

import s from "@/service/app.services";

export async function GET(req: Request): Promise<NextResponse>
{
  const { searchParams } = new URL(req.url);
  const token: string | null = searchParams.get("token");

  if (!token) {
    return NextResponse.json("Token is required", { status: 400 });
  }

  try {
    await s.auth.verifyEmail(token!);

    NextResponse.json("Email verified successfully", { status: 200 });
    const url = new URL("http://localhost:3000/verified-user");

    return NextResponse.redirect(url);
  } catch (err) {
    console.error("Error verifying email:", err);

    return NextResponse.json("Invalid or expired token", { status: 400 });
  }
};
