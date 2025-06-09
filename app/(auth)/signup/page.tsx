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
} from "@heroui/react";
import React, { FormEvent } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import axios from "axios";

import { title } from "@/components/primitives";

interface RegisterFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Page: React.FC = (): React.JSX.Element => {
  const [passError, setPassError] = React.useState<string | null>(null);
  const router = useRouter();

  function registerAction(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formData: RegisterFormData = Object.fromEntries(
      new FormData(event.currentTarget),
    ) as unknown as RegisterFormData;

    if (formData.password !== formData.confirmPassword) {
      setPassError("Las contraseñas no coinciden.");

      return;
    }

    axios
      .post("/api/auth/signup", formData)
      .then((): void => {
        router.push("/signin?registered=true");
      })
      .catch((error): void => {
        if (axios.isAxiosError(error)) {
          setPassError(error.response?.data.message || "Error al registrarse.");
        } else {
          setPassError("Error desconocido al registrarse.");
        }
      });
  }

  return (
    <main className="flex w-full items-center 2xl:items-start h-[calc(100dvh-4.5rem)]">
      <Card
        isBlurred
        className="mx-auto 2xl:mt-64 w-full rounded-none md:rounded-2xl md:w-md lg:w-lg xl:w-xl 2xl:w-2xl h-fit bg-background/20 border border-white/10 drop-shadow-2xl"
      >
        <CardHeader>
          <h1
            className={clsx(
              title({ color: "blue", size: "md" }),
              "text-4xl w-full !leading-14 font-bold text-center",
            )}
          >
            Sign Up
          </h1>
        </CardHeader>
        <CardBody>
          <Form onSubmit={registerAction}>
            <fieldset className={"w-full"}>
              <Input
                required
                className="mb-4"
                classNames={{
                  inputWrapper:
                    "bg-background/30 border border-white/20 drop-shadow-lg" +
                    "hover:bg-background/50 dark:hover:bg-background/50 focus-within:bg-background/40",
                }}
                label="Nombre Completo"
                labelPlacement="outside"
                name="name"
                size={"lg"}
                type="text"
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
                label="Nombre de Usuario"
                labelPlacement="outside"
                name="username"
                size={"lg"}
                type="text"
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
                label="Email"
                labelPlacement="outside"
                name="email"
                size={"lg"}
                type="email"
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
                errorMessage={passError}
                label="Contraseña"
                labelPlacement="outside"
                name="password"
                size={"lg"}
                type="password"
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
                errorMessage={passError}
                label="Confirmar contraseña"
                labelPlacement="outside"
                name="confirmPassword"
                size={"lg"}
                type="password"
              />
              <p className="text-sm text-default-500">
                ¿Ya tienes una cuenta?{" "}
                <Link className="text-sm text-primary-600" href="/signin">
                  ¡Inicia sesión!
                </Link>
              </p>
              <Spacer y={4} />
              <Button
                className="w-full"
                color="primary"
                size={"lg"}
                type={"submit"}
              >
                Sign Up
              </Button>
            </fieldset>
          </Form>
        </CardBody>
      </Card>
    </main>
  );
};

export default Page;
