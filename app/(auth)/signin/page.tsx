"use client";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  Spacer,
  Link,
  Button,
  Alert,
} from "@heroui/react";
import React, { useState } from "react";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import { useSearchParams, ReadonlyURLSearchParams } from "next/navigation";

import { title } from "@/components/primitives";

const Page: React.FC = (): React.JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const registered: string | null = searchParams.get("registered");
  const isError: string | null = searchParams.get("error");
  const error: string = isError
    ? "Credenciales inválidas. Por favor, inténtalo de nuevo."
    : "";

  return (
    <main className="flex w-full justify-center">
      {registered && (
        <Alert className="absolute w-fit animate-alert-top" color={"success"}>
          Revise su correo electrónico para verificar su cuenta.
        </Alert>
      )}
      <Card
        isBlurred
        className="mx-auto mt-64 w-1/4 h-fit bg-background/20 border border-white/10 drop-shadow-2xl"
      >
        <CardHeader>
          <h1
            className={clsx(
              title({ color: "blue", size: "md" }),
              "text-4xl w-full !leading-14 font-bold text-center",
            )}
          >
            Sign In
          </h1>
        </CardHeader>
        <CardBody>
          <Form>
            <fieldset className={"w-full"}>
              <Input
                required
                className="mb-4"
                classNames={{
                  inputWrapper:
                    "bg-background/30 border border-white/20 drop-shadow-lg" +
                    "hover:bg-background/50 dark:hover:bg-background/50 focus-within:bg-background/40",
                }}
                isInvalid={!!isError}
                label="Email"
                labelPlacement="outside"
                name="email"
                size={"lg"}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Spacer y={4} />
              <Input
                required
                className="mb-4"
                classNames={{
                  inputWrapper:
                    "bg-background/30 border border-white/20 drop-shadow-lg" +
                    "hover:bg-background/50 dark:hover:bg-background/50 focus-within:bg-background/40",
                }}
                errorMessage={error}
                isInvalid={!!isError}
                label="Contraseña"
                labelPlacement="outside"
                name="password"
                size={"lg"}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-sm text-default-500">
                ¿No tienes una cuenta?{" "}
                <Link className="text-sm text-primary-600" href="/signup">
                  ¡Regístrate!
                </Link>
              </p>
              <Spacer y={4} />
              <Button
                className="w-full"
                color="primary"
                size={"lg"}
                onPress={() =>
                  signIn("credentials", {
                    email,
                    password,
                    redirectTo: "/",
                  })
                }
              >
                Sign In
              </Button>
            </fieldset>
          </Form>
        </CardBody>
      </Card>
    </main>
  );
};

// @ts-ignore
export default Page;
