"use client";

import React, { FC, JSX, ReactNode } from "react";
import {Button} from "@heroui/button";
import {ChevronLeftIcon, ChevronUpIcon} from "@heroui/shared-icons";
import {Link} from "@heroui/link";

const Layout: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  return (
    <main
      className={"min-h-dvh"}
      style={{
        backgroundImage: `url('/auth-2-background.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Button
        as={Link}
        className="group m-4"
        href={"/"}
        variant={"light"}
      >
        <span className={"group-hover:animate-bounce -rotate-90"}>
          <ChevronUpIcon fontSize={"24"} />
        </span>
        Volver
      </Button>
      {children}
    </main>
  );
};

export default Layout;
