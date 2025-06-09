"use client";
import React, { FC, JSX } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

import { ChevronRight } from "@/components/common/atoms/icons";

const SeeAllButton: FC<{ link: string }> = ({
  link,
}: {
  link: string;
}): JSX.Element => {
  const capitalize: string =
    link.replace("/", "").charAt(0).toUpperCase() + link.slice(1);
  const localStorageKey: string = "currentPage" + capitalize;

  return (
    <Link href={link}>
      <Button
        className="gap-1 text-default-800"
        variant="light"
        onPress={() => {
          localStorage.getItem(localStorageKey) &&
            localStorage.removeItem(localStorageKey);
        }}
      >
        Ver todas <ChevronRight className="fill-default-900 h-4 w-4" />
      </Button>
    </Link>
  );
};

export default SeeAllButton;
