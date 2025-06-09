import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import clsx from "clsx";
import { FC, JSX } from "react";

import { title } from "@/components/primitives";
import {Link} from "@heroui/link";

const Page: FC = (): JSX.Element => (
  <article className="container flex flex-col gap-16 items-center mx-auto h-screen w-full pt-32">
    <h1 className={clsx(title({ size: "lg" }), "font-header")}>
      ¡Email Verificado!
    </h1>
    <Card
      className={
        "bg-background/20 border border-white/10 drop-shadow-2xl p-4"
      }
      isBlurred={true}
    >
      <CardHeader className="text-center">
        <h2 className={clsx(title({ size: "md" }), "!mx-auto")}>
          Tu email ha sido verificado exitosamente.
        </h2>
      </CardHeader>
      <CardBody className="text-center">
        <p>
          Ahora puedes acceder a todas las funcionalidades de nuestra
          plataforma.
        </p>
      </CardBody>
      <CardFooter className="flex justify-center">
        <Button as={Link} color="primary" href="/" variant="solid">
          Ir al Inicio
        </Button>
      </CardFooter>
    </Card>
  </article>
);

export default Page;
