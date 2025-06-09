import { NextResponse } from "next/server";

import { User } from "@/model/User.model";
import s from "@/service/app.services";

interface SignUpRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const data: SignUpRequest = await req.json();

    if (
      !data.name ||
      !data.username ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    )
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );

    if (data.password !== data.confirmPassword)
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 },
      );

    const user: User = await s.auth.signup(
      data.name,
      data.username,
      data.email,
      data.password,
    );

    if (!user) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error during sign up:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
