"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "@heroui/react";

const SignInButton: React.FC = (): React.JSX.Element => (
  <Button
    className="w-full"
    color="primary"
    onPress={() => signIn("credentials", { redirectTo: "/" })}
  >
    Sign In
  </Button>
);

export default SignInButton;
